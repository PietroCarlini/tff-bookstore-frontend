// same size as ResultItem: when the real results arrive nothing jumps
export default function ResultItemSkeleton() {
    return (
        // aria-hidden: only decoration; the loading state is announced by the page (aria-busy)
        <li
            aria-hidden="true"
            className={
                "flex items-center gap-[13px] border-b border-stormy-teal/[0.12] px-[18px] py-[13px] " +
                "motion-safe:animate-pulse " +
                "md:flex-col md:items-stretch md:gap-0 md:border-0 md:p-2.5"
            }
        >
            <div className="h-[74px] w-[52px] shrink-0 rounded-md bg-alabaster md:mb-2.5 md:h-[210px] md:w-full md:rounded-lg" />
            <div className="flex-1">
                <div className="h-3.5 w-[60%] rounded bg-alabaster" />
                <div className="mt-2 h-2.5 w-[40%] rounded bg-alabaster" />
            </div>
        </li>
    );
}