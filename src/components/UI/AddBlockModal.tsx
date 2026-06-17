import React from "react";


type AddBlockType = {
    heading: string;
    subHeading: string;
    options: {
        icon: React.ReactNode;
        label: string;
        desc: string;
        value: string;
    }[];
    onSelect: (value: string) => void;
};

export const AddBlockModal = (config: AddBlockType) => {
    return (
        <div className="space-y-4">
            <div>
                <h3 className="text-lg font-semibold text-stone-100 tracking-wide">
                    {config.heading}
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                    {config.subHeading}
                </p>
            </div>

            <div className="grid grid-cols-1 gap-2.5 pt-2">
                {config.options.map((option, idx) => {
                    return (
                        <button
                            key={idx}
                            onClick={() => config.onSelect(option.value)}
                            className="flex items-start gap-4 p-3 rounded-lg bg-stone-950/50 border border-stone-800 hover:border-stone-700 hover:bg-stone-800/40 text-left transition-all group focus:outline-none focus:ring-1 focus:ring-stone-600"
                        >
                            <div className="p-2 rounded bg-stone-900 border border-stone-800 group-hover:bg-stone-950 transition-colors">
                                {option.icon}
                            </div>
                            <div className="space-y-0.5">
                                <p className="text-sm font-medium text-stone-200 group-hover:text-stone-100 transition-colors">
                                    {option.label}
                                </p>
                                <p className="text-xs text-stone-500 group-hover:text-stone-400 transition-colors">
                                    {option.desc}
                                </p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};
