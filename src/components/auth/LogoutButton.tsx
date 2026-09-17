"use client";

import { logoutAction } from "@/actions/authAction";
import Button from "@/components/UI/Button";

export default function LogoutButton() {
    return (
        <Button variant="primary" onClick={() => logoutAction()}>
            Log out
        </Button>
    );
}