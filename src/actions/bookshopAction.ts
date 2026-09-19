"use server";

import { cookies } from "next/headers";
import { getMyBookshop, updateMyBookshop } from "@/services/bookshopService";
import { Bookshop, UpdateBookshopData } from "@/types/bookshopTypes";

async function getToken(): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        throw new Error("Not authenticated");
    }
    return token
}

export async function getMyBookshopAction(): Promise<Bookshop> {
    const token = await getToken();
    return getMyBookshop(token)
}

//if true => show updated Bookshop / if false => message from backend (see ex. 409 phone)
type UpdateBookshopResult = { success: true; bookshop: Bookshop } | { success: false; message: string };

export async function updateMyBookshopAction(data:UpdateBookshopData) : Promise<UpdateBookshopResult> {
    try{
        const token = await getToken();
        const bookshop = await updateMyBookshop(data, token);
        return { success: true, bookshop }
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to update profile'
        }
    }
}