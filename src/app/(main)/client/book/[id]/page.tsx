import Image from "next/image";
import { getBookDetailsAction } from "@/actions/bookAction";
import BookActions from "@/components/book/bookAction";

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const book = await getBookDetailsAction(id);

    // authors is always an array (maybe empty): fallback text if the author is unknown
    const authors = book.authors.join(", ") || "Unknown author";

    const details = [
        { label: "Publisher", value: book.publisher || "Not available" },
        { label: "ISBN", value: book.isbn },
    ];

    return (
        <main className="mx-auto max-w-[1040px] pb-8">
            {/* mobile: one column; from md up: cover on the left, info on the right */}
            <div className="flex flex-col gap-4 px-[18px] pt-4 md:flex-row md:items-start md:gap-[60px] md:px-10 md:pt-11">
                {/* green block: full width on mobile, fixed size on desktop; the real cover sits inside it, not cropped */}
                <div className="flex h-[216px] w-full shrink-0 items-center justify-center rounded-[14px] bg-seaweed p-3 md:h-[392px] md:w-[280px] md:rounded-2xl md:p-5">
                    {book.cover ? (
                        <Image
                            src={book.cover}
                            alt={`Cover of ${book.title}`}
                            width={280}
                            height={420}
                            className="h-full w-auto rounded"
                        />
                    ) : (
                        <p className="text-center font-heading text-base text-carbon">{book.title}</p>
                    )}
                </div>

                <div className="md:max-w-[420px] md:pt-1">
                    <h1 className="font-heading text-[22px] font-medium text-carbon md:text-[30px]">{book.title}</h1>
                    <p className="mt-1 font-sans text-[15px] italic text-stormy-teal md:text-base">{authors}</p>

                    {/* desktop only: details as rows above the buttons (on mobile they are a section below the description) */}
                    <dl className="mt-5 hidden md:block">
                        {details.map((row) => (
                            <div key={row.label} className="flex items-baseline justify-between border-b border-stormy-teal/10 py-2.5 font-sans text-sm text-carbon">
                                <dt className="text-[11px] font-semibold uppercase tracking-[0.07em] text-stormy-teal">{row.label}</dt>
                                <dd>{row.value}</dd>
                            </div>
                        ))}
                    </dl>

                    <BookActions isbn={book.isbn} title={book.title} author={authors} cover={book.cover} />
                </div>
            </div>

            <section className="mt-4 border-t border-muted-teal px-[18px] py-4 md:mt-6 md:px-10 md:py-6">
                <h2 className="mb-2 font-heading text-base font-medium text-carbon md:text-lg">Description</h2>
                <p className="max-w-[640px] font-sans text-sm leading-relaxed text-carbon/80">
                    {book.description || "No description available."}
                </p>
            </section>

            {/* mobile only: details table below the description */}
            <section className="border-t border-muted-teal px-[18px] py-4 md:hidden">
                <h2 className="mb-2 font-heading text-base font-medium text-carbon">Details</h2>
                <dl>
                    {details.map((row) => (
                        <div key={row.label} className="flex justify-between border-t border-stormy-teal/10 py-2 font-sans text-[13.5px] first:border-t-0">
                            <dt className="text-carbon/70">{row.label}</dt>
                            <dd className="font-medium text-carbon">{row.value}</dd>
                        </div>
                    ))}
                </dl>
            </section>
        </main>
    );
}