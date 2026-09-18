export interface Bookshop {
    id: number;
    name: string;
    city: string;
    address: string;
    email: string;
    phone: string;
    openingHours: string | null;
}

export interface BookStocked {
    id: number;
    ISBN: string;
    title: string;
    author: string;
    genere: string;
    publisher: string | null;
    price: number;
    stock: number;
    cover_url: string | null;
    tag: string | null;
}