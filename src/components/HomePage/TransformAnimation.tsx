import { LEFT_TEXT, RIGHT_TEXT } from "@/lib/data";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import React from "react";

export const TransformAnimation = ({
    router,
}: {
    router: AppRouterInstance;
}) => {
    return (
        <div className="w-full h-auto relative overflow-hidden py-16 md:py-20">
            <div className="flex flex-col items-center justify-center px-6 text-center md:hidden relative z-5 space-y-8">
                <div className="flex flex-col items-center space-y-2 w-full max-w-xs font-mono text-[11px] tracking-wider text-stone-500">
                    <div className="px-3 py-1.5 bg-stone-900/50 border border-stone-800 rounded-md w-full flex justify-between items-center">
                        <span className="text-stone-400">input.docx</span>
                        <span className="text-stone-600">RAW_STRING</span>
                    </div>

                    <div className="h-6 w-px bg-linear-to-b from-stone-700 to-emerald-500 animate-pulse" />

                    <div className="px-3 py-1.5 bg-emerald-950/20 border border-emerald-900/40 rounded-md w-full flex justify-between items-center text-emerald-400">
                        <span>output.html</span>
                        <span className="text-emerald-500/60 font-bold">
                            VALIDATED
                        </span>
                    </div>
                </div>

                <div className="relative w-full flex justify-center">
                    <div className="absolute inset-0 m-auto w-32 h-32 bg-emerald-500/10 blur-2xl rounded-full pointer-events-none" />

                    <button
                        onClick={() => router.push("/upload")}
                        className="relative z-5 w-full max-w-xs px-6 py-4 bg-stone-100 text-stone-950 font-syne font-bold text-sm uppercase tracking-wider rounded-lg active:scale-98 transition-all cursor-pointer"
                    >
                        Execute Morphix
                    </button>
                </div>
            </div>

            <div className="hidden md:grid grid-cols-3 items-center w-full max-w-7xl mx-auto relative z-10">
                
                <div className="relative flex justify-end items-center h-full overflow-visible">
                    <svg
                        id="transform-svg-left"
                        viewBox="0 0 850 540"
                        fill="none"
                        className="w-[120%] h-auto max-w-none scale-110 translate-x-24 select-none origin-right"
                    >
                        <path
                            id="first-curve"
                            className="fill-transparent"
                            d="M0.597656 50.924805C17.4612 143.2965 97.8522 293.141 284.508 353.548C440.828 399.056 583.839 294.067 500.618 184.7492C417.397 75.4309 238.217 282.098 499.258 441.668C551.913 477.802 700.000 530.000 800.000 504.000"
                        />
                        <text x={0} className="text-4xl font-syne">
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

           
                <div className="relative z-5 flex items-end justify-center h-full px-4">
                    <button
                        onClick={() => router.push("/upload")}
                        className="px-6 py-3 bg-stone-100 text-stone-950 font-syne font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-emerald-500 hover:text-stone-950 transition-all duration-300 active:scale-95 cursor-pointer shadow-[0_0_30px_rgba(0,0,0,0.6)]"
                    >
                        Execute Morphix
                    </button>
                </div>

              
                <div className="relative flex justify-start items-center h-full overflow-visible">
                    <svg
                        id="transform-svg-right"
                        viewBox="0 0 1024 620"
                        className="w-[120%] h-auto max-w-none scale-110 -translate-x-24 select-none origin-left"
                    >
                        <path
                            id="second-curve"
                            className="stroke-transparent"
                            d="M2.04309 563.872C111.592 558.268 316.491 554.016 517.963 490.064C703.017 431.323 875.319 444.531 1021.88 453.216"
                        />
                        <text x={0} className="text-4xl font-syne">
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
