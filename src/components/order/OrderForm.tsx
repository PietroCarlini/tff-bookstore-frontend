"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/UI/Button";
import { createOrderAction } from "@/actions/orderAction";
import { Bookshop } from "@/types/bookshopTypes";

interface OrderFormProps {
    book: { isbn: string; title: string; author: string; cover: string | null };
    bookshops: Bookshop[];
}

// same look for the select and the message field: 8px corners, border like the other form fields,
// focus outline only for keyboard navigation
const fieldStyles =
    "w-full rounded-lg border border-carbon/30 bg-white px-3 font-sans text-base text-carbon " +
    "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-stormy-teal";

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
            <div>
                <h2 className="mb-2 font-heading text-xl font-medium text-carbon">Order sent!</h2>
                <p className="font-sans text-sm leading-[1.6] text-[#3f4744]">
                    You can check its status in your{" "}
                    <Link
                        href="/client/order-history"
                        className={
                            "rounded text-stormy-teal underline " +
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                        }
                    >
                        order history
                    </Link>
                    .
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[13px]">
            {/* the book of the order */}
            {/* the book of the order */}
            <div className="mb-[7px] flex items-center gap-4">
                <div
                    className={
                        "relative h-[150px] w-[104px] shrink-0 overflow-hidden rounded-lg bg-seaweed " +
                        "md:h-[190px] md:w-[132px]"
                    }
                >
                    {book.cover && (
                        // alt="": the title is written right next to it, a screen reader would read it twice
                        <Image
                            src={book.cover}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 132px, 104px"
                            className="object-cover"
                        />
                    )}
                </div>
                <div>
                    <p className="mb-[3px] font-heading text-[17px] font-medium leading-[1.3] text-carbon">{book.title}</p>
                    <p className="font-sans text-sm italic text-stormy-teal">{book.author}</p>
                </div>
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="bookshop" className="font-sans text-sm leading-[1.3] text-carbon">
                    Bookshop
                </label>
                <div className="relative">
                    <select
                        id="bookshop"
                        value={bookshopId}
                        onChange={(e) => setBookshopId(e.target.value)}
                        required
                        // grey while nothing is chosen, like a placeholder
                        className={`${fieldStyles} h-11 appearance-none pr-10 ${bookshopId === "" ? "text-[#6b7570]" : ""}`}
                    >
                        <option value="" disabled>Select a bookshop</option>
                        {bookshops.map((b) => (
                            <option key={b.id} value={b.id}>{b.name}</option>
                        ))}
                    </select>
                    {/* custom arrow: appearance-none removes the native one; pointer-events-none lets the click reach the select */}
                    <svg
                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-carbon"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
            </div>

            {/* the live region is always in the page: screen readers announce the details when a bookshop is selected */}
            <div aria-live="polite" className="empty:hidden">
                {selectedBookshop && (
                    <div className="rounded-lg border border-carbon/10 bg-alabaster p-3 font-sans text-[13px] leading-normal text-carbon">
                        <p className="mb-1">{selectedBookshop.address}, {selectedBookshop.city}</p>
                        <p className="mb-1">
                            <a href={`tel:${selectedBookshop.phone}`} className="text-stormy-teal underline">
                                {selectedBookshop.phone}
                            </a>
                        </p>
                        <p className="mb-1">
                            <a href={`mailto:${selectedBookshop.email}`} className="text-stormy-teal underline">
                                {selectedBookshop.email}
                            </a>
                        </p>
                        {selectedBookshop.openingHours && (
                            <p className="text-[#4c5651]">
                                <span className="font-semibold">Opening hours:</span> {selectedBookshop.openingHours}
                            </p>
                        )}
                    </div>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <label htmlFor="message" className="font-sans text-sm leading-[1.3] text-carbon">
                    Message (optional)
                </label>
                <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={3}
                    className={`${fieldStyles} min-h-[88px] resize-y py-2.5 leading-[1.4]`}
                />
            </div>

            {/* role="alert": screen readers read the error as soon as it appears */}
            {result?.success === false && (
                <p role="alert" className="text-sm text-red-600">{result.message}</p>
            )}

            <Button type="submit" disabled={submitting || !bookshopId} className="mt-1.5">
                {submitting ? "Sending…" : "Send order"}
            </Button>
        </form>
    );
}