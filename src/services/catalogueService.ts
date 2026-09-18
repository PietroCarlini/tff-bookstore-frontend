import { BookStocked } from '@/types/bookshopTypes';

const API_URL = process.env.API_URL;

// bookshop retrieves its own catalogue, optionally filtered by search
export async function getCatalogue(token: string, search?: string): Promise<BookStocked[]> {
    const url = search
        ? `${API_URL}/catalogue?search=${encodeURIComponent(search)}`
        : `${API_URL}/catalogue`;

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error("Failed to load catalogue");
    }
    const data = await res.json();
    return data.books
}