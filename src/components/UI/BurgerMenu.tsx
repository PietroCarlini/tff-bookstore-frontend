"use client";

import Link from "next/link";
import { logoutAction } from "@/actions/authAction";

interface BurgerMenuProps {
    open: boolean;
    onClose: () => void;
}

const links = [
    { href: "/client/my-lists", label: "My Lists" },
    { href: "/client/order-history", label: "Orders" },
    { href: "/client/profile", label: "Profile" },
];

export default function BurgerMenu({ open, onClose }: BurgerMenuProps) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 md:hidden">
            <div
                className="absolute inset-0 bg-carbon/40"
                onClick={onClose}
                aria-hidden="true"
            />

            <nav
                aria-label="Main menu"
                className="absolute right-0 top-0 flex h-full w-64 flex-col gap-2 bg-stormy-teal p-6">

                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close menu"
                    className="mb-4 flex h-11 w-11 self-end items-center justify-center rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-white">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                </button>
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        onClick={onClose}
                        className="border-b border-white/15 py-3 font-sans text-base font-medium text-white"
                    >
                        {link.label}
                    </Link>
                ))}

                <button
                    type="button"
                    onClick={() => logoutAction()}
                    className="mt-2 py-3 text-left font-sans text-base font-medium text-white">
                    Logout
                </button>
            </nav>
        </div>
    );
}