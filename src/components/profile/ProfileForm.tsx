"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";
import LogoutButton from "@/components/auth/LogoutButton";
import { updateProfileAction } from "@/actions/authAction";
import { UpdateProfileData } from "@/types/authTypes";

interface ProfileFormProps {
    initialData: UpdateProfileData; // the data the page has just read from the backend
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
    const router = useRouter();
    // one state object for the whole form: each key has the same name as its input id
    const [form, setForm] = useState<UpdateProfileData>(initialData);
    const [saving, setSaving] = useState(false);
    // outcome of the last save, shown under the fields: success or the message from the backend
    const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);

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

        const outcome = await updateProfileAction(form);

        if (outcome.success) {
            // realign the form with what the backend really saved (e.g. trimmed spaces)
            const client = outcome.profile.client;
            setForm({
                firstname: client?.firstname ?? form.firstname,
                lastname: client?.lastname ?? form.lastname,
                email: outcome.profile.email,
            });
            setResult({ success: true, message: "Profile updated" });
            router.refresh(); // the initial in the header comes from the server: read it again
        } else {
            setResult({ success: false, message: outcome.message });
        }
        setSaving(false);
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[13px]">
            <p className="mb-1.5 font-sans text-sm leading-[1.6] text-[#3f4744]">
                These are the details of your account.
            </p>

            <Input id="firstname" label="First name" value={form.firstname} onChange={handleChange} required />
            <Input id="lastname" label="Last name" value={form.lastname} onChange={handleChange} required />
            <Input id="email" label="Email" type="email" value={form.email} onChange={handleChange} required />

            {/* the live region is always in the page: screen readers announce the message when it appears */}
            <div aria-live="polite" className="empty:hidden">
                {result && (
                    <p className={`font-sans text-sm ${result.success ? "text-carbon" : "text-red-600"}`}>
                        {result.message}
                    </p>
                )}
            </div>

            {/* mobile: stacked, full width; desktop: in a row */}
            <div className="mt-1.5 flex flex-col gap-[11px] md:flex-row md:flex-wrap">
                <Button type="submit" disabled={saving} className="w-full md:w-auto">
                    {saving ? "Saving..." : "Save changes"}
                </Button>
                {/* not available yet: the backend cannot change the password */}
                <Button variant="secondary" disabled className="w-full md:w-auto">
                    Change password
                </Button>
                <LogoutButton className="w-full md:w-auto" />
            </div>
        </form>
    );
}