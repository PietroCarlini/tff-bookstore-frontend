import { getListAction } from "@/actions/listsAction";
import ListBookRow from "@/components/lists/ListBookRow";
import MarkAsReadButton from "@/components/lists/MarkAsReadButton";
import RemoveButton from "@/components/lists/RemoveButton";

export default async function ToReadPage() {
    const items = await getListAction("to-read");

    return (
        <main className="px-[18px] pb-6 pt-1 md:mx-auto md:max-w-[1040px] md:px-10 md:pb-12 md:pt-[34px]">
            {/* desktop only: on mobile the title is in the green header */}
            <h1 className="mb-[18px] hidden font-heading text-[26px] font-medium text-carbon md:block">
                To read
            </h1>

            {items.length === 0 && (
                <p className="py-3.5 font-sans text-sm text-carbon">No books in this list yet.</p>
            )}

            {/* desktop: one column of 720px, aligned with the title */}
            <ul className="md:max-w-[720px]">
                {items.map((item) => (
                    <ListBookRow key={item.ISBN} item={item}>
                        <MarkAsReadButton item={item} />
                        <RemoveButton type="to-read" isbn={item.ISBN} />
                    </ListBookRow>
                ))}
            </ul>
        </main>
    );
}