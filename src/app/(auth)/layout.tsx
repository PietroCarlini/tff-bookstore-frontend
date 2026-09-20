import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        // h-dvh + overflow-hidden: the page itself never scrolls (dvh = height of the visible screen, also on mobile with the browser bar)
        <div className="flex h-dvh items-center justify-center overflow-hidden bg-stormy-teal p-4">
            {/* max-h-full + overflow-y-auto: if the content is too tall (bookshop registration) only the card scrolls */}
            <div className="max-h-full w-full max-w-100 overflow-y-auto rounded-[18px] bg-white px-6 pb-5 pt-6 shadow-xl [&_h1]:mb-5 [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-carbon">
                <Link href="/" className="mb-1 block w-fit font-heading text-lg text-stormy-teal">
                    Bam-book
                </Link>
                {children}
            </div>
        </div>
    );
}