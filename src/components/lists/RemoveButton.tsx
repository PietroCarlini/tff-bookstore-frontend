"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Button from "@/components/UI/Button";
import { removeFromListAction } from "@/actions/listsAction";
import { ListType } from "@/services/listsService";

interface RemoveButtonProps {
    type: ListType;
    isbn: string;
}

export default function RemoveButton({ type, isbn} : RemoveButtonProps){
    const router = useRouter();
    const [ removing, setRemoving ] = useState(false);

    async function handleRemove() {
        setRemoving(true);
        await removeFromListAction(type, isbn);
        router.refresh();// Re-runs the Server Component (the page) so the removed book disappears from the list
    }

    return(
        <Button variant='secondary' onClick={handleRemove} disabled={removing}>
            {removing ? 'Removing..' : 'Remove from list'}
        </Button>
    );
}