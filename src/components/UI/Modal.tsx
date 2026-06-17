"use client";
import { RefObject } from "react";
import { createPortal } from "react-dom";

type ModalType = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

export function Modal({ isOpen, onClose, children }: ModalType) {
    if (!isOpen) return null;

    return createPortal(
        <div
            className="absolute inset-0 z-50 flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="bg-stone-900 border border-stone-800 rounded-xl p-6 max-w-md w-full"
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body,
    );
}
