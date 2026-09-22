import { redirect } from "next/navigation";
import { getProfileAction } from "@/actions/authAction";
import Sidebar from "@/app/(main)/bookshop/Sidebar";

export default async function BookshopLayout({ children }: { children: React.ReactNode }) {
    const profile = await getProfileAction().catch(() => null);

    // not logged in, or logged in as a client: this area is for bookshops only
    if (!profile?.bookshop) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar />
            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
}