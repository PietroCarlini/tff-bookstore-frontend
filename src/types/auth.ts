
// Login form data types
export interface LoginCredentials {
    email: string;
    password: string;
}

// Registration form data types
export interface RegisterData {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
}

// Resposnse structure from Backend (login/register)
export interface AuthUser {
    id: number;
    firstname: string;
    role: "User" | "Admin";
}

// Complete response from POST /auth/login and POST /auth/register
export interface AuthResponse {
    token: string;
    user: AuthUser;
}