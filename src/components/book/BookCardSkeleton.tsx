// same size as BookCard: when the real cards arrive nothing jumps
export default function BookCardSkeleton() {
    return (
        // aria-hidden: it's only decoration; the loading state is announced by the section (aria-busy)
        <div aria-hidden="true" className="w-[100px] shrink-0 motion-safe:animate-pulse md:w-auto">
            <div className="mb-2 h-[138px] w-[100px] rounded-[10px] bg-alabaster md:mb-2.5 md:h-[190px] md:w-full" />
            <div className="mt-[7px] h-2.5 w-[85%] rounded bg-alabaster" />
            <div className="mt-[7px] h-2.5 w-[55%] rounded bg-alabaster" />
        </div>
    );
}