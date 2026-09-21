"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import { addToListAction, removeFromListAction } from "@/actions/listsAction";

interface BookActionsProps {
    isbn: string;
    title: string;
    author: string;
    cover: string | null;
    initialSaved: boolean; // true if the book is already in the "To read" list (decided by the page, server side)
}

export default function BookActions({ isbn, title, author, cover, initialSaved }: BookActionsProps) {
    const router = useRouter();
    // saved = the book is in the "To read" list: it decides the look of the button (outline / pressed)
    const [saved, setSaved] = useState(initialSaved);
    const [saving, setSaving] = useState(false);
    // only errors are shown (success is already visible on the button itself)
    const [error, setError] = useState<string | null>(null);

    // one button, two actions: if the book is in the list it removes it, otherwise it adds it
    async function handleToggleToRead() {
        // ignore clicks while a request is running: the backend would accept the same book twice
        if (saving) return;

        setSaving(true);
        setError(null);

        if (saved) {
            try {
                await removeFromListAction("to-read", isbn);
                setSaved(false);
            } catch {
                setError("Couldn't remove the book from your list. Try again.");
            }
        } else {
            // cover_url: the backend accepts a string or nothing, not null, so a missing cover becomes undefined (omitted from the body)
            const outcome = await addToListAction("to-read", { ISBN: isbn, title, author, cover_url: cover ?? undefined });

            if (outcome.success) {
                setSaved(true);
            } else {
                setError(outcome.message);
            }
        }

        setSaving(false);
    }

    function handleOrder() {
        const params = new URLSearchParams({ isbn, title, author, });
        if (cover) params.set('cover', cover);
        router.push(`/client/place-order?${params.toString()}`)
    }

    return (
        <div className="mt-5 flex flex-col gap-[11px] md:mt-0 md:max-w-[420px]">
            {/* custom lists don't exist yet: the button is in the layout as agreed but does nothing for now */}
            <Button variant="secondary" className="w-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16M4 12h10M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Add to a list
            </Button>

            <div className="flex gap-[11px]">
                <Button onClick={handleOrder} className="flex-1">Order</Button>
                <Button
                    variant={saved ? "filled-teal" : "outline-teal"}
                    ariaPressed={saved}
                    onClick={handleToggleToRead}
                    className="flex-1"
                >
                    {/* the bookmark is filled when the book is in the list: the state is told by icon and colour, not colour only */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} aria-hidden="true">
                        <path d="M6 4h12v16l-6-4-6 4V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                    To read
                </Button>
            </div>

            {/* the live region is always in the page: screen readers announce the message when it appears */}
            <div aria-live="polite" className="empty:hidden">
                {error && <p className="font-sans text-sm text-red-600">{error}</p>}
            </div>
        </div>
    );
}