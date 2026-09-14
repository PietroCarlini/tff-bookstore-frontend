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
}: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="text-sm font-sans text-carbon">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                required={required}
                aria-invalid={!!error}
                aria-describedby={error ? `${id}-error` : undefined}
                className="border border-carbon/30 rounded px-3 py-2 text-base font-sans focus:outline-none focus:ring-2 focus:ring-stormy-teal"
            />
            {error && (
                <p id={`${id}-error`} className="text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}