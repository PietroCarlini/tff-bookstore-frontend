export interface NewOrderData {
    bookshopId: number;
    ISBN: string;
    title: string;
    author: string;
    cover_url?: string;
    message?: string;
}

export type OrderStatus = "Sent" | "In Progress" | "Ready" | "Collected" | "Canceled";

export interface OrderItemData {
    id: number;
    ISBN: string;
    title: string;
    author: string;
    price: string | null;
    cover_url: string | null;
}

export interface OrderBookshop {
    id: number;
    name: string;
    city: string;
    address: string;
}

export interface Order {
    id: number;
    state: OrderStatus;
    message: string | null;
    createdAt: string;
    orderItems: OrderItemData[];
    bookshop: OrderBookshop;
}