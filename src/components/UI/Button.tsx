interface ButtonProps {
    //* React.ReactNode = children type (what is inside <button> tag): everything JSX renderable
    children: React.ReactNode;
    //* accepted values for type are: button or submit
    type?: "button" | "submit";
    //* custom prop (not HTML native) to pick which Tailwind style variant to apply (from global.css)
    //* "outline-teal" = light teal outline, used for the list actions (To read / Read)
    variant?: "primary" | "secondary" | "outline-teal" | "filled-teal";
    //* onClick optional because a button inside a form doesn't need it (form manages submit automatically)
    onClick?: () => void;
    disabled?: boolean;
    //* optional extra classes chosen by who uses the button (e.g. width: "w-full", "flex-1")
    className?: string;
}

// one entry per variant: Record<...> makes TS warn us if a variant is added to the type and its style is forgotten
const variantStyles: Record<NonNullable<ButtonProps["variant"]>, string> = {
    primary: "border-seaweed bg-seaweed text-carbon hover:bg-seaweed/90",
    secondary: "border-carbon text-carbon hover:bg-carbon/5",
    "outline-teal": "border-muted-teal text-stormy-teal hover:bg-muted-teal/30",
    "filled-teal": "border-muted-teal bg-muted-teal text-carbon hover:bg-muted-teal/80",
};

export default function Button({
    children,
    type = "button",
    variant = "primary",
    onClick,
    disabled = false,
    className = "",
}: ButtonProps) {
    const baseStyles =
        "inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border-[1.5px] px-5 font-sans text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-stormy-teal focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

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