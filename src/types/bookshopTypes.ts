export interface Bookshop {
    id: number;
    name: string;
    city: string;
    address: string;
    email: string;
    phone: string;
    openingHours: string | null;
}

// fields a bookshop can edit in its profile: id is never editable, all the others are optional (like the backend validator)
export type UpdateBookshopData = Partial<Omit<Bookshop, "id">>;

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
    inOrder: number; // copies in orders not yet Collected/Canceled: computed by the backend, it is not a DB column

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

