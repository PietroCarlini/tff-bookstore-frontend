interface ButtonProps {
    //* React.ReactNode = children type (what is inside <button> tag): everything JSX renderable
    children: React.ReactNode;
    //* accepted values for type are: button or submit
    type?: "button" | "submit";
    //* custom prop (not HTML native) to pick which Tailwind style variant to apply (from global.css)
    variant?: "primary" | "secondary";
    //* onClick optional because a button inside a form doesn't need it (form manages submit automatically)
    onClick?: () => void;
    disabled?: boolean;
}

export default function Button({
    children,
    type = "button",
    variant = "primary",
    onClick,
    disabled = false,
}: ButtonProps) {
    const baseStyles =
        "rounded px-4 py-2 font-sans font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-stormy-teal disabled:opacity-50 disabled:cursor-not-allowed";

    const variantStyles =
        variant === "primary"
            ? "bg-seaweed text-carbon hover:bg-seaweed/90"
            : "border border-carbon text-carbon hover:bg-carbon/5";

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${variantStyles}`}
        >
            {children}
        </button>
    );
}