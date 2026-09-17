import { getBookshopsAction } from "@/actions/orderAction";
import OrderForm from "@/components/order/OrderForm";

export default async function OrderPage({
    searchParams, //searching the query in URL
}: {
    searchParams: Promise<{ isbn?: string; title?: string; author?: string; cover?: string }>;
}) {
    const { isbn, title, author, cover } = await searchParams;

    // Defensive check: this page only makes sense coming from the "Order" button with book data attached
    if (!isbn || !title || !author) {
        return <main className="p-6"><p className="text-carbon">No book selected.</p></main>;
    }

    const bookshops = await getBookshopsAction();

    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">Place an order</h1>
            <OrderForm
                book={{ isbn, title, author, cover: cover ?? null }}
                bookshops={bookshops}
            />
        </main>
    );
}