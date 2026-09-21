import { getProfileAction } from "@/actions/authAction";
import ProfileForm from "@/components/profile/ProfileForm";

//HOW INFOs ARE RETRIVED: //front //*back
// 1) ProfilePage (server component) calls await getProfileAction().
// 2) getProfileAction (in authAction.ts) reads the token cookie (the one set during login) and passes it to /getProfileRequest(token).
// 3) getProfileRequest (in authService.ts) makes a GET request to /auth/me on the backend, placing the token in the Authorization: Bearer ... header.
// 4) BACKEND: `authenticationMiddleware`  decodes that token and extracts only the `id` and `role`, storing them in `req.user`.
//* 5) `authController.me` takes `req.user.id` and calls `authService.getById(id)`, which performs an actual query on the database (`User.findByPk` with `include: [Client, Bookshop]`).
//* 6) The backend responds with the complete JSON (email, client, or bookshop populated) — this is the body of the HTTP response.
// getProfileRequest returns res.json() → this is where the received JSON becomes the JavaScript object that travels up the chain: from getProfileRequest to getProfileAction to ProfilePage, where it is passed to the form.

export default async function ProfilePage() {
    const profile = await getProfileAction();

    return (
        <main className="px-[18px] pb-[22px] pt-[18px] md:mx-auto md:max-w-[1040px] md:px-10 md:pb-12 md:pt-[34px]">
            {/* desktop only: on mobile the title is in the green header */}
            <h1 className="mb-3 hidden font-heading text-[26px] font-medium text-carbon md:block">
                Profile
            </h1>

            {/* on desktop the form is a column of 480px, aligned with the title */}
            <div className="md:max-w-[480px]">
                <ProfileForm
                    initialData={{
                        firstname: profile.client?.firstname ?? "",
                        lastname: profile.client?.lastname ?? "",
                        email: profile.email,
                    }}
                />
            </div>
        </main>
    );
}