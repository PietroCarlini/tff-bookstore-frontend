import { OrderStatus } from "@/types/orderTypes";

interface StatusConfig {
    label: string;
    className: string;
    icon: React.ReactNode;
}

const statusConfig: Record<OrderStatus, StatusConfig> = {
    Sent: {
        label: "Sent",
        className: "bg-alabaster text-carbon",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 11l18-8-8 18-2-8-8-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
        ),
    },
    "In Progress": {
        label: "In Progress",
        className: "bg-alabaster text-carbon",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    Ready: {
        label: "Ready for pickup",
        className: "bg-muted-teal/40 text-carbon",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    Collected: {
        label: "Collected",
        className: "bg-seaweed/30 text-carbon",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12l1.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    Canceled: {
        label: "Canceled",
        className: "bg-red-100 text-red-700",
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M9 9l6 6M15 9l-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
};

export default function OrderStatusBadge({ status }: { status: OrderStatus }) {
    const { label, className, icon } = statusConfig[status];
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-sans text-xs font-medium ${className}`}>
            {icon}
            {label}
        </span>
    );
}