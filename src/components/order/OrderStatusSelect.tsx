"use client";

import { useState } from "react";
import { updateOrderStatusAction } from "@/actions/orderAction";
import { OrderStatus } from "@/types/orderTypes";

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
            <select
                aria-label={`Status of order ${orderId}`}
                value={status} // controlled: always the value coming from the server
                onChange={handleChange}
                disabled={saving}
                className="rounded border border-carbon/20 bg-white px-2 py-1 font-sans text-xs text-carbon"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}