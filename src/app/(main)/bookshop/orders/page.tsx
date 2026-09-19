"use client";

import { useState, useEffect } from "react";
import { getBookshopOrdersAction } from "@/actions/orderAction";
import OrderPriceInput from "@/components/order/OrderPriceInput";
import { BookshopOrder } from "@/types/orderTypes";
import OrderStatusSelect from "@/components/order/OrderStatusSelect";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";


export default function BookshopOrdersPage() {
    const [query, setQuery] = useState('');
    const [orders, setOrders] = useState<BookshopOrder[]>([]);
    const [loading, setLoading] = useState(true); // true from the start, so "No orders yet" doesn't flash before the first fetch
    const [error, setError] = useState<string | null>(null);

    async function fetchOrders(search?: string) {
        setError(null);
        try {
            const data = await getBookshopOrdersAction(search);
            setOrders(data);
        } catch {
            setError("An error occurred while loading the orders");
        } finally {
            setLoading(false);
        }
    }

    // load the orders on first render
    useEffect(() => {
        fetchOrders();
    }, []);

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        fetchOrders(query || undefined) //if search is clicked with no text (undefined), recharge all orders 
    }

    // shared column layout for header + rows, so labels and values always line up
    const columns = "grid grid-cols-8 gap-2";

    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">Orders</h1>

            <form onSubmit={handleSearch} className="mt-6 flex items-end gap-3">
                <Input
                    id="search"
                    label="Search the orders"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit">Search</Button>
            </form>

            {loading && <p className="mt-4 text-carbon">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {!loading && !error && orders.length === 0 && (
                <p className="mt-4 text-carbon">No orders found.</p>
            )}

            {orders.length > 0 && (
                <div role="table" aria-label="Orders" className="mt-6 font-sans text-sm text-carbon">
                    {/* header row */}
                    <div role="row" className={`${columns} border-b border-carbon/20 py-2 font-medium`}>
                        <span role="columnheader">Client</span>
                        <span role="columnheader">ISBN</span>
                        <span role="columnheader">Title</span>
                        <span role="columnheader">Author</span>
                        <span role="columnheader">Status</span>
                        <span role="columnheader">Order date</span>
                        <span role="columnheader">Price</span>
                        <span role="columnheader">Last modified</span>
                    </div>

                    <ul>
                        {orders.map((order) => {
                            // for the demo, an order contains one single book
                            const item = order.orderItems[0];

                            return (
                                <li
                                    key={order.id}
                                    role="row"
                                    className={`${columns} items-center border-b border-carbon/10 py-2`}
                                >
                                    <span role="cell">{order.client.email}</span>
                                    <span role="cell">{item.ISBN}</span>
                                    <span role="cell">{item.title}</span>
                                    <span role="cell">{item.author}</span>
                                    <span role="cell">
                                        <OrderStatusSelect
                                            orderId={order.id}
                                            status={order.state}
                                            onChanged={() => fetchOrders(query || undefined)} // keep the current search after a PATCH
                                        />
                                    </span>
                                    <span role="cell">{new Date(order.createdAt).toLocaleDateString()}</span>
                                    <span role="cell">
                                        <OrderPriceInput
                                            orderId={order.id}
                                            price={item.price}
                                            onChanged={() => fetchOrders(query || undefined)} // keep the current search after a PATCH
                                        />
                                    </span>
                                    <span role="cell">{new Date(order.updatedAt).toLocaleDateString()}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            )}
        </main>
    );
}