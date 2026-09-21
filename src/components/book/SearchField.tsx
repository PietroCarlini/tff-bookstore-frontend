"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/UI/Input";

interface SearchFieldProps {
    initialValue?: string; // the term already searched (shown in the results page)
    className?: string;    // margins and width are decided by who uses the field
}

export default function SearchField({ initialValue = "", className = "" }: SearchFieldProps) {
    const router = useRouter();
    const [query, setQuery] = useState(initialValue);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        const trimmed = query.trim();
        if (!trimmed) return; // empty field or only spaces: no search

        router.push(`/client?q=${encodeURIComponent(trimmed)}`);
    }

    return (
        <form role="search" onSubmit={handleSubmit} className={className}>
            <Input
                id="page-search"
                label="Search books"
                variant="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Title, author, ISBN…"
            />
        </form>
    );
}