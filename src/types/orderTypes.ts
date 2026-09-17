export interface NewOrderData {
    bookshopId: number;
    ISBN: string;
    title: string;
    author: string;
    cover_url?: string;
    message?: string;
}