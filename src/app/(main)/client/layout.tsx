import { Suspense } from "react";
import { redirect } from "next/navigation";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import { getProfileAction } from "@/actions/authAction";

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfileAction().catch(() => null);

    // not logged in, or logged in as a bookshop: this area is for clients only
    if (!profile?.client) {
        redirect("/login");
    }

    const initial = (profile.client.firstname ?? profile.email).charAt(0).toUpperCase();

    return (
        <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-[76px] bg-stormy-teal md:h-[74px]" />}>
                <Header initial={initial} />
            </Suspense>
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}