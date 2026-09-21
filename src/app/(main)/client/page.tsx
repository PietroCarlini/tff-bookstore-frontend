import { Suspense } from "react";
import { searchBooksAction } from "@/actions/bookAction";
import { genres, getGenre } from "@/constants/genres";
import { Book } from "@/types/bookTypes";
import GenreSection, { GenreSectionSkeleton } from "@/components/book/GenreSection";
import ResultItem from "@/components/book/ResultItem";
import ResultItemSkeleton from "@/components/book/ResultItemSkeleton";
import RetryButton from "@/components/book/RetryButton";
import SearchField from "@/components/book/SearchField";

// shared by the count, the messages and the list: on desktop they line up with the title
const contentWidth = "md:mx-auto md:max-w-[1040px] md:px-10";

const listStyles =
    "md:grid md:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] md:gap-[22px] md:pb-10 " + contentWidth;

const messageStyles = `px-[18px] py-4 font-sans text-sm text-[#3f4744] ${contentWidth}`;

// the search runs here, on the server: the URL is the only thing that decides what we see
async function Results({ query, mockFallback }: { query: string; mockFallback: boolean }) {
    let books: Book[] = [];
    let failed = false;

    try {
        books = await searchBooksAction(query, { mockFallback });
    } catch {
        failed = true;
    }

    // JSX outside the try/catch on purpose (ESLint with React Compiler complains otherwise)
    if (failed) {
        return (
            <p className={messageStyles}>
                We couldn&apos;t load the results.
                <RetryButton />
            </p>
        );
    }

    if (books.length === 0) {
        return <p className={messageStyles}>No books found.</p>;
    }

    return (
        <>
            <p
                className={
                    "px-[18px] pb-2.5 pt-0.5 font-sans text-[12.5px] text-[#5b6560] " +
                    `md:pb-1.5 md:pt-0 md:text-[13px] ${contentWidth}`
                }
            >
                {books.length} {books.length === 1 ? "result" : "results"}
            </p>
            <ul className={listStyles}>
                {books.map((book) => (
                    <ResultItem key={book.id} book={book} />
                ))}
            </ul>
        </>
    );
}

function ResultsSkeleton() {
    return (
        <ul aria-busy="true" className={listStyles}>
            {[0, 1, 2, 3, 4].map((i) => (
                <ResultItemSkeleton key={i} />
            ))}
        </ul>
    );
}

export default async function ClientPage({
    searchParams, // the query string of the URL: /client?q=... or /client?genre=...
}: {
    searchParams: Promise<{ q?: string; genre?: string }>;
}) {
    const { q, genre: genreSlug } = await searchParams;

    const term = q?.trim();
    const genre = genreSlug ? getGenre(genreSlug) : undefined; // undefined if the slug is unknown

    // no valid search in the URL: home with the genre sections
    if (!term && !genre) {
        return (
            <main>
                {/* mobile only: on desktop the search bar is in the header */}
                <SearchField className="mx-[18px] mb-[18px] mt-1 md:hidden" />

                <div className="md:mx-auto md:max-w-[1040px] md:px-10 md:pb-1.5 md:pt-[34px]">
                    {genres.map((g) => (
                        // each section loads on its own: the skeleton stays until its search is finished
                        <Suspense key={g.slug} fallback={<GenreSectionSkeleton genre={g} />}>
                            <GenreSection genre={g} />
                        </Suspense>
                    ))}
                </div>
            </main>
        );
    }

    // the text search wins if both are in the URL
    const title = term ? "Search" : genre!.name;
    const query = term ?? genre!.query;
    const searchKey = term ?? genre!.slug;

    return (
        <main>
            <div className="md:mx-auto md:max-w-[1040px] md:px-10 md:pb-1 md:pt-[34px]">
                {/* desktop only: on mobile the title is in the green header */}
                <h1 className="mb-4 hidden font-heading text-[26px] font-medium text-carbon md:block">
                    {title}
                </h1>
                {/* key: when the search changes the field is created again with the new text */}
                <SearchField
                    key={searchKey}
                    initialValue={term ?? ""}
                    className="mx-[18px] mb-[18px] mt-1 md:hidden"
                />
            </div>

            {/* key: without it, on a new search React would keep the old list until the new one arrives */}
            <Suspense key={searchKey} fallback={<ResultsSkeleton />}>
                {/* the text search keeps the mock fallback (the demo works even if Google fails); the genre one does not */}
                <Results query={query} mockFallback={Boolean(term)} />
            </Suspense>
        </main>
    );
}