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

    // "en-GB" always gives dd/mm/yyyy, whatever the language of the browser
    const date = new Date(order.createdAt).toLocaleDateString("en-GB");

    return (
        <li className="rounded-lg border border-carbon/10 bg-alabaster p-3.5">
            {/* the whole header is the toggle: a real button, so it works with the keyboard and screen readers announce expanded/collapsed */}
            <button
                type="button"
                onClick={() => setOpen(!open)}
                aria-expanded={open}
                aria-controls={detailsId}
                className={
                    "flex w-full items-start justify-between gap-2.5 rounded text-left " +
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                }
            >
                {/* spans instead of divs: inside a button only inline content is valid */}
                <span className="block">
                    <span className="block font-sans text-[13.5px] font-semibold leading-[1.3] text-carbon">
                        {order.bookshop.name}
                    </span>
                    <span className="mt-0.5 block font-sans text-xs leading-[1.3] text-[#4c5651]">
                        {date}
                    </span>
                    <span className="sr-only">Bookshop details</span>
                </span>
                <span className="flex items-center gap-1.5">
                    <OrderStatusBadge status={order.state} />
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className={`text-carbon transition-transform ${open ? "rotate-180" : ""}`}
                    >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </button>

            {/* always in the DOM, just hidden: aria-controls always points to an existing element */}
            <div
                id={detailsId}
                hidden={!open}
                className="mt-3 rounded-lg border border-carbon/10 bg-white p-3 font-sans text-[13px] leading-[1.5] text-carbon"
            >
                <p className="mb-1">{order.bookshop.address}, {order.bookshop.city}</p>
                <p className="mb-1">
                    <a href={`tel:${order.bookshop.phone}`} className="text-stormy-teal underline">
                        {order.bookshop.phone}
                    </a>
                </p>
                <p className="mb-1">
                    <a href={`mailto:${order.bookshop.email}`} className="text-stormy-teal underline">
                        {order.bookshop.email}
                    </a>
                </p>
                {order.bookshop.openingHours && (
                    <p className="mb-1 text-[#4c5651]">
                        <span className="font-semibold">Opening hours:</span> {order.bookshop.openingHours}
                    </p>
                )}

                {/* stub: messaging linked to the order is a future feature */}
                <div className="mt-2.5 flex items-center gap-2.5">
                    <Button variant="secondary" size="sm" disabled>Send a message</Button>
                    <span>Coming soon.</span>
                </div>
            </div>

            <ul>
                {order.orderItems.map((item) => (
                    <li key={item.id} className="mt-3 flex gap-3">
                        {/* the real cover fills the block; without a cover the block stays green */}
                        <div className="relative h-[66px] w-11 shrink-0 overflow-hidden rounded-[5px] bg-seaweed">
                            {item.cover_url && (
                                // alt="": the title is written right next to it, a screen reader would read it twice
                                <Image
                                    src={item.cover_url}
                                    alt=""
                                    fill
                                    sizes="44px"
                                    className="object-cover"
                                />
                            )}
                        </div>
                        <div>
                            <p className="font-sans text-[13.5px] leading-[1.3] text-carbon">{item.title}</p>
                            <p className="mt-0.5 font-sans text-xs leading-[1.3] text-[#4c5651]">{item.author}</p>
                            {item.price && (
                                <p className="mt-1 font-sans text-xs font-semibold leading-[1.3] text-carbon">
                                    Price: €{item.price}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {order.message && (
                <p className="mt-3 font-sans text-xs italic leading-[1.4] text-[#4c5651]">
                    “{order.message}”
                </p>
            )}
        </li>
    );
}