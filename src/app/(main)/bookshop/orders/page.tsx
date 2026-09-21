"use client";

import { useState, useEffect } from "react";
import { getBookshopOrdersAction } from "@/actions/orderAction";
import OrderPriceInput from "@/components/order/OrderPriceInput";
import { BookshopOrder } from "@/types/orderTypes";
import OrderStatusSelect from "@/components/order/OrderStatusSelect";
import BookshopInput from "@/components/UI/bookshopUI/BookshopInput";
import BookshopButton from "@/components/UI/bookshopUI/BookshopButton";

// shared column layout for header + rows, so labels and values always line up (proportions from the mockup)
const columns =
    "grid grid-cols-[1.5fr_1.1fr_1.3fr_1fr_1.25fr_0.9fr_0.9fr_0.9fr] items-center gap-2 " +
    "font-sans text-[12.5px] leading-[1.35] text-carbon";

// min-w-0 + break-words: a long email or title goes on a new line instead of leaving its column
const cell = "min-w-0 break-words";

// "en-GB" always gives dd/mm/yyyy, whatever the language of the browser
const formatDate = (date: string) => new Date(date).toLocaleDateString("en-GB");

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

    return (
        <main className="px-[18px] pb-8 pt-7 md:px-7">
            <h1 className="mb-[18px] font-heading text-2xl font-semibold text-carbon">Orders</h1>

            <form onSubmit={handleSearch} className="mb-5 flex items-end gap-3">
                {/* mobile: the field takes the space left next to the button; desktop: 260px */}
                <BookshopInput
                    id="search"
                    label="Search the orders"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-w-0 flex-1 md:w-[260px] md:flex-none"
                />
                <BookshopButton type="submit">Search</BookshopButton>
            </form>

            {loading && <p className="mt-4 text-carbon">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {!loading && !error && orders.length === 0 && (
                <p className="mt-4 text-carbon">No orders found.</p>
            )}

            {orders.length > 0 && (
                // on a narrow screen the table keeps its width and scrolls sideways inside this box
                // tabIndex={0}: so who uses the keyboard can scroll the box too
                <div
                    role="region"
                    aria-label="Orders table"
                    tabIndex={0}
                    className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                >
                    <div role="table" aria-label="Orders" className="min-w-[960px]">
                        {/* header row */}
                        <div role="row" className={`${columns} border-b border-carbon/20 py-2 font-semibold`}>
                            <span role="columnheader" className={cell}>Client</span>
                            <span role="columnheader" className={cell}>ISBN</span>
                            <span role="columnheader" className={cell}>Title</span>
                            <span role="columnheader" className={cell}>Author</span>
                            <span role="columnheader" className={cell}>Status</span>
                            <span role="columnheader" className={cell}>Order date</span>
                            <span role="columnheader" className={cell}>Price</span>
                            <span role="columnheader" className={cell}>Last modified</span>
                        </div>

                        <ul>
                            {orders.map((order) => {
                                // for the demo, an order contains one single book
                                const item = order.orderItems[0];

                                return (
                                    <li
                                        key={order.id}
                                        role="row"
                                        className={`${columns} border-b border-carbon/10 py-2.5`}
                                    >
                                        <span role="cell" className={cell}>{order.client.email}</span>
                                        <span role="cell" className={cell}>{item.ISBN}</span>
                                        <span role="cell" className={cell}>{item.title}</span>
                                        <span role="cell" className={cell}>{item.author}</span>
                                        <span role="cell" className={cell}>
                                            <OrderStatusSelect
                                                orderId={order.id}
                                                status={order.state}
                                                onChanged={() => fetchOrders(query || undefined)} // keep the current search after a PATCH
                                            />
                                        </span>
                                        <span role="cell" className={cell}>{formatDate(order.createdAt)}</span>
                                        <span role="cell" className={cell}>
                                            <OrderPriceInput
                                                orderId={order.id}
                                                price={item.price}
                                                onChanged={() => fetchOrders(query || undefined)} // keep the current search after a PATCH
                                            />
                                        </span>
                                        <span role="cell" className={cell}>{formatDate(order.updatedAt)}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            )}
        </main>
    );
}