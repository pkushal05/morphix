"use client";

import { useRef, useState } from "react";
import { GoPlus } from "react-icons/go";
import { Modal } from "./Modal";
import { AddBlockModal } from "./AddBlockModal";
import { IoIosList } from "react-icons/io";
import { PiArrowBendRightDown } from "react-icons/pi";

type AnchorBlock = {
    type: "anchor";
    href: string;
    text: string;
};

type ListItem = {
    text: string;
    links?: AnchorBlock[];
};

interface WorkSpaceListInputProps extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange"
> {
    items: ListItem[];
    label?: string;
    className?: string;
    onChange: (items: ListItem[]) => void;
}

export default function WorkSpaceListInput({
    items,
    label,
    className,
    onChange,
    ...props
}: WorkSpaceListInputProps) {
    const inputRefs = useRef<HTMLInputElement[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleTextChange = (index: number, text: string) => {
        const updated = [...items];
        updated[index] = {
            ...updated[index],
            text,
        };
        onChange(updated);
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
                        {/* Bullet indicator */}
                        <div className="w-1.5 h-1.5 rounded-full bg-stone-700 shrink-0 group-focus-within:bg-emerald-500 group-focus-within:scale-125 transition-all duration-200" />

                        {/* Item Row Input Box */}
                        <div className="relative flex-1">
                            <input
                                ref={(el) => {
                                    if (el) inputRefs.current[index] = el;
                                }}
                                type="text"
                                value={item.text}
                                onChange={(e) =>
                                    handleTextChange(index, e.target.value)
                                }
                                // Spreads native properties like placeholder, disabled, autoFocus, etc.
                                {...props}
                                className="w-full bg-stone-900/30 text-stone-200 text-xs border border-stone-900 rounded px-3 py-1.5 placeholder-stone-700 outline-none group-focus-within:border-emerald-500/40 focus:bg-stone-900/50 transition-colors pr-8"
                            />
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pl-1.5">
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                title="Add Paragraph Block Below"
                                className="p-0.5 rounded text-stone-400 hover:text-green hover:bg-stone-800 transition-colors cursor-pointer"
                            >
                                <GoPlus />
                            </button>
                        </div>
                    </div>
                ))}

                <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                    <AddBlockModal
                        heading="Insert Content Node"
                        subHeading="Select the layout element to insert beneath this row."
                        options={[
                            {
                                label: "List Item",
                                desc: "Add a single bullet list beneath.",
                                icon: (
                                    <PiArrowBendRightDown className="text-violet-400" />
                                ),
                                value: "list",
                            },
                            {
                                label: "List",
                                desc: "Add a bulleted list after this list.",
                                icon: <IoIosList className="text-amber-400" />,
                                value: "list",
                            },
                        ]}
                        onSelect={(selectedValue) => {
                            console.log(selectedValue);
                            setIsMenuOpen(false);
                        }}
                    />
                </Modal>
            </div>
        </div>
    );
}
