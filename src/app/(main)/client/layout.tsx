import { Suspense } from "react";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import { getProfileAction } from "@/actions/authAction";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
    // first letter of the logged user for the avatar: if the profile can't be loaded (e.g. not logged in) we show "?" instead of breaking every page
    let initial = "?";
    try {
        const profile = await getProfileAction();
        initial = (profile.client?.firstname ?? profile.email).charAt(0).toUpperCase();
    } catch {
        // keep the fallback
    }

    return (
        <div className="flex min-h-screen flex-col">
            {/* Suspense: the Header reads the URL (useSearchParams), and Next needs a boundary for the production build.
                The fallback is an empty green bar of the same height, so nothing jumps */}
            <Suspense fallback={<div className="h-[76px] bg-stormy-teal md:h-[74px]" />}>
                <Header initial={initial} />
            </Suspense>
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}