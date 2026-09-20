"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/UI/Button";
import { addToListAction } from "@/actions/listsAction";
import { ListItem } from "@/types/listsTypes";

interface MarkAsReadButtonProps {
    item: ListItem;
}

export default function MarkAsReadButton({ item }: MarkAsReadButtonProps) {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleMarkAsRead() {
        setSaving(true);
        setError(null);

        // the backend removes the book from "to read" when it is added to "read": we just add it and refresh the page
        const outcome = await addToListAction("read", {
            ISBN: item.ISBN,
            title: item.title,
            author: item.author,
            cover_url: item.cover_url ?? undefined, // the backend accepts a string or nothing, not null
        });

        if (outcome.success) {
            router.refresh(); // re-runs the Server Component (the page): the book disappears from To read
        } else {
            setError(outcome.message);
        }
        setSaving(false);
    }

    return (
        <div>
            <Button onClick={handleMarkAsRead} disabled={saving}>
                {saving ? "Saving..." : "Mark as read"}
            </Button>
            {error && <p role="alert" className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
    );
}