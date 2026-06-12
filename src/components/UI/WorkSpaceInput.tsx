"use client";

import React from "react";

interface WorkspaceInputProps extends React.InputHTMLAttributes<
    HTMLInputElement | HTMLTextAreaElement
> {
    label?: string;
    variant?: "default" | "inline-header" | "textarea";
}

export default function WorkspaceInput({
    label,
    variant = "default",
    className = "",
    ...props
}: WorkspaceInputProps) {

    if (variant === "inline-header") {
        return (
            <div className="w-full flex flex-col gap-1">
                {label && (
                    <span className="text-[10px] font-mono tracking-wider text-stone-600 uppercase select-none">
                        {label}
                    </span>
                )}
                <input
                    type="text"
                    className={`w-full bg-transparent text-stone-100 font-syne font-semibold text-base placeholder-stone-700 focus:outline-none border-b border-transparent hover:border-stone-800/60 focus:border-emerald-500/60 pb-1 transition-colors text-center ${className}`}
                    {...props}
                />
            </div>
        );
    }

    // Variant 2: Standard box layout for structural content fields
    return (
        <div className="w-full flex flex-col gap-1.5">
            {label && (
                <label className="text-[10px] font-mono tracking-wider text-stone-500 uppercase select-none">
                    {label}
                </label>
            )}
            <div className="relative group w-full">
                <input
                    type="text"
                    className={`w-full bg-stone-900/30 text-stone-200 text-sm  border border-stone-900 rounded px-3 py-2 placeholder-stone-700 outline-none hover:border-stone-800/80 focus:border-emerald-500/40 focus:bg-stone-900/50 transition-all ${className}`}
                    {...props}
                />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-emerald-400 transition-all duration-300 group-focus-within:w-[98%]" />
            </div>
        </div>
    );
}
