"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import { addToListAction } from "@/actions/listsAction";
import { ListType } from "@/services/listsService";

interface BookActionsProps {
    isbn: string;
    title: string;
    author: string;
    cover: string | null;
}

export default function BookActions({ isbn, title, author, cover }: BookActionsProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    // outcome of the last add, shown under the buttons: success text or the message from the backend
    const [feedback, setFeedback] = useState<{ success: boolean, message: string } | null>(null);


    // one handler for both lists: list says which one ('to-read' = Wishlist, 'read' = BookTracking) [NB:type in listService]
    async function handleAdd(list: ListType) {
        setSaving(true);
        setFeedback(null);

        // cover_url: the backend accepts a string or nothing, not null, so a missing cover becomes undefined (omitted from the body)
        const outcome = await addToListAction(list, { ISBN: isbn, title, author, cover_url: cover ?? undefined });

        if (outcome.success) {
            setFeedback({
                success: true,
                message: list === "to-read" ? "Added to your To read list" : "Marked as read",
            });
        } else {
            setFeedback({ success: false, message: outcome.message });
        }
        setSaving(false);
    }


    function handleOrder() {
        const params = new URLSearchParams({ isbn, title, author, });
        if (cover) params.set('cover', cover);
        router.push(`/client/place-order?${params.toString()}`)
    }


    return (
        <div className="mt-5 flex flex-col gap-3 md:max-w-[420px]">
            {/* custom lists don't exist yet: the button is in the layout as agreed but disabled */}
            <Button variant="secondary" disabled className="w-full">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16M4 12h10M4 18h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Add to a list
            </Button>
            <p className="-mt-1 font-sans text-xs text-carbon/70">Custom lists are coming soon.</p>

            <div className="flex gap-3">
                <Button onClick={handleOrder} className="flex-1">Order</Button>
                <Button variant="outline-teal" onClick={() => handleAdd("to-read")} disabled={saving} className="flex-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 4h12v16l-6-4-6 4V4z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                    </svg>
                    To read
                </Button>
            </div>

            {/* the live region is always in the page: screen readers announce the message when it appears */}
            <div aria-live="polite" className="empty:hidden">
                {feedback && (
                    <p className={`font-sans text-sm ${feedback.success ? "text-carbon" : "text-red-600"}`}>
                        {feedback.message}
                    </p>
                )}
            </div>
        </div>
    );
}