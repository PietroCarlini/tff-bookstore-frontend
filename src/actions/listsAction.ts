"use server";

import { cookies } from "next/headers";
import { getListItems, removeListItem, ListType } from "../services/listsService";
import { ListItem } from "../types/listsTypes";

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

export async function removeFromListAction(type: ListType, isbn:string): Promise<void> {
    const token = await getToken();
    await removeListItem(type, isbn, token)
}
