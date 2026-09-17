import { getProfileAction } from "@/actions/authAction";
import LogoutButton from "@/components/auth/LogoutButton";
import Button from "@/components/UI/Button";

//HOW INFOs ARE RETRIVED: //front //*back
// 1) ProfilePage (server component) calls await getProfileAction().
// 2) getProfileAction (in authAction.ts) reads the token cookie (the one set during login) and passes it to /getProfileRequest(token).
// 3) getProfileRequest (in authService.ts) makes a GET request to /auth/me on the backend, placing the token in the Authorization: Bearer ... header.
// 4) BACKEND: `authenticationMiddleware`  decodes that token and extracts only the `id` and `role`, storing them in `req.user`.
//* 5) `authController.me` takes `req.user.id` and calls `authService.getById(id)`, which performs an actual query on the database (`User.findByPk` with `include: [Client, Bookshop]`).
//* 6) The backend responds with the complete JSON (email, client, or bookshop populated) — this is the body of the HTTP response.
// getProfileRequest returns res.json() → this is where the received JSON becomes the JavaScript object that travels up the chain: from getProfileRequest to getProfileAction to ProfilePage, where it ends up in the profile variable.

export default async function ProfilePage() {
    const profile = await getProfileAction();
    const name = profile.client ? `${profile.client.firstname} ${profile.client.lastname}` : "";
    const initial = name.charAt(0).toUpperCase();

    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">Profile</h1>

            <div className="mt-6 flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-seaweed font-heading text-2xl text-carbon">
                    {initial}
                </div>
                <div>
                    <p className="font-sans text-base font-medium text-carbon">{name}</p>
                    <p className="font-sans text-sm text-carbon/70">{profile.email}</p>
                </div>
            </div>

            <div className="mt-8 flex flex-col gap-3">
                <Button variant="secondary" disabled>Edit details</Button>
                <Button variant="secondary" disabled>Change password</Button>
                <LogoutButton />
            </div>
        </main>
    );
}