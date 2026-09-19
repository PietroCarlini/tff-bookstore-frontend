"use client";

import { useState, useEffect } from "react";
import { getMyBookshopAction } from "@/actions/bookshopAction";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

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

    // load the bookshop data on first render and use it to prefill the form
    useEffect(() => {
        async function loadProfile() {
            try {
                const bookshop = await getMyBookshopAction();
                setForm({
                    name: bookshop.name,
                    city: bookshop.city,
                    address: bookshop.address,
                    email: bookshop.email,
                    phone: bookshop.phone,
                    openingHours: bookshop.openingHours ?? "", // null in the DB => empty string for the input
                });
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
                // stub: no real saving, so the submit is always blocked
                <form onSubmit={(e) => e.preventDefault()} className="mt-6 flex max-w-md flex-col gap-4">
                    <Input id="name" label="Name" value={form.name} onChange={handleChange} />
                    <Input id="city" label="City" value={form.city} onChange={handleChange} />
                    <Input id="address" label="Address" value={form.address} onChange={handleChange} />
                    <Input id="email" label="Email" type="email" value={form.email} onChange={handleChange} />
                    <Input id="phone" label="Phone" type="tel" value={form.phone} onChange={handleChange} />
                    <Input id="openingHours" label="Opening hours" value={form.openingHours} onChange={handleChange} />

                    <p className="font-sans text-sm text-carbon/70">Saving changes is not available yet.</p>
                    <div>
                        <Button type="submit" disabled>Save changes</Button>
                    </div>
                </form>
            )}
        </main>
    );
}