"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/UI/Button";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";
import { Order } from "@/types/orderTypes";

interface OrderCardProps {
    order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
    const [open, setOpen] = useState(false);
    const detailsId = `order-${order.id}-details`; // links the button to the panel it opens (aria-controls)

    return (
        <li className="rounded border border-carbon/10 bg-alabaster p-4">
            {/* the whole header is the toggle: a real button, so it works with the keyboard and screen readers announce expanded/collapsed */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={detailsId}
                className="flex w-full items-start justify-between gap-4 rounded text-left focus:outline-none focus:ring-2 focus:ring-stormy-teal"
            >
                {/* spans instead of divs: inside a button only inline content is valid */}
                <span className="block">
                    <span className="block font-sans text-sm font-medium text-carbon">{order.bookshop.name}</span>
                    <span className="block font-sans text-xs text-carbon/70">
                        {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className="sr-only">Bookshop details</span>
                </span>
                <span className="flex items-center gap-2">
                    <OrderStatusBadge status={order.state} />
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform ${open ? "rotate-180" : ""}`}
                    >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>

            {/* always in the DOM, just hidden: aria-controls always points to an existing element */}
            <div id={detailsId} hidden={!open} className="mt-3 rounded border border-carbon/10 bg-white p-3 font-sans text-sm text-carbon">
                <p>{order.bookshop.address}, {order.bookshop.city}</p>
                <p className="mt-1">
                    <a href={`tel:${order.bookshop.phone}`} className="text-stormy-teal underline">
                        {order.bookshop.phone}
                    </a>
                </p>
                <p className="mt-1">
                    <a href={`mailto:${order.bookshop.email}`} className="text-stormy-teal underline">
                        {order.bookshop.email}
                    </a>
                </p>
                {order.bookshop.openingHours && (
                    <p className="mt-1 text-carbon/70">
                        <span className="font-medium">Opening hours:</span> {order.bookshop.openingHours}
                    </p>
                )}

                {/* stub: messaging linked to the order is a future feature */}
                <div className="mt-3 flex items-center gap-3">
                    <Button variant="secondary" disabled>Send a message</Button>
                    <span className="text-carbon/70">Coming soon.</span>
                </div>
            </div>

            <ul className="mt-3 flex flex-col gap-3">
                {order.orderItems.map((item) => (
                    <li key={item.id} className="flex gap-3">
                        {item.cover_url ? (
                            <Image src={item.cover_url} alt={item.title} width={48} height={72} className="rounded" />
                        ) : (
                            <div className="h-18 w-12 rounded bg-carbon/10" />
                        )}
                        <div>
                            <p className="font-sans text-sm text-carbon">{item.title}</p>
                            <p className="font-sans text-xs text-carbon/70">{item.author}</p>
                        </div>
                    </li>
                ))}
            </ul>

            {order.message && (
                <p className="mt-3 font-sans text-xs italic text-carbon/70">“{order.message}”</p>
            )}
        </li>
    );
}