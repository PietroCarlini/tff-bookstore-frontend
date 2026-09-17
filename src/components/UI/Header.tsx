"use client";

import { useState } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="bg-stormy-teal">
            {/* Mobile bar */}
            <div className="flex items-center justify-between px-4 py-4 md:hidden">
                <Link href="/client" className="font-heading text-xl text-white">
                    Bam-book
                </Link>
                <button
                    type="button"
                    onClick={() => setMenuOpen(true)}
                    aria-label="Open menu"
                    className="flex h-11 w-11 items-center justify-center rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </button>
            </div>

            {/* Desktop bar */}
            <div className="hidden items-center justify-between gap-6 px-10 py-4 md:flex">
                <Link href="/client" className="shrink-0 font-heading text-[22px] text-white">
                    Bam-book
                </Link>
                <div className="flex items-center gap-6">
                    <Link href="/client/my-lists" className="font-sans text-sm font-medium text-white hover:text-muted-teal">
                        My lists
                    </Link>
                    <Link href="/client/orders" className="font-sans text-sm font-medium text-white hover:text-muted-teal">
                        Orders
                    </Link>
                    <Link
                        href="/client/profile"
                        aria-label="Profile"
                        className="flex h-38px w-38px items-center justify-center rounded-full bg-white font-heading text-sm text-stormy-teal focus:outline-none focus:ring-2 focus:ring-white"
                    >
                        P
                    </Link>
                </div>
            </div>

            <BurgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
        </header>
    );
}