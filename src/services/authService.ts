import { LoginCredentials, RegisterData, AuthResponse } from "@/types/authTypes";

const API_URL = process.env.API_URL; 

//* AuthResponse: manages the datas 'expected shape' / loginRequest return a Promise: TS expects the resolved value will confrm to that 'shape'
// TS checks (at compile/write time, not runtime) that what is coded is conformed to what is declare here

export async function loginRequest(
    credentials: LoginCredentials
): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });

    //* An error is thrown here but is managed where this function (loginRequest) is called (ServAction); the error is managed there in the catch section
    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Login failed");
    }
    return res.json();
}

export async function registerRequest(
    data: RegisterData
): Promise<AuthResponse> {
    const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration failed");
    }

    return res.json();
}