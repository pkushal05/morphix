// app/editor/loading.tsx
import React from "react";

export default function Loading() {
    return (
        <div className="fixed inset-0 bg-stone-950 flex flex-col items-center justify-center z-50 p-4">
            <div className="flex flex-col items-center max-w-sm w-full text-center">
                {/* Micro-Animated Parsing Engine Core */}
                <div className="relative flex items-center justify-center w-16 h-16">
                    <div className="absolute w-full h-full border-[3px] border-stone-900 rounded-full"></div>
                    <div className="absolute w-full h-full border-[3px] border-t-emerald-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin [animation-duration:0.6s]"></div>

                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-stone-400 animate-pulse"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>
                </div>

                <h3 className="mt-6 font-syne font-bold text-stone-200 text-base tracking-wide">
                    Initializing Editor Workspace
                </h3>

                <p className="mt-2 text-stone-500 text-xs font-mono leading-relaxed max-w-[260px]">
                    Allocating layout canvases and rendering engine frames...
                </p>
            </div>
        </div>
    );
}
