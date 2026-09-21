"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import BurgerMenu from "./BurgerMenu";
import { getGenre } from "@/constants/genres";
import Image from "next/image";

interface HeaderProps {
    initial: string; // first letter of the logged user, computed by the layout (server side)
}

// round icon buttons of the mobile bar (back, search, burger): same style, focus ring only for keyboard
const iconButtonStyles =
    "flex h-11 w-11 items-center justify-center rounded-[10px] text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// magnifier used by the search button and inside the search fields (the colour comes from the parent: currentColor)
function SearchIcon({ size, className }: { size: number, className?: string }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

// back arrow used in the mobile bars
const backIcon = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// pages whose mobile bar is "back arrow + title + burger": title, and where the arrow goes
// backTo: null = the previous page (browser back), e.g. place order goes back to the book
const pageBars: Record<string, { title: string; backTo: string | null; backLabel: string }> = {
    "/client/place-order": { title: "Place an order", backTo: null, backLabel: "Back" },
    "/client/order-history": { title: "Order history", backTo: "/client", backLabel: "Back to home" },
    "/client/profile": { title: "Profile", backTo: "/client", backLabel: "Back to home" },
    "/client/my-lists": { title: "My lists", backTo: "/client", backLabel: "Back to home" },
    "/client/my-lists/to-read": { title: "To read", backTo: "/client/my-lists", backLabel: "Back to My lists" },
    "/client/my-lists/read": { title: "Read", backTo: "/client/my-lists", backLabel: "Back to My lists" },
};

export default function Header({ initial }: HeaderProps) {
    const router = useRouter();
    const pathname = usePathname();
    //the query string of the URL (?q=... or ?genre=...)
    const searchParams = useSearchParams();
    const [menuOpen, setMenuOpen] = useState(false);
    const [query, setQuery] = useState("");
    // the mobile search bar remembers WHERE it was opened: changing page it is closed again (no useEffect needed)
    const [searchOpenAt, setSearchOpenAt] = useState<string | null>(null);

    // on the book page the mobile bar is different (back arrow + breadcrumb + search)
    const isBookPage = pathname.startsWith("/client/book/");

    //results page = /client with a text search or a genre in the URL (same rule as the page: the text wins)
    const term = searchParams.get("q")?.trim();
    const genre = getGenre(searchParams.get("genre") ?? "");
    const isResultsPage = pathname === "/client" && (Boolean(term) || Boolean(genre));
    const resultsTitle = term ? "Search" : genre?.name;

    const bar = pageBars[pathname];
    // the results page has its own title (it depends on the search): the others come from the table
    const barTitle = bar?.title ?? (isResultsPage ? resultsTitle : undefined);

    // the search bar shows the term of the current search
    // when the URL changes we align the text during the render: no useEffect needed
    const urlTerm = term ?? "";
    const [syncedTerm, setSyncedTerm] = useState(urlTerm);
    if (urlTerm !== syncedTerm) {
        setSyncedTerm(urlTerm);
        setQuery(urlTerm);
    }

    const searchOpen = searchOpenAt === pathname;

    function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        const trimmed = query.trim();
        if (!trimmed) return; // empty field or only spaces: no search

        setSearchOpenAt(null);
        router.push(`/client?q=${encodeURIComponent(trimmed)}`);
    }

    // same burger button in all the mobile bars
    const burgerButton = (
        <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className={iconButtonStyles}
        >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        </button>
    );

    return (
        <>
            <header className="sticky top-0 z-40 bg-stormy-teal p-1.5">
                {/* Mobile bar */}
                {isBookPage ? (
                    <div className="flex items-center justify-between px-[18px] py-4 md:hidden">
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => router.back()}
                                aria-label="Back to search results"
                                className={iconButtonStyles}
                            >
                                {backIcon}
                            </button>
                            <span className="font-sans text-[13px] text-white">Search</span>
                        </div>
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => setSearchOpenAt(searchOpen ? null : pathname)}
                                aria-label={searchOpen ? "Close search" : "Open search"}
                                aria-expanded={searchOpen}
                                aria-controls="mobile-search"
                                className={iconButtonStyles}
                            >
                                <SearchIcon size={21} />
                            </button>
                            {burgerButton}
                        </div>
                    </div>
                ) : barTitle ? (
                    /* bar with back arrow + title + burger (fixed-title pages and results) */
                    <div className="flex items-center justify-between px-[18px] py-4 md:hidden">
                        <div className="flex min-w-0 items-center gap-2">
                            {bar?.backTo === null ? (
                                // previous page (e.g. place order goes back to the book)
                                <button
                                    type="button"
                                    onClick={() => router.back()}
                                    aria-label={bar.backLabel}
                                    className={iconButtonStyles}
                                >
                                    {backIcon}
                                </button>
                            ) : (
                                // a fixed page (the results have no entry in the table: back to the home)
                                <Link
                                    href={bar?.backTo ?? "/client"}
                                    aria-label={bar?.backLabel ?? "Back to home"}
                                    className={iconButtonStyles}
                                >
                                    {backIcon}
                                </Link>
                            )}
                            <h1 className="truncate font-heading text-[19px] font-medium text-white">
                                {barTitle}
                            </h1>
                        </div>
                        {burgerButton}
                    </div>
                ) : (
                    <div className="flex items-center justify-between px-[18px] py-4 md:hidden">
                        <Link
                            href="/client"
                            className={
                                "rounded " +
                                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            }
                        >
                            <Image src="/logo-light.png" alt="Bam-book, home" width={131} height={44} priority className="h-11 w-auto" />
                        </Link>
                        {burgerButton}
                    </div>
                )}

                {/* Desktop bar */}
                <div className="hidden items-center justify-between gap-6 px-10 py-3 md:flex">
                    <div className="flex min-w-0 items-center gap-6">
                        <Link
                            href="/client"
                            className={
                                "flex shrink-0 rounded " +
                                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            }
                        >
                            <Image src="/logo-light.png" alt="Bam-book, home" width={149} height={50} priority className="h-[50px] w-auto" />
                        </Link>
                        <form role="search" onSubmit={handleSearch} className="relative min-w-0 max-w-[300px] flex-[0_1_300px]">
                            {/* real label but visually hidden: the placeholder alone is not enough for screen readers */}
                            <label htmlFor="desktop-search" className="sr-only">Search books</label>
                            <input
                                id="desktop-search"
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Title, author, ISBN…"
                                className="h-[42px] w-full rounded-full border border-muted-teal bg-white pl-4 pr-[42px] font-sans text-sm text-carbon placeholder:text-[#6b7570] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                            />
                            <SearchIcon size={16} className="pointer-events-none absolute right-[15px] top-1/2 -translate-y-1/2 text-[#5b6560]" />
                        </form>
                    </div>
                    <div className="flex shrink-0 items-center gap-[26px]">
                        <div className="flex gap-[22px]">
                            <Link href="/client/my-lists" className="font-sans text-sm font-medium text-white hover:text-muted-teal focus-visible:text-muted-teal">
                                My lists
                            </Link>
                            <Link href="/client/order-history" className="font-sans text-sm font-medium text-white hover:text-muted-teal focus-visible:text-muted-teal">
                                Orders
                            </Link>
                        </div>
                        <Link
                            href="/client/profile"
                            aria-label="Profile"
                            className="flex size-[38px] shrink-0 items-center justify-center rounded-full bg-white font-heading text-sm text-stormy-teal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                        >
                            {initial}
                        </Link>
                    </div>
                </div>

                <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
            </header>

            {/* Mobile search bar (book page only): under the green header, opened by the search button */}
            {isBookPage && searchOpen && (
                <form id="mobile-search" role="search" onSubmit={handleSearch} className="relative mx-[18px] mb-1 mt-3.5 md:hidden">
                    <label htmlFor="mobile-search-input" className="sr-only">Search books</label>
                    <input
                        id="mobile-search-input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Title, author, ISBN…"
                        autoFocus
                        className="h-[46px] w-full rounded-full border border-muted-teal bg-alabaster pl-[18px] pr-11 font-sans text-[15px] text-carbon placeholder:text-[#6b7570] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                    />
                    <SearchIcon size={18} className="pointer-events-none absolute right-[15px] top-1/2 -translate-y-1/2 text-[#5b6560]" />
                </form>
            )}
        </>
    );

}