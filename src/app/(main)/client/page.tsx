"use client";

import { useState } from "react";
import Image from "next/image";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { searchBooksAction } from "@/actions/bookAction"
import { Book } from "@/types/bookTypes"
import Link from "next/link";

export default function ClientHomePage() {

    const [query, setQuery] = useState("");//hook React: rendering at component changes [compValue, FuntionToUpdate] : here searchbar
    const [results, setResults] = useState<Book[]>([]); //result of search= array of books
    const [loading, setLoading] = useState(false);//disable UI while searching
    const [error, setError] = useState<string | null>(null)// error: null by default; becomes a string if something goes wrong technically

    // hasSearched: becomes true only AFTER the first successful search.
    // This is used to distinguish between “Searched for anything yet” and “Searched and there's nothing” [in both cases, results.length would be 0].
    // Note: Without this flag, it would be unclear which message to display (either none, or “no books found”).
    const [hasSearched, setHasSearched] = useState(false);

    // Handles the submission of the search form (submit)
    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();

        if (!query.trim()) return; //If the field is empty or contains only spaces, no search

        setLoading(true); //indicates that the research has begun
        setError(null); //clean previus error

        try {
            const books = await searchBooksAction(query); //call to service (Now Mock)
            setResults(books); //results saved in state
            setHasSearched(true) //indicates a search has been succesfully done
        }
        catch (err) {
            setError('An error occurred during search')
        }
        finally {//It always runs, whether everything goes well or an error occurs
            setLoading(false); //no need to write it twice for each case
        }
    }

    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">
                Client homePage
            </h1>

            {/* The form handles both pressing Enter and clicking the "Search" button (no need onClick on button) */}
            <form onSubmit={handleSearch} className="flex items-end gap-3 mt-6">
                <Input
                    id="search"
                    label="Search for a book"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // updates query on every keystroke
                />
                <Button type="submit">Search</Button>
            </form>

            {/* State 1: search in progress */}
            {loading && <p className="mt-4 text-carbon">Searching...</p>}

            {/* State 2: technical error (network, backend) - different from "no results" */}
            {error && <p className="mt-4 text-red-600">{error}</p>}

            {/* State 3: search completed but no results.
                All 4 conditions together prevent this message from showing
                while loading, alongside an error, or before any search was made */}
            {!loading && !error && hasSearched && results.length === 0 && (
                <p className="mt-4 text-carbon">No books found.</p>
            )}

            {/* Results grid - if results is empty, this simply renders nothing,
                leaving room for the messages above */}
            <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {results.map((book) => (
                    // key={book.isbn}: React needs a unique identifier
                    // for each item in a list, to handle re-renders efficiently
                    <Link href={`/client/book/${book.id}`} key={book.isbn}>
                        <li className="flex flex-col gap-2">
                            {/* If cover is null (book has no cover), show a gray placeholder
                                instead of passing null to next/image, which would throw an error */}
                            {book.cover ? (
                                <Image
                                    src={book.cover}

                                    alt={book.title}
                                    width={128}
                                    height={192}
                                    className="rounded"
                                />
                            ) : (
                                <div className="h-48 w-32 rounded bg-carbon/10" />
                            )}
                            <p className="font-sans text-sm font-medium text-carbon">
                                {book.title}
                            </p>
                            {/* authors is an array of strings: .join(", ") turns it into
                                "Author1, Author2" instead of showing the raw array */}
                            <p className="font-sans text-xs text-carbon/70">
                                {book.authors.join(", ") || "Unknown author"}
                            </p>
                        </li>
                    </Link>
                ))}
            </ul>
        </main>
    );
}

