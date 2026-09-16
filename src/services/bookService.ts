import { Book } from '../types/bookTypes';
import { BookDetails } from '../types/bookTypes';

export async function searchBooks(query: string): Promise<Book[]> {
    return [
        {
            id: "mock-1984",
            title: "1984",
            authors: ["George Orwell"],
            isbn: "9780141036144",
            cover: "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141036144%2F9780141036144-jacket-large.jpg&w=614&q=100"
        },
        {
            id: "mock-montecristo",
            title: "The Count of Monte Cristo",
            authors: ["Alexandre Dumas"],
            isbn: "9780141392462",
            cover: "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141392462%2F9780141392462-jacket-large.jpg&w=819&q=100"
        },
    ]
}

export async function getBookDetails(id: string): Promise<BookDetails>{
    return{
        id,
        title: "1984",
        authors: ["George Orwell"],
        isbn: "9780141036144",
        cover: "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141036144%2F9780141036144-jacket-large.jpg&w=614&q=100",
        publisher: "Penguin",
        pubDate: "2008",
        description: "A dystopian social science fiction novel.",
    }
}