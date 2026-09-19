// body sent by the client to create an order (POST /orders)
export interface NewOrderData {
    bookshopId: number;
    ISBN: string;
    title: string;
    author: string;
    cover_url?: string;
    message?: string;
}

export type OrderStatus = "Sent" | "In Progress" | "Ready" | "Collected" | "Canceled";

// the book inside an order (one row of the orderItem table)
export interface OrderItemData {
    id: number;
    ISBN: string;
    title: string;
    author: string;
    price: string | null;
    cover_url: string | null;
}

// the bookshop nested inside an order, as seen by the client (order history)
export interface OrderBookshop {
    id: number;
    name: string;
    city: string;
    address: string;
    phone: string;
    email: string;
    openingHours: string | null;
}

// order as seen by the client: it includes the bookshop (GET /orders/mine)
export interface Order {
    id: number;
    state: OrderStatus;
    message: string | null;
    createdAt: string;
    orderItems: OrderItemData[];
    bookshop: OrderBookshop;
}

// the client nested inside an order, as seen by the bookshop (back-office orders table)
export interface OrderClient {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
}

// order as seen by the bookshop: it includes the client instead of the bookshop
export interface BookshopOrder {
    id: number;
    state: OrderStatus;
    message: string | null;
    createdAt: string;
    updatedAt: string; // used for the "last modified" column, Sequelize updates it on every PATCH
    orderItems: OrderItemData[];
    client: OrderClient;
}