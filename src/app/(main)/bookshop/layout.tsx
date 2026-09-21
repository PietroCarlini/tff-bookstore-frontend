import Sidebar from "@/app/(main)/bookshop/Sidebar";

export default function BookshopLayout({ children }: { children: React.ReactNode }) {
    return (
        // column on mobile (bar on top, page below), row from md up (sidebar on the left)
        <div className="flex min-h-screen flex-col md:flex-row">
            <Sidebar />
            <div className="min-w-0 flex-1">{children}</div>
        </div>
    );
}