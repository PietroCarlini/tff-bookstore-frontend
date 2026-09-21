import { getMyOrdersAction } from "@/actions/orderAction";
import OrderCard from "@/components/order/OrderCard";

export default async function OrdersPage() {
    const orders = await getMyOrdersAction();

    return (
        <main className="md:mx-auto md:max-w-[1040px] md:px-10 md:pb-12 md:pt-[34px]">
            {/* desktop only: on mobile the title is in the green header */}
            <h1 className="mb-[18px] hidden font-heading text-[26px] font-medium text-carbon md:block">
                Order history
            </h1>

            {orders.length === 0 && (
                <p className="px-[18px] py-4 font-sans text-sm text-carbon md:px-0">
                    No orders yet.
                </p>
            )}

            {orders.length > 0 && (
                // mobile: side margins of the mockup; desktop: one column, max 720px, aligned with the title
                <ul className="flex flex-col gap-3.5 px-[18px] pb-5 pt-1 md:max-w-[720px] md:p-0">
                    {orders.map((order) => (
                        <OrderCard key={order.id} order={order} />
                    ))}
                </ul>
            )}
        </main>
    );
}