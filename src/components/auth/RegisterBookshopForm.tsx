"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "../UI/Input"
import Button from "../UI/Button";
import { registerBookshopAction } from "../../actions/authAction";

export default function RegisterBookshopForm() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('The password does not match')
            return
        }

        setIsLoading(true);

        const result = await registerBookshopAction({ name, city, address, email, phone, password, confirmPassword });
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
                id="name"
                label="Bookshop name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <Input
                id="city"
                label="City"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
            />
            <Input
                id="address"
                label="Address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
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
                id="phone"
                label="Phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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