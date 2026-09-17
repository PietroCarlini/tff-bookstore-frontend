import Image from "next/image";
import { getMyOrdersAction } from "@/actions/orderAction";
import OrderStatusBadge from "@/components/order/OrderStatusBadge";

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
                    <li key={order.id} className="rounded border border-carbon/10 bg-alabaster p-4">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <p className="font-sans text-sm font-medium text-carbon">{order.bookshop.name}</p>
                                <p className="font-sans text-xs text-carbon/70">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                            </div>
                            <OrderStatusBadge status={order.state} />
                        </div>

                        <ul className="mt-3 flex flex-col gap-3">
                            {order.orderItems.map((item) => (
                                <li key={item.id} className="flex gap-3">
                                    {item.cover_url ? (
                                        <Image src={item.cover_url} alt={item.title} width={48} height={72} className="rounded" />
                                    ) : (
                                        <div className="h-[72px] w-12 rounded bg-carbon/10" />
                                    )}
                                    <div>
                                        <p className="font-sans text-sm text-carbon">{item.title}</p>
                                        <p className="font-sans text-xs text-carbon/70">{item.author}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {order.message && (
                            <p className="mt-3 font-sans text-xs italic text-carbon/70">“{order.message}”</p>
                        )}
                    </li>
                ))}
            </ul>
        </main>
    );
}