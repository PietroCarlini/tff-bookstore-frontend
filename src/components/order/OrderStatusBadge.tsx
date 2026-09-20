import { OrderStatus } from "@/types/orderTypes";

interface StatusConfig {
    label: string;
    className: string;
    icon: React.ReactNode;
}

// colour classes shared by the badge (client side) and the select (bookshop side)
export const statusColors: Record<OrderStatus, string> = {
    Sent: "bg-status-sent border-status-sent-border",
    "In Progress": "bg-status-progress border-status-progress-border",
    Ready: "bg-status-ready border-status-ready-border",
    Collected: "bg-status-collected border-status-collected-border",
    Canceled: "bg-status-canceled border-status-canceled-border",
};

const statusConfig: Record<OrderStatus, StatusConfig> = {
    Sent: {
        label: "Sent",
        className: statusColors.Sent,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M3 11l18-8-8 18-2-8-8-2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
            </svg>
        ),
    },
    "In Progress": {
        label: "In Progress",
        className: statusColors["In Progress"],
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
                <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    Ready: {
        label: "Ready for pickup",
        className: statusColors.Ready,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        ),
    },
    Collected: {
        label: "Collected",
        className: statusColors.Collected,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M4 12l1.5 1.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
        ),
    },
    Canceled: {
        label: "Canceled",
        className: statusColors.Canceled,
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
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-sans text-xs font-semibold text-carbon ${className}`}>
            {icon}
            {label}
        </span>
    );
}