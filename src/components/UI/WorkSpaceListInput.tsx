"use client";

import { useRef } from "react";

interface WorkSpaceListInputProps {
    items: string[];
    label?: string;
    className?: string;
    onChange: (items: string[]) => void;
}

export default function WorkSpaceListInput({
    items,
    label,
    className,
    onChange,
}: WorkSpaceListInputProps) {
    const inputRefs = useRef<HTMLInputElement[]>([]);

    const handleTextChange = (index: number, text: string) => {
        const updated = [...items];
        updated[index] = text;
        onChange(updated);
    };

    const handleKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number,
    ) => {
        // 1. Spawns a new item directly beneath the current one on Enter
        if (e.key === "Enter") {
            e.preventDefault();
            const updated = [...items];
            updated.splice(index + 1, 0, "");
            onChange(updated);

            // Shift focus to the newly injected DOM element
            setTimeout(() => {
                inputRefs.current[index + 1]?.focus();
            }, 0);
        }

        // 2. Erases an empty line and drops focus to the previous item on Backspace
        if (e.key === "Backspace" && items[index] === "" && items.length > 1) {
            e.preventDefault();
            const updated = items.filter((_, i) => i !== index);
            onChange(updated);

            // Shift focus backwards to safely continue editing
            setTimeout(() => {
                const targetIndex = index === 0 ? 0 : index - 1;
                inputRefs.current[targetIndex]?.focus();
            }, 0);
        }
    };

    return (
        <div className={`w-full flex flex-col gap-2 ${className}`}>
            {label && (
                <label className="text-[10px] font-mono tracking-wider text-stone-500 uppercase select-none mb-1">
                    {label}
                </label>
            )}

            <div className="flex flex-col gap-y-2">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="flex items-center gap-x-3 group w-full"
                    >
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shrink-0 group-focus-within:bg-emerald-500 group-focus-within:scale-125 transition-all duration-200" />

                        {/* Item Row Input Box */}
                        <div className="relative flex-1">
                            <input
                                ref={(el) => {
                                    if (el) inputRefs.current[index] = el;
                                }}
                                type="text"
                                value={item}
                                onChange={(e) =>
                                    handleTextChange(index, e.target.value)
                                }
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                className="w-full bg-stone-900/30 text-stone-200 text-xs font-mono border border-stone-900 rounded px-3 py-1.5 placeholder-stone-700 outline-none hover:border-stone-800/80 focus:border-emerald-500/40 focus:bg-stone-900/50 transition-colors pr-8"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
