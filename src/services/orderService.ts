import { NewOrderData, Order, BookshopOrder, OrderStatus } from "@/types/orderTypes";

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

// bookshop retrieves all the orders it received, optionally filtered by search
export async function getBookshopOrders(token:string, search?: string ) : Promise<BookshopOrder[]> {
    const params = new URLSearchParams();
    if(search){
        params.set('search', search);
    }

    let url = `${API_URL}/orders/bookshop`;

    if(params.toString() !== ''){
        url = `${API_URL}/orders/bookshop?${params.toString()}`
    }

    const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
        cache: 'no-store'
    })

    if (!res.ok) {
        throw new Error("Failed to load orders");
    }

    const data = await res.json();
    return data.orders;
}

// bookshop changes the state of an order (PATCH sends only the field that changes)
export async function updateOrderStatus(id: number, state: OrderStatus, token: string) : Promise<void> {
    const res = await fetch(`${API_URL}/orders/${id}`, {
        method : 'PATCH',
        headers: { 
            "Content-Type": "application/json", //Saying to backend => the content is json
            Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({ state }) // {state : state}
    })

    if(!res.ok) {
        //if ther's an error..
        const errorData = await res.json().catch(() => null);//..res try to be parse in JSON: if failed it beacame null (rather than crash)
        throw new Error(errorData?.message || 'Failed to update order status') //if no JSON, default message
    }
}