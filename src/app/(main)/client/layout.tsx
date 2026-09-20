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
            <Header initial={initial} />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}