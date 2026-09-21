"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Input from "../UI/Input"
import Button from "../UI/Button";
import { loginAction } from "../../actions/authAction";

export default function LoginForm() {
    const router = useRouter(); // hook NextJs (browsing 'pages')
    const [email, setEmail] = useState(""); //hook React: rendering at component changes [compValue, FuntionToUpdate]
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    //* React.FormEvent<HTMLFormElement>: TS type of the event coming from a FORM element
    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //cleaning previous error
        setError("");
        //showing 'loading' while waiting for response
        setIsLoading(true);

        //we set in result the values from loginAction[authAction] sending an obj {email, password} corresponding to what set [in authTypes/loginCredentials]
        // await response from server
        const result = await loginAction({ email, password });
        //when res arrive, setIsLoading off
        setIsLoading(false);

        if (!result.success) {
            setError(result.message ?? "Login failed");
            //if login failed -> error message and return skipping router.push
            return;
        }
        //redirecting to catalouge logged in, based on user type
        if (result.user.type === "bookshop") {
            router.push("/bookshop/catalogue");
        } else {
            router.push("/client");
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-[13px]">
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
            <Link href="/forgot-password" className="self-end text-[13.5px] text-stormy-teal underline">
                Forgot your password?
            </Link>
            {/* role="alert": screen readers read the error as soon as it appears */}
            {error && <p role="alert" className="text-sm text-red-600">{error}</p>}
            <Button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log in"}
            </Button>

            <p className="mt-1 text-center text-[13.5px] text-carbon">
                Don&apos;t have an account?{" "}
                <Link href="/register" className="text-stormy-teal underline">
                    Sign up
                </Link>
            </p>
        </form>
    );
}