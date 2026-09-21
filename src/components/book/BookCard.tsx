import Image from "next/image";
import Link from "next/link";
import { Book } from "@/types/bookTypes";

export default function BookCard({ book }: { book: Book }) {
    // the backend can send authors as undefined (Google sometimes omits it), so no plain .join
    const authors = book.authors?.join(", ") || "Unknown author";

    return (
        <Link
            href={`/client/book/${book.id}`}
            className={
                "block w-[100px] shrink-0 rounded-[10px] md:w-auto " +
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
            }
        >
            {/* relative + overflow-hidden: the image (fill) takes the whole block, cropped to the rounded corners */}
            <div
                className={
                    "relative mb-2 flex h-[138px] w-[100px] items-center justify-center " +
                    "overflow-hidden rounded-[10px] bg-seaweed p-2 " +
                    "md:mb-2.5 md:h-[190px] md:w-full md:p-2.5"
                }
            >
                {book.cover ? (
                    // alt="": the title is written right below, a screen reader would read it twice
                    <Image
                        src={book.cover}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 160px, 100px"
                        className="object-cover"
                    />
                ) : (
                    <span className="text-center font-heading text-[13px] leading-[1.25] text-carbon md:text-sm">
                        {book.title}
                    </span>
                )}
            </div>
            <p className="font-heading text-[13px] leading-[1.3] text-carbon">{book.title}</p>
            <p className="text-[11.5px] italic text-[#5b6560]">{authors}</p>
        </Link>
    );
}