"use client";

import { useState } from "react";
import BookshopInput from "@/components/UI/bookshopUI/BookshopInput";
import BookshopButton from "@/components/UI/bookshopUI/BookshopButton";
import { addBookToCatalogueAction, updateBookAction } from "@/actions/catalogueAction";
import { BookStocked, NewBookData } from "@/types/bookshopTypes";

//NB: InitialData is the value that drive the form

interface BookFormProps {
    initialData?: BookStocked; // present = Edit mode, absent = Add mode
    onSuccess: () => void;
}

//once the form is called if initialData is presents, data are loaded
export default function BookForm({ initialData, onSuccess }: BookFormProps) {
    const [ISBN, setISBN] = useState(initialData?.ISBN ?? "");
    const [title, setTitle] = useState(initialData?.title ?? "");
    const [author, setAuthor] = useState(initialData?.author ?? "");
    const [genere, setGenere] = useState(initialData?.genere ?? "");
    const [publisher, setPublisher] = useState(initialData?.publisher ?? "");
    const [tag, setTag] = useState(initialData?.tag ?? "");
    const [price, setPrice] = useState(initialData ? String(initialData.price) : "");
    const [stock, setStock] = useState(initialData ? String(initialData.stock) : "");
    const [cover_url, setCoverUrl] = useState(initialData?.cover_url ?? "");

    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        setError(null);

        const data: NewBookData = {
            ISBN,
            title,
            author,
            genere,
            price: Number(price),
            stock: Number(stock),
            publisher: publisher.trim() || undefined,
            tag: tag.trim() || undefined,
            cover_url: cover_url.trim() || undefined,
        };


        //here it's always initalData that (if present or not) decide which method to call
        const outcome = initialData
            ? await updateBookAction(initialData.id, data)
            : await addBookToCatalogueAction(data);

        if (outcome.success) {
            onSuccess();
        } else {
            setError(outcome.message);
        }
        setSubmitting(false);
    }

    return (
        <form onSubmit={handleSubmit}>
            {/* the id is used by the Modal as the accessible name of the window */}
            <h2 id="book-form-title" className="mb-[18px] font-heading text-xl font-semibold text-carbon">
                {initialData ? "Edit book" : "Add a new book"}
            </h2>

            {/* mobile: one column; from sm up: two columns */}
            <div className="grid grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
                <BookshopInput id="isbn" label="ISBN" value={ISBN} onChange={(e) => setISBN(e.target.value)} required />
                <BookshopInput id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                <BookshopInput id="author" label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
                <BookshopInput id="publisher" label="Publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                <BookshopInput id="genere" label="Genre" value={genere} onChange={(e) => setGenere(e.target.value)} required />
                <BookshopInput id="tag" label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
                <BookshopInput id="price" label="Price" type="number" step="0.01" min="0" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <BookshopInput id="stock" label="Stock" type="number" step="1" min="0" value={stock} onChange={(e) => setStock(e.target.value)} required />
                <BookshopInput id="cover_url" label="Cover URL" value={cover_url} onChange={(e) => setCoverUrl(e.target.value)} className="sm:col-span-2" />
            </div>

            {error && <p role="alert" className="mt-4 text-sm text-red-600">{error}</p>}

            <div className="mt-5 flex justify-end">
                <BookshopButton type="submit" disabled={submitting}>
                    {submitting ? "Saving…" : initialData ? "Save changes" : "Add book"}
                </BookshopButton>
            </div>
        </form>
    );
}