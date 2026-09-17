import { Bookshop } from "@/types/bookshopTypes";

const API_URL = process.env.API_URL;

export async function getBookshops(token: string): Promise<Bookshop[]> {
    const res = await fetch(`${API_URL}/bookshops`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load bookshops");
    }
    const data = await res.json();
    return data.bookshops;
}