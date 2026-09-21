import Link from "next/link";
import Footer from "@/components/UI/Footer";

// same look as the Button component, but these are links: they go to another page
const linkBase =
    "inline-flex min-h-12 items-center justify-center rounded-full border-[1.5px] px-5 " +
    "font-sans text-[14.5px] font-semibold transition-colors md:flex-1 " +
    "focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-stormy-teal";

const linkPrimary = `${linkBase} border-seaweed bg-seaweed text-carbon`;
const linkSecondary = `${linkBase} border-carbon text-carbon`;
const linkOutlineTeal = `${linkBase} border-muted-teal text-stormy-teal`;

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="flex-1">
                <div className="px-[18px] pb-2 pt-11 text-center md:px-10 md:pb-2.5 md:pt-16">
                    <h1 className="font-heading text-4xl font-medium text-stormy-teal md:text-[72px] md:leading-[1.05]">
                        Bam-book
                    </h1>
                </div>

                {/* buttons: stacked on mobile, in a row from md up */}
                <div className="flex flex-col gap-[11px] px-[18px] pb-7 pt-7 md:mx-auto md:max-w-[620px] md:flex-row md:gap-3.5 md:px-0 md:pb-[52px] md:pt-9">
                    <Link href="/login" className={linkPrimary}>Log in</Link>
                    <Link href="/register" className={linkSecondary}>Sign up as a client</Link>
                    <Link href="/register-bookshop" className={linkOutlineTeal}>Register as bookshop</Link>
                </div>

                {/* the outer div gives the side margin on desktop, the section is centred inside it */}
                <div className="md:px-10">
                    <section className="border-t border-muted-teal px-[18px] py-[18px] md:mx-auto md:max-w-[760px] md:px-0 md:pb-14 md:pt-7">
                        <h2 className="mb-2 font-heading text-base font-medium text-carbon md:mb-2.5 md:text-xl">
                            About Bam-book
                        </h2>
                        <p className="font-sans text-sm leading-[1.6] text-[#3f4744] md:max-w-[680px] md:text-[15px] md:leading-[1.65]">
                            Bam-book connects readers with their local bookshop. Search for any book, keep your
                            To read and Read lists, and place an order with the bookshop of your choice.
                            Bookshops manage their catalogue and follow every order from one simple back-office.
                        </p>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}