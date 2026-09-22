import Link from "next/link";
import { searchBooksAction } from "@/actions/bookAction";
import { Genre } from "@/constants/genres";
import { Book } from "@/types/bookTypes";
import BookCard from "@/components/book/BookCard";
import BookCardSkeleton from "@/components/book/BookCardSkeleton";
import RetryButton from "@/components/book/RetryButton";

const BOOKS_PER_SECTION = 6;

const sectionStyles = "mb-6 md:mb-[38px]";

// mobile: a row that scrolls sideways; from md up: a grid
const rowStyles =
    "flex gap-3 overflow-x-auto px-[18px] pb-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden " +
    "md:grid md:grid-cols-[repeat(auto-fill,minmax(140px,1fr))] md:gap-[22px] " +
    "md:overflow-visible md:px-0 md:pb-0";

const focusRing =
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal";

// the title is a link to all the books of the genre: same in the three states (loaded, loading, error)
function GenreTitle({ genre }: { genre: Genre }) {
    return (
        <h2 className="mx-[18px] mb-3 md:mx-0 md:mb-[18px]">
            <Link
                href={`/client?genre=${genre.slug}`}
                aria-label={`See all ${genre.name} books`}
                className={
                    "inline-flex items-center gap-1.5 rounded font-heading text-lg font-medium " +
                    `text-carbon hover:text-stormy-teal md:text-[21px] ${focusRing}`
                }
            >
                {genre.name}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </Link>
        </h2>
    );
}

export default async function GenreSection({ genre }: { genre: Genre }) {
    let books: Book[] = [];
    let failed = false;

    try {
        // mockFallback: false -> if Google fails we want the error state, not fake books
        const found = await searchBooksAction(genre.query, { mockFallback: false });
        // the backend sends up to 10 books: we show only the first 6
        //books = found.slice(0, BOOKS_PER_SECTION);
        const shuffled = [...found].sort(() => Math.random() - 0.5); //randomy
        books = shuffled.slice(0, BOOKS_PER_SECTION);
    } catch {
        failed = true;
    }

    // JSX is returned outside the try/catch on purpose (ESLint with React Compiler complains otherwise)
    if (failed) return <GenreSectionError genre={genre} />;

    // no books: not an error, there is just nothing to show
    if (books.length === 0) return null;

    return (
        <section className={sectionStyles}>
            <GenreTitle genre={genre} />
            <div className={rowStyles}>
                {books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))}

                {/* mobile only: on desktop the title link does this job */}
                <Link
                    href={`/client?genre=${genre.slug}`}
                    aria-label={`See more ${genre.name} books`}
                    className={`block w-[100px] shrink-0 rounded-[10px] md:hidden ${focusRing}`}
                >
                    <div
                        className={
                            "mb-2 flex h-[138px] w-[100px] items-center justify-center rounded-[10px] " +
                            "border border-dashed border-muted-teal bg-alabaster text-stormy-teal"
                        }
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <p className="text-center font-heading text-[13px] leading-[1.3] text-stormy-teal">See more</p>
                </Link>
            </div>
        </section>
    );
}

// shown while the section is loading (it will be the Suspense fallback)
export function GenreSectionSkeleton({ genre }: { genre: Genre }) {
    return (
        <section aria-busy="true" className={sectionStyles}>
            <GenreTitle genre={genre} />
            <div className={rowStyles}>
                {[0, 1, 2].map((i) => (
                    <BookCardSkeleton key={i} />
                ))}
                {/* the other three only on desktop: md:contents = the wrapper disappears, the cards become grid items */}
                <div className="hidden md:contents">
                    {[3, 4, 5].map((i) => (
                        <BookCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

export function GenreSectionError({ genre }: { genre: Genre }) {
    return (
        <section className={sectionStyles}>
            <GenreTitle genre={genre} />
            <p
                className={
                    "mx-[18px] rounded-lg border border-carbon/10 bg-alabaster px-4 py-3.5 " +
                    "font-sans text-sm leading-normal text-[#3f4744] md:mx-0"
                }
            >
                We couldn&apos;t load this section.
                <RetryButton />
            </p>
        </section>
    );
}