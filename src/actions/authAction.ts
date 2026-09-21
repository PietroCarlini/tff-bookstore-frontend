"use server";

import { cookies } from 'next/headers';
import { loginRequest, registerRequest, registerBookshopRequest, getProfileRequest, updateProfileRequest } from '@/services/authService';
import { LoginCredentials, RegisterData, RegisterBookshopData, AuthUser, UserProfile, UpdateProfileData } from '@/types/authTypes';
import { redirect } from "next/navigation";


//* Explicit discriminated union: keeps success as literal true/false (not widened to boolean) so TS can narrow user vs message
type AuthActionResult =
    | { success: true; user: AuthUser }
    | { success: false; message: string };


//* Explicit return type needed for narrowing to work where this action is called (see above AuthActionResult)
export async function loginAction(credentials: LoginCredentials): Promise<AuthActionResult> {
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

export async function registerAction(data: RegisterData): Promise<AuthActionResult> {
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
};

export async function registerBookshopAction(data: RegisterBookshopData): Promise<AuthActionResult> {
    try {
        const { token, user } = await registerBookshopRequest(data)

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
};

export async function getProfileAction(): Promise<UserProfile> {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    if(!token) {
        throw new Error('Not authenticated');
    }
    return getProfileRequest(token)
}

export async function logoutAction():Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete('token');
    redirect('/login')
}

// if true => the updated profile / if false => the message from the backend
type UpdateProfileResult = { success: true; profile: UserProfile } | { success: false; message: string };

export async function updateProfileAction(data: UpdateProfileData): Promise<UpdateProfileResult> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        if (!token) {
            throw new Error('Not authenticated');
        }
        const profile = await updateProfileRequest(data, token);
        return { success: true, profile };
    }
    catch (error) {
        return {
            success: false,
            message: error instanceof Error ? error.message : 'Failed to update profile',
        };
    }
}