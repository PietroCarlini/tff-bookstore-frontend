import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/bookTypes";

export default function ResultItem({ book }: { book: Book }) {
    const authors = book.authors?.join(", ") || "Unknown author";

    return (
        <li>
            <Link
                href={`/client/book/${book.id}`}
                className={
                    "flex items-center gap-[13px] border-b border-stormy-teal/[0.12] px-[18px] py-[13px] " +
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stormy-teal " +
                    "md:flex-col md:items-stretch md:gap-0 md:rounded-xl md:border md:border-transparent md:p-2.5 " +
                    "md:hover:bg-muted-teal/[0.14] md:focus-visible:ring-0 md:focus-visible:border-stormy-teal"
                }
            >
                {/* mobile: fixed 52x74 (row). desktop: full width, aspect-[2/3] gives the height instead of a fixed px value */}
                <div
                    className={
                        "relative h-[74px] w-[52px] shrink-0 overflow-hidden rounded-md bg-seaweed " +
                        "md:mb-2.5 md:h-auto md:w-full md:aspect-[2/3] md:rounded-lg"
                    }
                >
                    {book.cover && (
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