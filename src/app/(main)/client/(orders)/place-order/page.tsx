import { getBookshopsAction } from "@/actions/orderAction";
import OrderForm from "@/components/order/OrderForm";

// mobile: side margins of the mockup; desktop: centred container of 1040px
const pageStyles =
    "px-[18px] pb-[22px] pt-[18px] md:mx-auto md:max-w-[1040px] md:px-10 md:pb-12 md:pt-[34px]";

// desktop only: on mobile the title is in the green header
const titleStyles = "mb-[18px] hidden font-heading text-[26px] font-medium text-carbon md:block";

export default async function OrderPage({
    searchParams, //searching the query in URL
}: {
    searchParams: Promise<{ isbn?: string; title?: string; author?: string; cover?: string }>;
}) {
    const { isbn, title, author, cover } = await searchParams;

    // Defensive check: this page only makes sense coming from the "Order" button with book data attached
    if (!isbn || !title || !author) {
        return (
            <main className={pageStyles}>
                <h1 className={titleStyles}>Place an order</h1>
                <p className="font-sans text-sm text-carbon">No book selected.</p>
            </main>
        );
    }

    const bookshops = await getBookshopsAction();

    return (
        <main className={pageStyles}>
            <h1 className={titleStyles}>Place an order</h1>
            {/* on desktop the form is a column of 480px, aligned with the title */}
            <div className="md:max-w-[480px]">
                <OrderForm
                    book={{ isbn, title, author, cover: cover ?? null }}
                    bookshops={bookshops}
                />
            </div>
        </main>
    );
}