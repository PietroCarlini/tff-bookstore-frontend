"use server";

import { cookies } from "next/headers";
import { getBookshops } from "@/services/bookshopService";
import { createOrder } from "@/services/orderService";
import { Bookshop } from "@/types/bookshopTypes";
import { NewOrderData } from "@/types/orderTypes";

async function getToken(): Promise<string> {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) {
        throw new Error("Not authenticated");
    }
    return token
}

export async function getBookshopsAction(): Promise<Bookshop[]> {
    const token = await getToken();
    return getBookshops(token)
}
// Discriminated union | : two different object types, TS uses the `success` field (with a literal value of `true` or `false`, not a generic bool) to determine which of the two types it is dealing with at a given point in the code
type CreateOrderResult = { success: true } | { success: false; message: string };

export async function createOrderAction(data: NewOrderData): Promise<CreateOrderResult> {
    try {
        const token = await getToken();
        await createOrder(data, token);
        return { success: true }
    }
    catch (error) {
        return {
            success: false,
            // if an Error is really an error (instanceof) show error.message, otherwise show general message
            message: error instanceof Error ? error.message : 'Failed to send order',
        }
    }
}