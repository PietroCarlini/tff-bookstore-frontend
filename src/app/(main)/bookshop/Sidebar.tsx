"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/bookshop/catalogue", label: "Catalogue" },
    { href: "/bookshop/orders", label: "Orders" },
    { href: "/bookshop/accounting", label: "Accounting" },
];

export default function Sidebar() {
    const pathname = usePathname(); //Next hook: it reads the url

    //Function to add a tailwind calss on the 'section'(link) selected (catalogue, orders or accounting)
    const linkClass = (href: string) =>
        `rounded px-3 py-2 font-sans text-sm font-medium text-white ${
            pathname.startsWith(href) ? "bg-white/15" : "hover:bg-white/10" //link to the url(if url /bookshop/catalogue = catalogue has class )
        }`;

    return (
        <nav aria-label="Bookshop navigation" className="flex h-screen w-56 flex-col bg-stormy-teal p-6">
            <p className="font-heading text-xl text-white">Bam-book</p>

            <div className="mt-10 flex flex-col gap-2">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        aria-current={pathname.startsWith(link.href) ? "page" : undefined}
                        className={linkClass(link.href)}
                    >
                        {link.label}
                    </Link>
                ))}
            </div>

            <div className="flex-1" />

            <Link
                href="/bookshop/profile"
                aria-current={pathname.startsWith("/bookshop/profile") ? "page" : undefined}
                className={linkClass("/bookshop/profile")}
            >
                Profile
            </Link>
        </nav>
    );
}
