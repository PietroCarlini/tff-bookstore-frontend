"use client";

import { useRouter } from "next/navigation";

export default function RetryButton() {
    const router = useRouter();

    // refresh = the server renders the page again: the failed search is done again
    return (
        <button
            type="button"
            onClick={() => router.refresh()}
            className={
                "ml-1.5 rounded font-medium text-stormy-teal underline " +
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
            }
        >
            Try again
        </button>
    );
}