"use client";

interface ModalProps {
    children: React.ReactNode;
    onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-carbon/50">
            <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded bg-white p-6">
                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute right-4 top-4 text-xl text-carbon hover:text-carbon/70"
                >
                    ×
                </button>
                {children}
            </div>
        </div>
    );
}