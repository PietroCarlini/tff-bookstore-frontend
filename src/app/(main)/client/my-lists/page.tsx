import Link from "next/link";

export default function MyListsPage() {
    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">My Lists</h1>

            <div className="mt-6 flex gap-4">
                <Link
                    href="/client/my-lists/to-read"
                    className="flex-1 rounded bg-seaweed px-4 py-6 text-center font-sans font-medium text-carbon hover:bg-seaweed/90"
                >
                    To Read
                </Link>
                <Link
                    href="/client/my-lists/read"
                    className="flex-1 rounded bg-seaweed px-4 py-6 text-center font-sans font-medium text-carbon hover:bg-seaweed/90"
                >
                    Read
                </Link>
            </div>
        </main>
    );
}