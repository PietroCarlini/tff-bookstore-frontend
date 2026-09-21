import Image from "next/image";
import { ListItem } from "@/types/listsTypes";

interface ListBookRowProps {
    item: ListItem;
    children: React.ReactNode; // the buttons of the row: they change from list to list
}

export default function ListBookRow({ item, children }: ListBookRowProps) {
    return (
        <li className="flex items-start gap-[13px] border-b border-stormy-teal/[0.12] py-3.5">
            {/* the real cover fills the block; without a cover the block stays green */}
            <div className="relative h-[74px] w-[52px] shrink-0 overflow-hidden rounded-md bg-seaweed md:h-24 md:w-16">
                {item.cover_url && (
                    // alt="": the title is written right next to it, a screen reader would read it twice
                    <Image
                        src={item.cover_url}
                        alt=""
                        fill
                        sizes="(min-width: 768px) 64px, 52px"
                        className="object-cover"
                    />
                )}
            </div>

            <div>
                <p className="mb-[3px] font-heading text-[15px] font-medium leading-[1.3] text-carbon md:text-base">
                    {item.title}
                </p>
                <p className="mb-2.5 font-sans text-[13px] italic text-stormy-teal">{item.author}</p>
                <div className="flex flex-wrap gap-2">{children}</div>
            </div>
        </li>
    );
}