import { ListItem, NewListItem } from "@/types/listsTypes";

const API_URL = process.env.API_URL;

// Both Wishlist ("to-read") and BookTracking ("read") have the same shape of routes on the backend
export type ListType = 'to-read' | 'read';

//link between Front/Back: endPointFor is an object(created by Record, ts utility[key,value]) string type; URL FRONT:.../my-lists/to-read -> equals BACK route: 'toread'
// link between Front/Back: endPointFor is an object (created by Record, a TS utility [key, value]) with string values
// URL FRONT: .../my-lists/to-read -> BACK route: 'toread' ('read' is the same on both sides)
// it is the only place that knows the backend route names: getListItems, removeListItem and addListItem all use endPointFor[type] => if a route changes on the backend obly one line here need to be edit and nothing else
const endPointFor: Record<ListType, string> = {
    'to-read': 'toread',
    'read': 'read'
}

export async function getListItems(type: ListType, token: string): Promise<ListItem[]> {
    const res = await fetch(`${API_URL}/${endPointFor[type]}/mine`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store' // Server Components cache fetches by default, but this data changes on user action (remove, add from list) = so skip the cache
    })
    if (!res.ok) {
        throw new Error("Failed to load list");
    }
    const data = await res.json();
    return data.books;
}

export async function addListItem(type: ListType, book: NewListItem, token: string): Promise<void> {
    const res = await fetch(`${API_URL}/${endPointFor[type]}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(book),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to add book to the list');
    }
}

export async function removeListItem(type: ListType, isbn: string, token: string): Promise<void> {
    const res = await fetch(`${API_URL}/${endPointFor[type]}/${isbn}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        console.log("DELETE failed:", res.status, errorData);
        throw new Error("Failed to remove item");
    }
}