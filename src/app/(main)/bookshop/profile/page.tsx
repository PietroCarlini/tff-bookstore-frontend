"use client";

import { useState, useEffect } from "react";
import { getMyBookshopAction, updateMyBookshopAction } from "@/actions/bookshopAction";
import { Bookshop } from "@/types/bookshopTypes";
import BookshopInput from "@/components/UI/bookshopUI/BookshopInput";
import BookshopButton from "@/components/UI/bookshopUI/BookshopButton";

// converts a Bookshop into the shape of the form (null opening hours => empty string, an input can't hold null)
function toForm(bookshop: Bookshop) {
    return {
        name: bookshop.name,
        city: bookshop.city,
        address: bookshop.address,
        email: bookshop.email,
        phone: bookshop.phone,
        openingHours: bookshop.openingHours ?? "",
    };
}

export default function BookshopProfilePage() {
    // one state object for the whole form: each key has the same name as its input id
    const [form, setForm] = useState({
        name: "",
        city: "",
        address: "",
        email: "",
        phone: "",
        openingHours: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    // outcome of the last save, shown under the form: success or the message from the backend
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

    // load the bookshop data on first render and use it to prefill the form
    useEffect(() => {
        async function loadProfile() {
            try {
                const bookshop = await getMyBookshopAction();
                setForm(toForm(bookshop));
            } catch {
                setError("An error occurred while loading the profile");
            } finally {
                setLoading(false);
            }
        }
        loadProfile();
    }, []);

    // one handler for all the inputs: e.target.name is the input id,
    // so [e.target.name] updates only that key and the spread keeps the others
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setResult(null); // the previous outcome is no longer true once the user edits again
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setResult(null);

        const outcome = await updateMyBookshopAction(form);

        if (outcome.success) {
            // realign the form with what the backend really saved (e.g. trimmed spaces)
            setForm(toForm(outcome.bookshop));
            setResult({ success: true, message: "Profile updated" });
        } else {
            setResult({ success: false, message: outcome.message });
        }
        setSaving(false);
    }

    return (
        <main className="px-[18px] pb-8 pt-7 md:px-7">
            <h1 className="mb-2 font-heading text-2xl font-semibold text-carbon">Profile</h1>
            <p className="mb-5 font-sans text-sm leading-normal text-[#3f4744]">
                This is the information clients see when they choose your bookshop for an order.
            </p>

            {loading && <p className="mt-4 text-carbon">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}

            {!loading && !error && (
                <form onSubmit={handleSubmit}>
                    {/* mobile: one column; from sm up: two columns (Address and Opening hours take the full row) */}
                    <div className="grid max-w-[560px] grid-cols-1 gap-x-4 gap-y-3.5 sm:grid-cols-2">
                        <BookshopInput id="name" label="Name" value={form.name} onChange={handleChange} required />
                        <BookshopInput id="city" label="City" value={form.city} onChange={handleChange} required />
                        <BookshopInput id="address" label="Address" value={form.address} onChange={handleChange} required className="sm:col-span-2" />
                        <BookshopInput id="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
                        <BookshopInput id="phone" label="Phone" type="tel" value={form.phone} onChange={handleChange} required />
                        <BookshopInput id="openingHours" label="Opening hours" value={form.openingHours} onChange={handleChange} className="sm:col-span-2" />
                    </div>

                    {/* the live region is always in the page: screen readers announce the message when it appears */}
                    <div aria-live="polite" className="empty:hidden">
                        {result && (
                            <p className={`mt-4 font-sans text-sm ${result.success ? "text-carbon" : "text-red-600"}`}>
                                {result.message}
                            </p>
                        )}
                    </div>

                    <div className="mt-[18px]">
                        <BookshopButton type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save changes"}
                        </BookshopButton>
                    </div>
                </form>
            )}
        </main>
    );
}