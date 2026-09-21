import { Bookshop, UpdateBookshopData } from "@/types/bookshopTypes";

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

// bookshop retrieves its own data (used to prefill the profile page)
export async function getMyBookshop(token: string): Promise<Bookshop> {
    const res = await fetch(`${API_URL}/bookshops/me`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
    });

    if (!res.ok) {
        throw new Error("Failed to load bookshop profile");
    }

    const data = await res.json();
    return data.bookshop;
}

// bookshop updates its own data: the backend answers with the updated bookshop
export async function updateMyBookshop(data: UpdateBookshopData, token: string): Promise<Bookshop> {
    const res = await fetch(`${API_URL}/bookshops/me`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });
    console.log("PATCH bookshop status:", res.status);
    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update profile");
    }

    const result = await res.json();
    return result.bookshop;
}