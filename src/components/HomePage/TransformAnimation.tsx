import { LEFT_TEXT, RIGHT_TEXT } from "@/lib/data";
import React from "react";

export const TransformAnimation = () => {
    return (
        <div className="w-full h-auto relative overflow-hidden bg-stone-950">
            {/* The Pipeline Architecture Grid */}
            <div className="grid grid-cols-3 items-center w-full relative z-2">
                {/* 1. LEFT COLUMN: Raw DOCX Input Stream */}
                <div className="relative flex justify-end items-center h-full overflow-visible">
                    <svg
                        id="transform-svg-left"
                        viewBox="0 0 850 540"
                        fill="none"
                        className="w-full h-auto max-w-none scale translate-x-2 sm:translate-x-4 select-none"
                    >
                        <path
                            id="first-curve"
                            className="fill-transparent"
                            d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 700.000 530.000 800.000 504.000"
                        />
                        <text
                            x={0}
                            className="text-xl sm:text-2xl md:text-4xl font-syne"
                        >
                            <textPath
                                id="marquee-first"
                                href="#first-curve"
                                className="fill-stone-500/40 font-normal lowercase"
                            >
                                {LEFT_TEXT}
                            </textPath>
                            <animate
                                id="marquee-anim-first"
                                attributeName="x"
                                dur={30}
                                values="-2000;0"
                                repeatCount="indefinite"
                            ></animate>
                        </text>
                    </svg>
                </div>

                {/* 2. CENTER COLUMN: Morphix Core Engine Mask (Place your CTA content / buttons inside here) */}
                <div className="flex flex-col items-center justify-end-safe h-full align-bottom">
                    <button className="px-6 py-3 bg-stone-100 text-stone-950 font-syne font-bold text-sm uppercase tracking-wider rounded hover:bg-emerald-500 hover:text-stone-950 transition-all duration-300 active:scale-95 cursor-pointer">
                        Execute Morphix
                    </button>
                </div>

                {/* 3. RIGHT COLUMN: Normalized Semantic Output Stream */}
                <div className="relative flex justify-start items-center h-full overflow-hidden">
                    <svg
                        id="transform-svg-right"
                        viewBox="0 0 1024 620"
                        className="w-full h-auto max-w-none scale -translate-x-2 sm:-translate-x-4 select-none"
                    >
                        <path
                            id="second-curve"
                            className="stroke-transparent"
                            d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
                        />
                        <text
                            x={0}
                            className="text-xl sm:text-2xl md:text-4xl font-syne"
                        >
                            <textPath
                                id="marquee-second"
                                href="#second-curve"
                                className="fill-emerald-400 font-medium uppercase tracking-wide [baseline-shift:-30%]"
                            >
                                {RIGHT_TEXT}
                            </textPath>
                            <animate
                                id="marquee-anim-second"
                                attributeName="x"
                                dur={25}
                                values="-2000;0"
                                repeatCount="indefinite"
                            ></animate>
                        </text>
                    </svg>
                </div>
            </div>
        </div>
    );
};
