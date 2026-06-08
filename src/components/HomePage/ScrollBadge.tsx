"use client";

import { HiArrowDown } from "react-icons/hi";

const ScrollBadge = () => {
    const radius = 62;
    const center = 100;

    return (
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 lg:bottom-8 lg:right-8 z-5 flex items-center justify-center select-none w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
            <svg
                viewBox="0 0 200 200"
                className="w-full h-full animate-[spin_12s_linear_infinite] text-stone-400 fill-current"
            >
                <defs>
                    <path
                        id="scrollPath"
                        d={`M ${center - radius}, ${center} 
                            a ${radius},${radius} 0 1,1 ${radius * 2},0 
                            a ${radius},${radius} 0 1,1 -${radius * 2},0`}
                    />
                </defs>

                <text className="font-syne text-[14px] font-bold tracking-[4px] uppercase">
                    <textPath href="#scrollPath" startOffset="0%">
                        SCROLL DOWN • SCROLL DOWN •
                    </textPath>
                </text>
            </svg>

            <div className="absolute flex items-center justify-center w-10 h-10 rounded-full border border-stone-100/10 bg-stone-900/40 text-stone-100 backdrop-blur-xs shadow-md">
                <HiArrowDown size={16} className="animate-bounce" />
            </div>
        </div>
    );
};

export default ScrollBadge;
