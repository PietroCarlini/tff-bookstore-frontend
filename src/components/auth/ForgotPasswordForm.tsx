"use client";

import { useState } from "react";
import Link from "next/link";
import Input from "../UI/Input";
import Button from "../UI/Button";

// stub: the form is only visual, password recovery is not available yet (no backend call)
export default function ForgotPasswordForm() {
    const [email, setEmail] = useState("");

    return (
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <p className="text-sm text-carbon">
                Enter the email of your account to receive a link to reset your password.
            </p>
            <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-carbon/70">This feature is coming soon.</p>
            <Button type="submit" disabled>Send reset link</Button>

            <p className="text-sm text-carbon text-center">
                <Link href="/login" className="text-stormy-teal underline">
                    Back to log in
                </Link>
            </p>
        </form>
    );
}