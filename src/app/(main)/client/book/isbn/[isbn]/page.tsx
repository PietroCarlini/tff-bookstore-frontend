import Link from "next/link";
import { redirect } from "next/navigation";
import { searchBooksAction } from "@/actions/bookAction";

// the lists only know the ISBN of a book, but the detail page needs the Google id:
// here the id is looked up with an ISBN search, then we go to the real detail page
export default async function BookByIsbnPage({ params }: { params: Promise<{ isbn: string }> }) {
    const { isbn } = await params;

    let id: string | undefined;
    try {
        // no mock fallback: if Google fails we want the message below, not a fake book
        const books = await searchBooksAction(`isbn:${isbn}`, { mockFallback: false });
        // only the result with exactly this ISBN
        id = books.find((book) => book.isbn === isbn)?.id;
    } catch {
        // id stays undefined: the message below is shown
    }

    // redirect works by throwing a special error: it must stay outside the try/catch
    if (id) redirect(`/client/book/${id}`);

    return (
        <main className="px-[18px] py-6 md:mx-auto md:max-w-[1040px] md:px-10 md:py-12">
            <p className="mb-3 font-sans text-sm text-carbon">We couldn&apos;t find the details of this book.</p>
            <Link
                href="/client/my-lists"
                className={
                    "rounded font-sans text-sm text-stormy-teal underline " +
                    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                }
            >
                Back to My lists
            </Link>
        </main>
    );
}