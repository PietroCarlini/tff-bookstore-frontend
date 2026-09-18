export interface Bookshop {
    id: number;
    name: string;
    city: string;
    address: string;
    email: string;
    phone: string;
    openingHours: string | null;
}

//Catalogue
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

//Insert new book in catalogue
export interface NewBookData {
    ISBN: string;
    title: string;
    author: string;
    genere: string;
    publisher?: string;
    tag?: string;
    price: number;
    stock: number;
    cover_url?: string;
}