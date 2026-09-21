import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        // h-dvh + overflow-hidden: the page itself never scrolls (dvh = height of the visible screen, also on mobile with the browser bar)
        <div className="flex h-dvh items-center justify-center overflow-hidden bg-stormy-teal p-4">
            {/* max-h-full + overflow-y-auto: if the content is too tall (bookshop registration) only the card scrolls */}
            <div
                className={
                    "max-h-full w-full max-w-100 overflow-y-auto rounded-[18px] bg-white " +
                    "px-6 pb-[22px] pt-[26px] shadow-[0_12px_32px_rgba(0,0,0,0.2)] " +
                    "[&_h1]:mb-[18px] [&_h1]:font-heading [&_h1]:text-2xl [&_h1]:font-semibold [&_h1]:text-carbon"
                }
            >
                <Link href="/" className="mb-1 block w-fit font-heading text-lg font-medium text-stormy-teal">
                    Bam-book
                </Link>
                {children}
            </div>
        </div>
    );
}