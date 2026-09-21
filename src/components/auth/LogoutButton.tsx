"use client";

import { logoutAction } from "@/actions/authAction";
import Button from "@/components/UI/Button";

interface LogoutButtonProps {
    className?: string; // width chosen by who uses the button
}

export default function LogoutButton({ className = "" }: LogoutButtonProps) {
    return (
        <Button variant="secondary" onClick={() => logoutAction()} className={className}>
            Log out
        </Button>
    );
}