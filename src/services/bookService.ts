import { Book, BookDetails } from '../types/bookTypes';

const API_URL = process.env.API_URL;

// Mock data used as fallback if the backend / Google BooksAPI call fails
const mockResults: Book[] = [
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

const mockDetails: BookDetails = {
    id: "mock-1984",
    title: "1984",
    authors: ["George Orwell"],
    isbn: "9780141036144",
    cover: "https://www.penguin.co.uk/_next/image?url=https%3A%2F%2Fcdn.penguin.co.uk%2Fdam-assets%2Fbooks%2F9780141036144%2F9780141036144-jacket-large.jpg&w=614&q=100",
    publisher: "Penguin",
    pubDate: "2008",
    description: "A dystopian social science fiction novel.",
}

export interface SearchOptions {
    // true (default): if the call fails mock data are return, so the demo keeps working
    // false: the error goes up to the caller, who can show a real error message
    mockFallback?: boolean;
}

export async function searchBooks(query: string, options: SearchOptions = {}): Promise<Book[]> {
    
    const { mockFallback = true } = options;

    try {
        const res = await fetch(`${API_URL}/books/search?q=${encodeURIComponent(query)}`); //a way to secure query from special char or spaces

        if (!res.ok) {
            throw new Error('Book search failed');
        }

        const data = await res.json();
        return data
    }
    catch (err) {
        if(!mockFallback) throw err;

        console.warn("Book search failed, falling back to mock data:", err);
        return mockResults;
    }

}

export async function getBookDetails(id: string): Promise<BookDetails> {
    try {
        const res = await fetch(`${API_URL}/books/${id}`);

        if (!res.ok) {
            throw new Error("Book details request failed");
        }

        const data = await res.json();
        return data.book;
    }
    catch (err) {
        console.warn("Book details failed, falling back to mock data:", err);
        return { ...mockDetails, id };
    }
}