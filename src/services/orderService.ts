import { NewOrderData, Order } from "@/types/orderTypes";

const API_URL = process.env.API_URL;

// client creates an order
export async function createOrder(data: NewOrderData, token: string): Promise<void> {
    const res = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json", //Saying to backend => the content is json
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to send order");
    }
}

//client retrives orders history
export async function getMyOrders(token: string): Promise<Order[]> {
    const res = await fetch(`${API_URL}/orders/mine`, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
    });

    if(!res.ok){
        throw new Error("Failed to load orders");
    }

    const data = await res.json();
    return data.orders;
}