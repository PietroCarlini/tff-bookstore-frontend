"use server";

import { searchBooks, getBookDetails, SearchOptions } from "@/services/bookService";
import { Book, BookDetails } from "@/types/bookTypes";

export async function searchBooksAction(query: string, options?: SearchOptions): Promise<Book[]> {
    return searchBooks(query, options);
}

export async function getBookDetailsAction(id: string): Promise<BookDetails> {
    return getBookDetails(id);
}

