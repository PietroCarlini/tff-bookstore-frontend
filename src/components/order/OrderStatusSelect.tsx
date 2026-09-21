"use client";

import { useState } from "react";
import { updateOrderStatusAction } from "@/actions/orderAction";
import { OrderStatus } from "@/types/orderTypes";
import { statusColors } from "@/components/order/OrderStatusBadge";

// value = what the backend expects (DB ENUM), label = what the user reads
const options: { value: OrderStatus; label: string }[] = [
    { value: "Sent", label: "Sent" },
    { value: "In Progress", label: "In Progress" },
    { value: "Ready", label: "Ready for pickup" },
    { value: "Collected", label: "Collected" },
    { value: "Canceled", label: "Canceled" },
];

interface OrderStatusSelectProps {
    orderId: number;
    status: OrderStatus;
    onChanged: () => void; //called after a successful PATCH, so the page can reload the orders
}

export default function OrderStatusSelect({ orderId, status, onChanged }: OrderStatusSelectProps) {
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        // e.target.value is a generic string, 'as OrderStatus' is a way to say to TS 'trust that it's one of the OrderStatus values'
        const newStatus = e.target.value as OrderStatus;

        setSaving(true);
        setError(null);

        const outcome = await updateOrderStatusAction(orderId, newStatus);

        setSaving(false);
        if (outcome.success) {
            onChanged();
        } else {
            setError(outcome.message) //error from updateOrderStatusAction
        }

    }

    return (
        <div>
            <div className="relative">
                <select
                    aria-label={`Status of order ${orderId}`}
                    value={status} // controlled: always the value coming from the server
                    onChange={handleChange}
                    disabled={saving}
                    className={
                        "h-[34px] w-full cursor-pointer appearance-none rounded-lg border pl-2.5 pr-7 " +
                        "font-sans text-xs font-semibold text-carbon disabled:opacity-60 " +
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal " +
                        statusColors[status]
                    }
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {/* custom arrow: appearance-none removes the native one; pointer-events-none lets the click reach the select */}
                <svg
                    className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-carbon"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                >
                    <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
            {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}