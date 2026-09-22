// same proportions as BookCard: when the real cards arrive nothing jumps
export default function BookCardSkeleton() {
    return (
        <div aria-hidden="true" className="w-[100px] shrink-0 motion-safe:animate-pulse md:w-auto">
            <div className="mb-2 aspect-[2/3] w-[100px] rounded-[10px] bg-alabaster md:mb-2.5 md:w-full" />
            <div className="mt-[7px] h-2.5 w-[85%] rounded bg-alabaster" />
            <div className="mt-[7px] h-2.5 w-[55%] rounded bg-alabaster" />
        </div>
    );
}