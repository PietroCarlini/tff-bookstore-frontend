"use client";

import { useState, useEffect, Fragment } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import { deleteBookAction, getMyCatalogueAction } from "@/actions/catalogueAction";
import { BookStocked } from "@/types/bookshopTypes";
import Modal from "@/components/UI/Modal";
import BookForm from "@/components/catalogue/BookForm";

export default function CataloguePage() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<BookStocked[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null); // null = modal closedf, "add" = modal open in add stance
    const [bookToEdit, setBookToEdit] = useState<BookStocked | null>(null);

    //expanded row to view details (managed by ID):
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // shared fetch logic, used both on first load and on search submit
    async function fetchCatalogue(search?: string) {
        setLoading(true);
        setError(null);
        try {
            const data = await getMyCatalogueAction(search);
            console.log("data ricevuta:", data);
            setBooks(data);
        } catch (err) {
            console.log("errore catturato:", err);
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

    // shared column Tailwinds layout for header + rows, so labels and values always line up
    const columns = "grid grid-cols-6 gap-2";

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

            <Button onClick={() => setModalMode("add")}>Add book</Button>

            {loading && <p className="mt-4 text-carbon">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {!loading && !error && books.length === 0 && (
                <p className="mt-4 text-carbon">No books in catalogue.</p>
            )}

            {books.length > 0 && (
                <div role="table" aria-label="Catalogue" className="mt-6 font-sans text-sm text-carbon">
                    {/* header row */}
                    <div role="row" className={`${columns} border-b border-carbon/20 py-2 font-medium`}>
                        <span role="columnheader">ISBN</span>
                        <span role="columnheader">Title</span>
                        <span role="columnheader">Author</span>
                        <span role="columnheader">Publisher</span>
                        <span role="columnheader">Stock</span>
                        <span role="columnheader">Price</span>
                    </div>

                    <ul>
                        {books.map((book) => (
                            <Fragment key={book.id}>
                                <li
                                    role="row"
                                    onClick={() => toggleRow(book.id)}
                                    className={`${columns} cursor-pointer border-b border-carbon/10 py-2 hover:bg-carbon/5`}
                                >
                                    <span role="cell">{book.ISBN}</span>
                                    <span role="cell">{book.title}</span>
                                    <span role="cell">{book.author}</span>
                                    <span role="cell">{book.publisher ?? "-"}</span>
                                    <span role="cell">{book.stock}</span>
                                    <span role="cell">{book.price}</span>
                                </li>

                                {/*DETAILS ROW */}
                                {expandedId === book.id && (
                                    <li role="row" className="border-b border-carbon/10 bg-carbon/5 py-3">
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

                                                <Button
                                                    onClick={() => {
                                                        setBookToEdit(book);
                                                        setModalMode("edit");
                                                    }}
                                                >
                                                    Edit
                                                </Button>

                                                <Button
                                                    onClick={async () => {
                                                        const confirmed = window.confirm(`Delete "${book.title}"?`);
                                                        if (!confirmed) return;

                                                        const outcome = await deleteBookAction(book.id);
                                                        if (outcome.success) {
                                                            fetchCatalogue();
                                                        } else {
                                                            setError(outcome.message);
                                                        }
                                                    }}
                                                >
                                                    Delete
                                                </Button>

                                            </div>
                                        </div>
                                    </li>
                                )}
                            </Fragment>
                        ))}
                    </ul>
                </div>
            )}

            {modalMode === "add" && (
                <Modal onClose={() => setModalMode(null)}>
                    <BookForm
                        onSuccess={() => {
                            setModalMode(null); //close modal component
                            fetchCatalogue(); //re-fetch entire catalogue updated
                        }}
                    />
                </Modal>
            )}
            {modalMode === "edit" && bookToEdit && (
                <Modal onClose={() => { setModalMode(null); setBookToEdit(null); }}>
                    <BookForm
                        initialData={bookToEdit}
                        onSuccess={() => {
                            setModalMode(null);
                            setBookToEdit(null);
                            fetchCatalogue();
                        }}
                    />
                </Modal>
            )}

        </main>
    );
}