import React from "react";
import { TransformAnimation } from "./TransformAnimation";

export const CTA = () => {
    return (
        <section className="w-full min-h-screen py-primary flex flex-col items-center px-7 border-t border-stone-800 relative">
            <div className="max-w-5xl w-full flex flex-col items-center">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-500 mb-6 mt-4">
                    DC_PPL.CORE_INFRASTRUCTURE
                </span>
                <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-syne uppercase tracking-tight leading-[0.95] text-stone-100 text-center mb-10">
                    Engineered for Ease of Student Web Devs.
                </h2>
                {/* <button className="px-8 py-4 bg-stone-200 text-stone-950 text-sm tracking-wider rounded-md overflow-hidden hover:bg-stone-300 active:scale-95 transition-all duration-300 transform cursor-pointer mt-60 z-2">
                    Get Started with Morphix
                </button> */}
            </div>
            <TransformAnimation />
        </section>
    );
};
