"use server";

import { createBook, getCatalogue, updateBook, deleteBook } from "@/services/catalogueService";
import { BookStocked, NewBookData } from "@/types/bookshopTypes";
import { cookies } from "next/headers";



async function getToken(): Promise<string>{
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if(!token){
        throw new Error ('Not authenticated')
    }
    return token
}

export async function getMyCatalogueAction(search?: string, sortBy?: string, sortDir?: string) : Promise<BookStocked[]> {
    const token = await getToken();
    return getCatalogue(token, search, sortBy, sortDir)
}


type CreateAddBookResult = { success: true } | { success: false; message : string};

export async function addBookToCatalogueAction(data: NewBookData) : Promise<CreateAddBookResult> {
    try {
        const token = await getToken();
        await createBook(data, token);
        return {success: true}
    }
    catch(error){
        return {
            success: false,
            // if an Error is really an error (instanceof) show error.message, otherwise show general message
            message: error instanceof Error ? error.message : 'Failed to add book',
        }
    }

}

type UpdateBookResult = { success: true } | { success: false; message : string};

export async function updateBookAction(id: number, data: Partial<NewBookData>) : Promise<UpdateBookResult> {
    try{
        const token = await getToken();
        await updateBook(id, data, token);
        return {success: true}
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to update book',
        };
    }
}

type DeleteBookResult = { success: true } | { success: false; message : string};

export async function deleteBookAction(id: number) : Promise<DeleteBookResult> {
    try{
        const token = await getToken();
        await deleteBook(id, token);
        return {success: true}
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message: 'Failed to delete book'
        }
    }
}

