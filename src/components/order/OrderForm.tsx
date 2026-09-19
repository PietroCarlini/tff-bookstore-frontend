"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/UI/Button";
import { createOrderAction } from "@/actions/orderAction";
import { Bookshop } from "@/types/bookshopTypes";

interface OrderFormProps {
    book: { isbn: string; title: string; author: string; cover: string | null };
    bookshops: Bookshop[];
}

export default function OrderForm({ book, bookshops }: OrderFormProps) {
    const [bookshopId, setBookshopId] = useState("");
    const [message, setMessage] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState<{ success: boolean; message?: string } | null>(null);

    const selectedBookshop = bookshops.find((b) => String(b.id) === bookshopId);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!bookshopId) return;

        setSubmitting(true);
        setResult(null);

        const outcome = await createOrderAction({
            bookshopId: Number(bookshopId),
            ISBN: book.isbn,
            title: book.title,
            author: book.author,
            cover_url: book.cover ?? undefined,
            message: message.trim() || undefined,
        });

        setResult(outcome.success ? { success: true } : { success: false, message: outcome.message });
        setSubmitting(false);
    }

    if (result?.success) {
        return (
            <p className="mt-6 font-sans text-carbon">
                Order sent! You can check its status in your order history.
            </p>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex gap-4">
                {book.cover ? (
                    <Image src={book.cover} alt={book.title} width={64} height={96} className="rounded" />
                ) : (
                    <div className="h-24 w-16 rounded bg-carbon/10" />
                )}
                <div>
                    <p className="font-sans text-sm font-medium text-carbon">{book.title}</p>
                    <p className="font-sans text-xs text-carbon/70">{book.author}</p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="bookshop" className="text-sm font-sans text-carbon">
                    Bookshop
                </label>
                <select
                    id="bookshop"
                    value={bookshopId}
                    onChange={(e) => setBookshopId(e.target.value)}
                    required
                    className="border border-carbon/30 rounded px-3 py-2 text-base font-sans focus:outline-none focus:ring-2 focus:ring-stormy-teal"
                >
                    <option value="" disabled>Select a bookshop</option>
                    {bookshops.map((b) => (
                        <option key={b.id} value={b.id}>{b.name}</option>
                    ))}
                </select>
            </div>

            {/* the live region is always in the page: screen readers announce the details when a bookshop is selected */}
            <div aria-live="polite" className="empty:hidden">
                {selectedBookshop && (
                    <div className="rounded border border-carbon/10 bg-alabaster p-3 font-sans text-sm text-carbon">
                        <p>{selectedBookshop.address}, {selectedBookshop.city}</p>
                        <p className="mt-1">
                            <a href={`tel:${selectedBookshop.phone}`} className="text-stormy-teal underline">
                                {selectedBookshop.phone}
                            </a>
                        </p>
                        <p className="mt-1">
                            <a href={`mailto:${selectedBookshop.email}`} className="text-stormy-teal underline">
                                {selectedBookshop.email}
                            </a>
                        </p>
                        {selectedBookshop.openingHours && (
                            <p className="mt-1 text-carbon/70">
                                <span className="font-medium">Opening hours:</span> {selectedBookshop.openingHours}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="message" className="text-sm font-sans text-carbon">
                    Message (optional)
                </label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className="border border-carbon/30 rounded px-3 py-2 text-base font-sans focus:outline-none focus:ring-2 focus:ring-stormy-teal"
                />
            </div>

            {result?.success === false && (
                <p className="text-sm text-red-600">{result.message}</p>
            )}

            <Button type="submit" disabled={submitting || !bookshopId}>
                {submitting ? "Sending…" : "Send order"}
            </Button>
        </form>
    );
}