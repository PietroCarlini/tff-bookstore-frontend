export interface ListItem {
    ISBN: string;
    title: string;
    author: string;
    cover_url: string | null;
}

// body sent to add a book to a list (POST /toread or /read)
export interface NewListItem {
    ISBN: string;
    title: string;
    author: string;
    cover_url?: string; // optional: the backend accepts a string or nothing, not null
}