"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "../UI/Input"
import Button from "../UI/Button";
import { registerAction } from "../../actions/authAction";

export default function RegistrationForm() {
    const router = useRouter(); // hook NextJs (browsing 'pages')
    const [firstname, setFirstname] = useState(""); //hook React: rendering at component changes [compValue, FuntionToUpdate]
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //cleaning previous error
        setError('');
        //showing 'loading' while waiting for response

        if (password !== confirmPassword) {
            setError('The password does not match')
            return
        }

        setIsLoading(true);

        const result = await registerAction({ firstname, lastname, email, password, confirmPassword });
        setIsLoading(false);

        if (!result.success) {
            setError(result.message ?? 'registration failed');
            return
        }
        router.push("/login")
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[13px]">
            <Input
                id="firstname"
                label="First name"
                type="text"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
            />
            <Input
                id="lastname"
                label="Last name"
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
            />
            <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <Input
                id="password"
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <Input
                id="confirmPassword"
                label="Confirm password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
            />
            {/* role="alert": screen readers read the error as soon as it appears */}
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Signing up..." : "Sign up"}
            </Button>

            <p className="mt-1 text-center text-[13.5px] text-carbon">
                Already have an account?{" "}
                <Link href="/login" className="text-stormy-teal underline">
                    Log in
                </Link>
            </p>
        </form>
    )
}