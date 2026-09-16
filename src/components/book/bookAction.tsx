"use client";

import Button from "@/components/UI/Button";

interface BookActionsProps {
    isbn: string;
}

export default function BookActions({ isbn }: BookActionsProps) {
    function handleAddToWishlist() {
        // TODO: call Wishlist endpoint with isbn
        console.log("Add to wishlist:", isbn);
    }

    function handleAddToTracking() {
        // TODO: call BookTracking endpoint with isbn
        console.log("Mark as read:", isbn);
    }

    function handleOrder() {
        // TODO: call Order endpoint with isbn
        console.log("Order:", isbn);
    }

    return (
        <div className="flex gap-3 mt-4">
            <Button onClick={handleAddToWishlist}>To read</Button>
            <Button onClick={handleAddToTracking}>Read</Button>
            <Button onClick={handleOrder} variant="secondary">Order</Button>
        </div>
    );
}