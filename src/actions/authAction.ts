"use server";

import { cookies } from 'next/headers';
import { loginRequest, registerRequest } from '@/services/authService';
import { LoginCredentials, RegisterData } from '@/types/authTypes';

export async function loginAction(credentials: LoginCredentials) {
    try {
        const { token, user } = await loginRequest(credentials);

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true, // = Don't expose this cookie to `document.cookie` or any JavaScript script.” Only the server can read it
            secure: process.env.NODE_ENV === 'production', //secure not active in localhost ('dev') but online ('production')
            sameSite: 'lax', //deafault: block silent cross-site requests triggered by other domains
            maxAge: 60 * 60 * 24 * 3, //3days
            path: '/' // Cookie validity scope: it says 'this cookie is valid for all pages on the site'
        })

        return { success: true, user };
    }
    catch (error) {
        //managing error thrown from AuthService:
        return {
            success: false,
            // if an Error is really an error (instanceof) show error.message, otherwise show general message
            message: error instanceof Error ? error.message : "Login failed",
        };
    }
};

export async function registerAction(data: RegisterData) {
    try {
        const { token, user } = await registerRequest(data)

        const cookieStore = await cookies();
        cookieStore.set('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 3,
            path: "/",
        })

        return { success: true, user }
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : "Registration failed",
        };
    }
}