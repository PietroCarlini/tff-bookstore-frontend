import { getMyOrdersAction } from "@/actions/orderAction";
import OrderCard from "@/components/order/OrderCard";

export default async function OrdersPage() {
    const orders = await getMyOrdersAction();

    return (
        <main className="p-6">
            <h1 className="font-heading text-2xl font-semibold text-carbon">Order history</h1>

            {orders.length === 0 && (
                <p className="mt-4 text-carbon">No orders yet.</p>
            )}

            <ul className="mt-6 flex flex-col gap-4">
                {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))}
            </ul>
        </main>
    );
}