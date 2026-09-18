"use server";

import { getCatalogue } from "@/services/catalogueService";
import { BookStocked } from "@/types/bookshopTypes";
import { cookies } from "next/headers";



async function getToken(): Promise<string>{
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if(!token){
        throw new Error ('Not authenticated')
    }
    return token
}


export async function getMyCatalogueAction(search?: string) : Promise<BookStocked[]> {
    const token = await getToken();
    return getCatalogue(token, search)
}