import Image from "next/image";
import { getBookDetailsAction } from "@/actions/bookAction";
import { getListAction } from "@/actions/listsAction";
import BookActions from "@/components/book/bookAction";

export default async function BookDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // book details and "To read" list are independent: they start together (Promise.all)
    // if the list can't be read (not logged in, backend error) we fall back to an empty list: the page opens anyway
    const [book, toReadList] = await Promise.all([
        getBookDetailsAction(id),
        getListAction("to-read").catch(() => []),
    ]);

    // true if this book is already in the "To read" list: it decides the starting look of the "To read" button
    const isInToRead = toReadList.some((item) => item.ISBN === book.isbn);

    // authors is always an array (maybe empty): fallback text if the author is unknown
    const authors = book.authors.join(", ") || "Unknown author";

    const details = [
        { label: "Publisher", value: book.publisher || "Not available" },
        { label: "ISBN", value: book.isbn },
    ];

    return (
        <main className="mx-auto max-w-[1040px]">
            {/* mobile: one column; from md up: cover on the left, info on the right */}
            <div className="flex flex-col gap-4 px-[18px] pb-1 pt-4 md:flex-row md:items-start md:gap-[60px] md:px-10 md:pb-7 md:pt-11">
                {/* green block: the real cover sits inside it, not cropped */}
                <div className="flex h-[200px] w-full shrink-0 items-center justify-center rounded-[14px] bg-seaweed p-3.5 md:h-[392px] md:w-[280px] md:rounded-2xl md:p-5">
                    {book.cover ? (
                        <Image
                            src={book.cover}
                            alt={`Cover of ${book.title}`}
                            width={280}
                            height={420}
                            className="h-full w-auto rounded"
                        />
                    ) : (
                        <p className="text-center font-heading text-sm leading-[1.3] text-carbon md:text-base">{book.title}</p>
                    )}
                </div>

                <div className="md:max-w-[420px] md:pt-1">
                    <h1 className="font-heading text-[22px] font-medium text-carbon md:text-[30px]">{book.title}</h1>
                    <p className="mt-1 font-sans text-[15px] italic text-stormy-teal md:text-base">{authors}</p>

                    {/* desktop only: details as rows above the buttons (on mobile they are a section below the description) */}
                    <div className="mb-[26px] mt-[22px] hidden md:block">
                        {details.map((row) => (
                            <div
                                key={row.label}
                                role="group"
                                aria-label={`${row.label} : ${row.value}`}
                                className="flex items-baseline justify-between border-b border-stormy-teal/[0.12] py-[11px] font-sans text-sm text-carbon"
                            >
                                <span className="text-[11px] font-semibold uppercase tracking-[0.07em] text-stormy-teal">{row.label}</span>
                                <span>{row.value}</span>
                            </div>
                        ))}
                    </div>

                    <BookActions
                        isbn={book.isbn}
                        title={book.title}
                        author={authors}
                        cover={book.cover}
                        initialSaved={isInToRead}
                    />
                </div>
            </div>

            <section className="border-t border-muted-teal px-[18px] py-4 md:px-10 md:pb-12 md:pt-6">
                <h2 className="mb-2 font-heading text-base font-medium text-carbon md:mb-2.5 md:text-lg">Description</h2>
                <p className="font-sans text-sm leading-[1.6] text-[#3f4744] md:max-w-[640px] md:text-[14.5px]">
                    {book.description || "No description available."}
                </p>
            </section>

            {/* mobile only: details table below the description */}
            <section className="border-t border-muted-teal px-[18px] py-4 md:hidden">
                <h2 className="mb-2 font-heading text-base font-medium text-carbon">Details</h2>
                <div>
                    {details.map((row) => (
                        <div
                            key={row.label}
                            role="group"
                            aria-label={`${row.label} : ${row.value}`}
                            className="flex justify-between border-t border-stormy-teal/10 py-[7px] font-sans text-[13.5px] first:border-t-0"
                        >
                            <span className="text-[#5b6560]">{row.label}</span>
                            <span className="font-medium text-carbon">{row.value}</span>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}