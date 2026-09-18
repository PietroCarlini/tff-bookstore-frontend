"use client";

import { useState } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <h2 className="font-heading text-xl font-semibold text-carbon">
                {initialData ? "Edit book" : "Add a new book"}
            </h2>

            <Input id="isbn" label="ISBN" value={ISBN} onChange={(e) => setISBN(e.target.value)} required />
            <Input id="title" label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
            <Input id="author" label="Author" value={author} onChange={(e) => setAuthor(e.target.value)} required />
            <Input id="genere" label="Genre" value={genere} onChange={(e) => setGenere(e.target.value)} required />
            <Input id="publisher" label="Publisher" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
            <Input id="tag" label="Tag" value={tag} onChange={(e) => setTag(e.target.value)} />
            <Input id="price" label="Price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
            <Input id="stock" label="Stock" type="number" value={stock} onChange={(e) => setStock(e.target.value)} required />
            <Input id="cover_url" label="Cover URL" value={cover_url} onChange={(e) => setCoverUrl(e.target.value)} />

            {error && <p className="text-sm text-red-600">{error}</p>}

            <Button type="submit" disabled={submitting}>
                {submitting ? "Saving…" : initialData ? "Save changes" : "Add book"}
            </Button>
        </form>
    );
}