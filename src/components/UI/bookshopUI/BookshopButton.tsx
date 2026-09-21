interface BookshopButtonProps {
    children: React.ReactNode;
    type?: "button" | "submit";
    variant?: "primary" | "secondary";
    onClick?: () => void;
    disabled?: boolean;
    className?: string; // extra classes chosen by who uses the button (e.g. width)
}

const variantStyles: Record<NonNullable<BookshopButtonProps["variant"]>, string> = {
    primary: "border-seaweed bg-seaweed text-carbon hover:bg-seaweed/90",
    secondary: "border-carbon text-carbon hover:bg-carbon/5",
};

// button of the bookshop back-office: 40px high, corners of 6px (not the pill of the client side)
export default function BookshopButton({
    children,
    type = "button",
    variant = "primary",
    onClick,
    disabled = false,
    className = "",
}: BookshopButtonProps) {
    const baseStyles =
        "inline-flex min-h-10 items-center justify-center rounded-md border-[1.5px] px-[18px] " +
        "font-sans text-sm font-semibold transition-colors " +
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal " +
        "disabled:cursor-not-allowed disabled:opacity-50";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        >
            {children}
        </button>
    );
}