"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/actions/authAction";

const links = [
    { href: "/bookshop/catalogue", label: "Catalogue" },
    { href: "/bookshop/orders", label: "Orders" },
    { href: "/bookshop/accounting", label: "Accounting" },
];

// look shared by the links and the logout button
const baseLinkStyles =
    "rounded-md px-3 py-2.5 font-sans text-sm font-medium leading-none text-white " +
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ";

export default function Sidebar() {
    const pathname = usePathname(); //Next hook: it reads the url

    //Function to add a tailwind class on the 'section'(link) selected (catalogue, orders or accounting)
    const linkClass = (href: string) =>
        baseLinkStyles + (pathname.startsWith(href) ? "bg-white/15" : "hover:bg-white/10"); //link to the url(if url /bookshop/catalogue = catalogue has class )

    return (
        <nav
            aria-label="Bookshop navigation"
            className={
                // sticky: the bar stays in view while the page scrolls
                "sticky top-0 z-40 " +
                // mobile: a bar on top (logo + Profile/Log out on the first row, the links wrap to a second row)
                "flex flex-wrap items-center justify-between gap-y-2 bg-stormy-teal px-[18px] py-3 " +
                // desktop: the fixed column on the left
                "md:h-screen md:w-50 md:shrink-0 md:flex-col md:flex-nowrap md:items-stretch " +
                "md:justify-start md:gap-y-0 md:p-6"
            }
        >
            {/* the bookshop has no home page: the logo goes to the catalogue */}
            <Link
                href="/bookshop/catalogue"
                className={
                    "block rounded " +
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                }
            >
                <Image
                    src="/logo-light.png"
                    alt="Bam-book, catalogue"
                    width={152}
                    height={51}
                    priority
                    className="h-10 w-auto md:h-auto md:w-full"
                />
            </Link>

            <div className="order-last flex w-full flex-row gap-1.5 md:order-none md:mt-9 md:w-auto md:flex-col">
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

            {/* desktop only: pushes Profile and Log out to the bottom of the column */}
            <div className="hidden md:block md:flex-1" />

            {/* mobile: side by side; desktop: one under the other */}
            <div className="flex items-center gap-1.5 md:flex-col md:items-stretch">
                <Link
                    href="/bookshop/profile"
                    aria-current={pathname.startsWith("/bookshop/profile") ? "page" : undefined}
                    className={linkClass("/bookshop/profile")}
                >
                    Profile
                </Link>
                {/* a button, not a link: it doesn't go to a page, it ends the session */}
                <button
                    type="button"
                    onClick={() => logoutAction()}
                    className={`${baseLinkStyles} text-left hover:bg-white/10`}
                >
                    Log out
                </button>
            </div>
        </nav>
    );
}