"use client";

import { useState } from "react";
import { updateOrderPriceAction } from "@/actions/orderAction";

interface OrderPriceInputProps {
    orderId: number;
    price: string | null; // DECIMAL comes back as a string from the API (e.g. "12.50"), null until the bookshop sets it
    onChanged: () => void; // called after a successful PATCH, so the page can reload the orders
}

export default function OrderPriceInput({ orderId, price, onChanged }: OrderPriceInputProps) {
    const [value, setValue] = useState(price ?? "");
    // last value known to be saved: compared with the input to skip a PATCH when nothing changed
    const [saved, setSaved] = useState(price ?? "");
    const [saving, setSaving] = useState(false);
    const [feedback, setFeedback] = useState<{ success: boolean; message: string } | null>(null);

    async function handleSave() {
        if (saving || value.trim() === saved) return; // already saving, or nothing changed: no request

        // accept both "12.5" and "12,5"
        const parsed = Number(value.trim().replace(",", "."));
        if (!value.trim() || Number.isNaN(parsed) || parsed <= 0) {
            setFeedback({ success: false, message: "Enter a price greater than 0" });
            return;
        }

        setSaving(true);
        setFeedback(null);

        const outcome = await updateOrderPriceAction(orderId, parsed);

        if (outcome.success) {
            const formatted = parsed.toFixed(2);
            setValue(formatted);
            setSaved(formatted);
            setFeedback({ success: true, message: "Saved" });
            onChanged();
        } else {
            setFeedback({ success: false, message: outcome.message });
        }
        setSaving(false);
    }

    return (
        // a form with a single field: Enter submits it, so we save on Enter and on blur
        <form
            onSubmit={(e) => {
                e.preventDefault();
                handleSave();
            }}
        >
            <div className="flex items-center gap-1">
                <span aria-hidden="true">€</span>
                <input
                    type="text"
                    inputMode="decimal"
                    aria-label={`Price of order ${orderId}, in euro`}
                    value={value}
                    onChange={(e) => {
                        setValue(e.target.value);
                        setFeedback(null); // the previous outcome is no longer true once the user edits again
                    }}
                    onBlur={handleSave}
                    readOnly={saving} // readOnly instead of disabled: a disabled input would drop the keyboard focus
                    className="w-20 rounded border border-carbon/20 bg-white px-2 py-1 font-sans text-xs text-carbon"
                />
            </div>

            {/* the live region is always in the page: screen readers announce the messages when they appear */}
            <div aria-live="polite" className="empty:hidden">
                {saving && <p className="mt-1 text-xs text-carbon/70">Saving...</p>}
                {feedback && (
                    <p className={`mt-1 text-xs ${feedback.success ? "text-carbon/70" : "text-red-600"}`}>
                        {feedback.message}
                    </p>
                )}
            </div>
        </form>
    );
}