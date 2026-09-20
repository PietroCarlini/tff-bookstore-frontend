interface InputProps {
    id: string;
    label: string;
    //* ? means optional: this prop can be omitted (becomes undefined if not passed). The actual default value ("text") is set separately below, in the destructuring
    type?: string,
    value: string;
    //React.ChangeEvent<HTMLInputElement>: TS type of Elment, here INPUT
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
    required?: boolean;
    placeholder?: string;
    //* "field" = normal form input; "search" = pill with magnifier icon and a visually hidden label (client search bars)
    variant?: "field" | "search";
}


// destructuring: unpack the single props object into individual variables (id, label, type...) instead of writing props.id, props.label etc.
// : InputProps -> type annotation for the whole destructured object, not per single property
export default function Input({
    id,
    label,
    type = "text",
    value,
    onChange,
    error,
    required = false,
    placeholder,
    variant = "field",
}: InputProps) {
    const isSearch = variant === "search";

    return (
        <div className="flex flex-col gap-1">
            {/* in the search variant the label stays for screen readers only (sr-only) */}
            <label htmlFor={id} className={isSearch ? "sr-only" : "text-sm font-sans text-carbon"}>
                {label}
            </label>
            <div className="relative">
                <input
                    id={id}
                    name={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    aria-invalid={!!error}
                    aria-describedby={error ? `${id}-error` : undefined}
                    className={`w-full font-sans text-base text-carbon focus:outline-none focus:ring-2 focus:ring-stormy-teal ${
                        isSearch
                            ? "h-11 rounded-full border border-muted-teal bg-alabaster pl-4 pr-11 placeholder:text-carbon/70"
                            : "rounded-lg border border-carbon/30 bg-white px-3 py-2 aria-invalid:border-red-600"
                    }`}
                />
                {/* magnifier: decorative, so aria-hidden; pointer-events-none lets the click reach the input */}
                {isSearch && (
                    <svg
                        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-carbon/70"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" />
                        <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </svg>
                )}
            </div>
            {error && (
                <p id={`${id}-error`} className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}