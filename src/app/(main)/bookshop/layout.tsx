import Sidebar from "@/app/(main)/bookshop/Sidebar";

export default function BookshopLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1">{children}</div>
        </div>
    );
}