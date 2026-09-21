import Image from "next/image";
import Link from "next/link";
import { ListItem } from "@/types/listsTypes";

interface ListBookRowProps {
    item: ListItem;
    children: React.ReactNode; // the buttons of the row: they change from list to list
}

export default function ListBookRow({ item, children }: ListBookRowProps) {
    // the detail page is opened from the ISBN: a page in between finds the book and redirects to it
    const detailsHref = `/client/book/isbn/${encodeURIComponent(item.ISBN)}`;

    return (
        <li className="flex items-start gap-4 border-b border-stormy-teal/[0.12] py-3.5">
            {/* the real cover fills the block; without a cover the block stays green */}
            <div className="relative h-[116px] w-20 shrink-0 overflow-hidden rounded-lg bg-seaweed md:h-[150px] md:w-[104px]">
                {item.cover_url && (
                    // alt="": the title is written right next to it, a screen reader would read it twice
                    <Image
                        src={item.cover_url}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 104px, 80px"
                        className="object-cover"
                    />
                )}
            </div>

            <div>
                <p className="mb-[3px] font-heading text-base font-medium leading-[1.3] text-carbon md:text-[17px]">
                    {/* the only link of the row: the title */}
                    <Link
                        href={detailsHref}
                        className={
                            "rounded hover:underline " +
                            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                        }
                    >
                        {item.title}
                    </Link>
                </p>
                <p className="mb-3 font-sans text-sm italic text-stormy-teal">{item.author}</p>
                <div className="flex flex-wrap gap-2">{children}</div>
            </div>
        </li>
    );
}