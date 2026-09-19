"use server";

import { searchBooks, getBookDetails } from "@/services/bookService";
import { Book, BookDetails } from "@/types/bookTypes";

export async function searchBooksAction(query: string): Promise<Book[]> {
    return searchBooks(query);
}

export async function getBookDetailsAction(id: string): Promise<BookDetails> {
    return getBookDetails(id);
}

