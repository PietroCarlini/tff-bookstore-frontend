import Image from "next/image";
import { getListAction } from "@/actions/listsAction";
import RemoveButton from "@/components/lists/RemoveButton";
import MarkAsReadButton from "@/components/lists/MarkAsReadButton";

export default async function ToReadPage() {
    const items = await getListAction("to-read");

    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">To Read</h1>

            {items.length === 0 && (
                <p className="mt-4 text-carbon">No books in this list yet.</p>
            )}

            <ul className="mt-6 flex flex-col gap-4">
                {items.map((item) => (
                    <li key={item.ISBN} className="flex gap-4">
                        {item.cover_url ? (
                            <Image src={item.cover_url} alt={item.title} width={64} height={96} className="rounded" />
                        ) : (
                            <div className="h-24 w-16 rounded bg-carbon/10" />
                        )}
                        <div className="flex flex-col gap-2">
                            <p className="font-sans text-sm font-medium text-carbon">{item.title}</p>
                            <p className="font-sans text-xs text-carbon/70">{item.author}</p>
                            <div className="flex flex-wrap items-start gap-2">
                                <MarkAsReadButton item={item} />
                                <RemoveButton type="to-read" isbn={item.ISBN} />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}