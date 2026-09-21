interface BookshopInputProps {
    id: string;
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    required?: boolean;
    step?: string; // for number fields: "0.01" accepts prices with cents, without it only whole numbers
    min?: string;
    className?: string; // width or grid position of the field, chosen by who uses it (e.g. "w-[260px]")
}

// text field of the bookshop back-office: 40px high, corners of 6px, label above
export default function BookshopInput({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder,
    required = false,
    step,
    min,
    className = "",
}: BookshopInputProps) {
    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label htmlFor={id} className="font-sans text-[13px] leading-[1.2] text-carbon">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                step={step}
                min={min}
                className={
                    "h-10 w-full rounded-md border border-carbon/30 bg-white px-3 font-sans text-sm text-carbon " +
                    "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-stormy-teal"
                }
            />
        </div>
    );
}