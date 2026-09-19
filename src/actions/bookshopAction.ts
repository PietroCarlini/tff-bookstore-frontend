"use server";

import { cookies } from "next/headers";
import { getMyBookshop } from "@/services/bookshopService";
import { Bookshop } from "@/types/bookshopTypes";

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