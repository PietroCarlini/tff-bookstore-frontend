"use client";

import { useEffect } from "react";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
    titleId?: string; // id of the title inside the modal: it gives the window its accessible name
}

export default function Modal({ children, onClose, titleId }: ModalProps) {
    // Escape closes the window (for who uses the keyboard)
    useEffect(() => {
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === "Escape") onClose();
        }

        document.addEventListener("keydown", handleKeyDown);
        // cleanup: the listener is removed when the modal closes
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/50 p-4">
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                className="relative max-h-[90vh] w-full max-w-[560px] overflow-y-auto rounded-xl bg-white p-6 shadow-[0_16px_40px_rgba(0,0,0,0.25)]"
            >
                <button
                    type="button"
                    onClick={onClose}
                    aria-label="Close"
                    className={
                        "absolute right-4 top-3.5 rounded text-[22px] leading-none text-carbon " +
                        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stormy-teal"
                    }
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}