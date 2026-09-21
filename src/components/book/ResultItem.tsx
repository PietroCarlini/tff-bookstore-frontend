import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/bookTypes";

export default function ResultItem({ book }: { book: Book }) {
    // the backend can send authors as undefined (Google sometimes omits it)
    const authors = book.authors?.join(", ") || "Unknown author";

    return (
        <li>
            <Link
                href={`/client/book/${book.id}`}
                className={
                    // mobile: a row with a bottom line
                    "flex items-center gap-[13px] border-b border-stormy-teal/[0.12] px-[18px] py-[13px] " +
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stormy-teal " +
                    // desktop: a card (the border is there but transparent, so on focus it only changes colour)
                    "md:flex-col md:items-stretch md:gap-0 md:rounded-xl md:border md:border-transparent md:p-2.5 " +
                    "md:hover:bg-muted-teal/[0.14] md:focus-visible:ring-0 md:focus-visible:border-stormy-teal"
                }
            >
                <div
                    className={
                        "relative h-[74px] w-[52px] shrink-0 overflow-hidden rounded-md bg-seaweed " +
                        "md:mb-2.5 md:h-[210px] md:w-full md:rounded-lg"
                    }
                >
                    {book.cover && (
                        // alt="": the title is written right next to it, a screen reader would read it twice
                        <Image
                            src={book.cover}
                            alt=""
                            fill
                            sizes="(min-width: 768px) 200px, 52px"
                            className="object-cover"
                        />
                    )}
                </div>

                <div>
                    <p className="mb-[3px] font-heading text-[15px] font-medium leading-[1.3] text-carbon">
                        {book.title}
                    </p>
                    <p className="font-sans text-[13px] italic text-stormy-teal">{authors}</p>
                </div>
            </Link>
        </li>
    );
}