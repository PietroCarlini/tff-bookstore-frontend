"use client";

import { useState, useEffect, Fragment } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { getMyCatalogueAction } from "@/actions/catalogueAction";
import { BookStocked } from "@/types/bookshopTypes";

export default function CataloguePage() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<BookStocked[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //expanded row to view details (managed by ID):
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // shared fetch logic, used both on first load and on search submit
    async function fetchCatalogue(search?: string) {
        setLoading(true);
        setError(null);
        try {
            const data = await getMyCatalogueAction(search);
            setBooks(data);
        } catch (err) {
            setError('An error occurred while loading the catalogue');
        } finally {
            setLoading(false); //finally always run after either a try or a catch
        }
    }

    // on first render, load the full catalogue (no search filter)
    useEffect(() => {
        fetchCatalogue();
    }, [])

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        fetchCatalogue(query || undefined) //if search is clicked with no text (undefined), recharge all catalogue 
    }

    function toggleRow(id: number) {
        //if click on same row => id = null => closing row. Otherwise open another (new id)
        setExpandedId((current) => (current === id ? null : id))
    }

    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">Catalogue</h1>

            <form onSubmit={handleSearch} className="flex items-end gap-3 mt-6">
                <Input
                    id="search"
                    label="Search the catalogue"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button type="submit">Search</Button>
            </form>

            {loading && <p className="mt-4 text-carbon">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {!loading && !error && books.length === 0 && (
                <p className="mt-4 text-carbon">No books in catalogue.</p>
            )}

            {books.length > 0 && (
                <table className="mt-6 w-full text-left font-sans text-sm text-carbon">
                    <thead>
                        <tr className="border-b border-carbon/20">
                            <th className="py-2">ISBN</th>
                            <th className="py-2">Title</th>
                            <th className="py-2">Author</th>
                            <th className="py-2">Publisher</th>
                            <th className="py-2">Stock</th>
                            <th className="py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <Fragment key={book.id}>
                                <tr
                                    onClick={() => toggleRow(book.id)}
                                    className="cursor-pointer border-b border-carbon/10 hover:bg-carbon/5"
                                >
                                    <td className="py-2">{book.ISBN}</td>
                                    <td className="py-2">{book.title}</td>
                                    <td className="py-2">{book.author}</td>
                                    <td className="py-2">{book.publisher ?? "-"}</td>
                                    <td className="py-2">{book.stock}</td>
                                    <td className="py-2">{book.price}</td>
                                </tr>

                                {expandedId === book.id && (
                                    <tr className="border-b border-carbon/10 bg-carbon/5">
                                        <td colSpan={6} className="py-3">
                                            <div className="flex gap-6">
                                                {book.cover_url ? (
                                                    // eslint-disable-next-line @next/next/no-img-element
                                                    <img
                                                        src={book.cover_url}
                                                        alt={book.title}
                                                        className="h-32 w-20 rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="h-32 w-20 rounded bg-carbon/10" />
                                                )}
                                                <div>
                                                    <p><span className="font-medium">Genre:</span> {book.genere}</p>
                                                    <p><span className="font-medium">Tag:</span> {book.tag ?? "-"}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </Fragment>
                        ))}
                    </tbody>
                </table>
            )}
        </main>
    );
}