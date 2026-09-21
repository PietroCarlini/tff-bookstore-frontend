"use client";

import { useState, useEffect, Fragment } from "react";
import BookshopInput from "@/components/UI/bookshopUI/BookshopInput";
import BookshopButton from "@/components/UI/bookshopUI/BookshopButton";
import { deleteBookAction, getMyCatalogueAction } from "@/actions/catalogueAction";
import { BookStocked } from "@/types/bookshopTypes";
import Modal from "@/components/UI/Modal";
import BookForm from "@/components/catalogue/BookForm";

// shared column layout for header + rows, so labels and values always line up (proportions from the mockup)
const columns =
    "grid grid-cols-[1.15fr_1.5fr_1.15fr_1.15fr_0.85fr_0.65fr_0.55fr_0.65fr] items-center gap-2 " +
    "font-sans text-[12.5px] leading-[1.35] text-carbon";

// min-w-0 + break-words: a long title goes on a new line instead of leaving its column
const cell = "min-w-0 break-words";

export default function CataloguePage() {
    const [query, setQuery] = useState('');
    const [books, setBooks] = useState<BookStocked[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalMode, setModalMode] = useState<"add" | "edit" | null>(null); // null = modal closedf, "add" = modal open in add stance
    const [bookToEdit, setBookToEdit] = useState<BookStocked | null>(null);
    const [sortBy, setSortBy] = useState<string | null>(null);
    const [sortDir, setSortDir] = useState<"ASC" | "DESC">("ASC");

    //expanded row to view details (managed by ID):
    const [expandedId, setExpandedId] = useState<number | null>(null);

    // shared fetch logic, used both on first load and on search submit
    async function fetchCatalogue(search?: string) {
        setLoading(true);
        setError(null);
        try {
            const data = await getMyCatalogueAction(search, sortBy ?? undefined, sortDir);
            setBooks(data);
        } catch {
            setError('An error occurred while loading the catalogue');
        } finally {
            setLoading(false); //finally always run after either a try or a catch
        }
    }

    // on first render, load the full catalogue (no search filter)
    // re-run whenever sortBy/sortDir change (also covers first render, since they start with a value)
    useEffect(() => {
        fetchCatalogue(query || undefined);
    }, [sortBy, sortDir])

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        fetchCatalogue(query || undefined) //if search is clicked with no text (undefined), recharge all catalogue 
    }

    function handleSort(field: string) {
        if (sortBy === field) {
            // same column clicked again → invert direction
            setSortDir((current) => (current === "ASC" ? "DESC" : "ASC"));
        } else {
            // different column → switch to it, default ASC
            setSortBy(field);
            setSortDir("ASC");
        }
    }

    function toggleRow(id: number) {
        //if click on same row => id = null => closing row. Otherwise open another (new id)
        setExpandedId((current) => (current === id ? null : id))
    }

    // sortable column title: a button with the arrow on the sorted column (the arrow turns for DESC)
    const sortButton = (field: string, label: string) => (
        <button
            type="button"
            onClick={() => handleSort(field)}
            className={
                "inline-flex items-center gap-1 rounded hover:underline " +
                "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
            }
        >
            {label}
            {sortBy === field && (
                <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className={sortDir === "DESC" ? "rotate-180" : ""}
                >
                    <path d="M12 19V5M6 11l6-6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )}
        </button>
    );

    // tells screen readers which column is sorted and in which direction
    const ariaSort = (field: string) =>
        sortBy === field ? (sortDir === "ASC" ? "ascending" : "descending") : undefined;

    return (
        <main className="px-[18px] pb-8 pt-7 md:px-7">
            <h1 className="mb-[18px] font-heading text-2xl font-semibold text-carbon">Catalogue</h1>

            <form onSubmit={handleSearch} className="mb-5 flex flex-wrap items-end gap-3">
                <BookshopInput
                    id="search"
                    label="Search the catalogue"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="min-w-0 flex-1 md:w-[260px] md:flex-none"
                />
                <BookshopButton type="submit">Search</BookshopButton>
                {/* mobile: on its own row; desktop: pushed to the right of the search */}
                <BookshopButton onClick={() => setModalMode("add")} className="w-full md:ml-auto md:w-auto">
                    Add book
                </BookshopButton>
            </form>

            {loading && <p className="mt-4 text-carbon">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
            {!loading && !error && books.length === 0 && (
                <p className="mt-4 text-carbon">No books in catalogue.</p>
            )}

            {books.length > 0 && (
                // on a narrow screen the table keeps its width and scrolls sideways inside this box
                // tabIndex={0}: so who uses the keyboard can scroll the box too
                <div
                    role="region"
                    aria-label="Catalogue table"
                    tabIndex={0}
                    className="overflow-x-auto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                >
                    <div role="table" aria-label="Catalogue" className="min-w-[960px]">
                        {/* header row */}
                        <div role="row" className={`${columns} border-b border-carbon/20 py-2 font-semibold`}>
                            <span role="columnheader" className={cell}>ISBN</span>
                            <span role="columnheader" aria-sort={ariaSort("title")} className={cell}>
                                {sortButton("title", "Title")}
                            </span>
                            <span role="columnheader" aria-sort={ariaSort("author")} className={cell}>
                                {sortButton("author", "Author")}
                            </span>
                            <span role="columnheader" aria-sort={ariaSort("publisher")} className={cell}>
                                {sortButton("publisher", "Publisher")}
                            </span>
                            <span role="columnheader" className={cell}>Genre</span>
                            <span role="columnheader" className={cell}>Price</span>
                            <span role="columnheader" className={cell}>Stock</span>
                            <span role="columnheader" className={cell}>In order</span>
                        </div>

                        <ul>
                            {books.map((book) => (
                                <Fragment key={book.id}>
                                    <li
                                        role="row"
                                        tabIndex={0}
                                        aria-expanded={expandedId === book.id}
                                        onClick={() => toggleRow(book.id)}
                                        // Enter or Space open the row like a click (keyboard users)
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter" || e.key === " ") {
                                                e.preventDefault();
                                                toggleRow(book.id);
                                            }
                                        }}
                                        className={
                                            `${columns} cursor-pointer border-b border-carbon/10 py-2.5 hover:bg-carbon/[0.04] ` +
                                            "focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stormy-teal " +
                                            (expandedId === book.id ? "bg-carbon/[0.04]" : "")
                                        }
                                    >
                                        <span role="cell" className={cell}>{book.ISBN}</span>
                                        <span role="cell" className={cell}>{book.title}</span>
                                        <span role="cell" className={cell}>{book.author}</span>
                                        <span role="cell" className={cell}>{book.publisher ?? "-"}</span>
                                        <span role="cell" className={cell}>{book.genere}</span>
                                        {/* Number(): the API may send a DECIMAL as text */}
                                        <span role="cell" className={cell}>€{Number(book.price).toFixed(2)}</span>
                                        <span role="cell" className={cell}>{book.stock}</span>
                                        <span role="cell" className={cell}>{book.inOrder}</span>
                                    </li>

                                    {/*DETAILS ROW */}
                                    {expandedId === book.id && (
                                        <li role="row" className="flex gap-5 border-b border-carbon/10 bg-carbon/5 px-3 py-3.5">
                                            {book.cover_url ? (
                                                // the cover URL is typed by the bookshop (any site): a plain img, not next/image
                                                // alt="": the title is written in the row above
                                                // eslint-disable-next-line @next/next/no-img-element
                                                <img
                                                    src={book.cover_url}
                                                    alt=""
                                                    className="h-24 w-16 shrink-0 rounded-md object-cover"
                                                />
                                            ) : (
                                                <div className="h-24 w-16 shrink-0 rounded-md bg-seaweed" />
                                            )}
                                            <div className="flex flex-col gap-2.5 font-sans text-[13px] leading-normal text-carbon">
                                                <p><span className="font-semibold">Tag:</span> {book.tag ?? "-"}</p>

                                                <div className="flex gap-2.5">
                                                    <BookshopButton
                                                        variant="secondary"
                                                        onClick={() => {
                                                            setBookToEdit(book);
                                                            setModalMode("edit");
                                                        }}
                                                    >
                                                        Edit
                                                    </BookshopButton>

                                                    <BookshopButton
                                                        variant="secondary"
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
                                                    </BookshopButton>
                                                </div>
                                            </div>
                                        </li>
                                    )}
                                </Fragment>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            {modalMode === "add" && (
                <Modal titleId="book-form-title" onClose={() => setModalMode(null)}>
                    <BookForm
                        onSuccess={() => {
                            setModalMode(null); //close modal component
                            fetchCatalogue(); //re-fetch entire catalogue updated
                        }}
                    />
                </Modal>
            )}
            {modalMode === "edit" && bookToEdit && (
                <Modal titleId="book-form-title" onClose={() => { setModalMode(null); setBookToEdit(null); }}>
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