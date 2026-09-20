"use server";

import { cookies } from "next/headers";
import { getListItems, removeListItem, addListItem, ListType } from "../services/listsService";
import { ListItem, NewListItem } from "../types/listsTypes";

async function getToken(): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if (!token) {
        throw new Error('Not authenticated');
    }
    return token;
}

export async function getListAction(type: ListType): Promise<ListItem[]>{
    const token = await getToken();
    return getListItems(type, token)
}

type AddToListResult = { success: true } | { success: false; message: string };

export async function addToListAction(type: ListType, book: NewListItem): Promise<AddToListResult> {
    try {
        const token = await getToken();
        await addListItem(type, book, token);
        return { success: true }
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to add book to the list',
        }
    }
}

export async function removeFromListAction(type: ListType, isbn:string): Promise<void> {
    const token = await getToken();
    await removeListItem(type, isbn, token)
}
