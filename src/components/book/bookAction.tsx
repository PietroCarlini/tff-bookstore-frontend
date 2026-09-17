"use client";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";

interface BookActionsProps {
    isbn: string;
    title: string;
    author: string;
    cover: string | null;
}

export default function BookActions({ isbn, title, author, cover }: BookActionsProps) {
    const router = useRouter();

    function handleAddToWishlist() {
        // TODO: call Wishlist endpoint with isbn
        console.log("Add to wishlist:", isbn);
    }

    function handleAddToTracking() {
        // TODO: call BookTracking endpoint with isbn
        console.log("Mark as read:", isbn);
    }

    function handleOrder() {
        const params = new URLSearchParams({ isbn, title, author });
        if(cover) params.set('cover', cover);
        router.push(`/client/place-order?${params.toString()}`)
    }

    return (
        <div className="flex gap-3 mt-4">
            <Button onClick={handleAddToWishlist}>To read</Button>
            <Button onClick={handleAddToTracking}>Read</Button>
            <Button onClick={handleOrder} variant="secondary">Order</Button>
        </div>
    );
}