import Link from "next/link";
import Button from "@/components/UI/Button";

// STUB: sample custom lists, shown switched off. Custom lists don't exist yet:
// delete this array (and the section that uses it) when the real ones arrive
const stubLists = ["Favourites", "Summer reading", "Gift ideas"];

const chevron = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

// look shared by all the rows: thin, rounded, name on the left and arrow on the right
const rowStyles =
    "flex h-[52px] items-center justify-between rounded-[10px] px-4 " +
    "font-heading text-base font-medium text-carbon";

export default function MyListsPage() {
    return (
        <main className="px-[18px] pb-[26px] pt-[18px] md:mx-auto md:max-w-[1040px] md:px-10 md:pb-12 md:pt-[34px]">
            {/* desktop only: on mobile the title is in the green header */}
            <h1 className="mb-[18px] hidden font-heading text-[26px] font-medium text-carbon md:block">
                My lists
            </h1>

            <div className="md:max-w-[480px]">
                {/* the two default lists: the only ones that work */}
                <ul className="flex flex-col gap-2.5">
                    <li>
                        <Link
                            href="/client/my-lists/to-read"
                            className={
                                `${rowStyles} bg-seaweed ` +
                                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                            }
                        >
                            To read
                            {chevron}
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/client/my-lists/read"
                            className={
                                `${rowStyles} bg-seaweed ` +
                                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                            }
                        >
                            Read
                            {chevron}
                        </Link>
                    </li>
                </ul>

                <h2 className="mb-2.5 mt-5 font-sans text-xs font-semibold uppercase tracking-[0.07em] text-stormy-teal">
                    Your lists
                </h2>

                {/* STUB: switched off, not links */}
                <ul className="flex flex-col gap-2.5">
                    {stubLists.map((name) => (
                        <li
                            key={name}
                            className={`${rowStyles} border border-carbon/10 bg-alabaster opacity-[0.55]`}
                        >
                            <span>
                                {name}
                                <span className="sr-only"> (coming soon)</span>
                            </span>
                            {chevron}
                        </li>
                    ))}
                </ul>

                {/* not available yet: same as "Change password" in the profile */}
                <Button variant="secondary" disabled className="mt-3.5 w-full md:w-auto md:px-[22px]">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                    New list
                </Button>
                <p className="mt-2.5 font-sans text-[13px] leading-[1.4] text-[#4c5651]">
                    Custom lists are coming soon.
                </p>
            </div>
        </main>
    );
}