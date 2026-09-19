"use client";

import { useState, useEffect } from "react";
import { getMyBookshopAction, updateMyBookshopAction } from "@/actions/bookshopAction";
import { Bookshop } from "@/types/bookshopTypes";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

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
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">Profile</h1>
            <p className="mt-2 font-sans text-sm text-carbon/70">
                This is the information clients see when they choose your bookshop for an order.
            </p>

            {loading && <p className="mt-4 text-carbon">Loading...</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}

            {!loading && !error && (
                <form onSubmit={handleSubmit} className="mt-6 flex max-w-md flex-col gap-4">
                    <Input id="name" label="Name" value={form.name} onChange={handleChange} required />
                    <Input id="city" label="City" value={form.city} onChange={handleChange} required />
                    <Input id="address" label="Address" value={form.address} onChange={handleChange} required />
                    <Input id="email" label="Email" type="email" value={form.email} onChange={handleChange} required />
                    <Input id="phone" label="Phone" type="tel" value={form.phone} onChange={handleChange} required />
                    <Input id="openingHours" label="Opening hours" value={form.openingHours} onChange={handleChange} />

                    {/* the live region is always in the page: screen readers announce the message when it appears */}
                    <div aria-live="polite">
                        {result && (
                            <p className={`font-sans text-sm ${result.success ? "text-carbon" : "text-red-600"}`}>
                                {result.message}
                            </p>
                        )}
                    </div>

                    <div>
                        <Button type="submit" disabled={saving}>
                            {saving ? "Saving..." : "Save changes"}
                        </Button>
                    </div>
                </form>
            )}
        </main>
    );
}