import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">{children}</div>
            <Footer />
        </div>
    );
}