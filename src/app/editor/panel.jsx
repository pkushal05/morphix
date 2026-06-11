"use client";

import React, { useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

export default function EditorPage() {
    // Shared state driving the live loop
    const [htmlPreview, setHtmlPreview] =
        useState <
        string >(
        "<h1>Initial Course Blueprint</h1><p>Welcome to the compiler sandbox.</p>");

    return (
        <main className="w-full h-screen bg-stone-950 text-stone-400 flex flex-col overflow-hidden mt-20">
            {/* Top Micro Header */}
            <header className="w-full h-14 border-b border-stone-900 px-6 flex items-center justify-between shrink-0 bg-stone-950 z-10">
                <div className="flex items-center space-x-3">
                    <span className="font-syne font-bold text-stone-200 tracking-wider uppercase text-sm">
                        Morphix Workspace
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-500">
                        v1.0.core
                    </span>
                </div>
                <button className="px-4 py-1.5 bg-stone-100 text-stone-950 text-xs font-mono uppercase tracking-wider rounded font-bold hover:bg-emerald-400 transition-colors cursor-pointer">
                    Export Schema
                </button>
            </header>

            {/* Split Panel Architecture */}
            <div className="w-full flex-1 relative overflow-hidden">
                <Group className="h-full">
                    <Panel
                        defaultSize={"50"}
                        minSize={"30"}
                        className="h-full bg-stone-950 overflow-y-auto custom-scrollbar"
                    >
                        <div className="p-6 space-y-6 max-w-3xl mx-auto">
                            <div className="border-b border-stone-900 pb-3">
                                <h3 className="text-xs font-mono uppercase text-stone-500 tracking-widest">
                                    01. Structural Input Array
                                </h3>
                            </div>

                            {/* Dynamic inputs loop placeholder */}
                            <div className="p-8 border border-dashed border-stone-800 rounded-xl text-center text-xs text-stone-600 font-mono">
                                [ GUI Editor Components Cascade Here ]
                            </div>
                        </div>
                    </Panel>

                    {/* Interactive Resize Divider Column */}
                    <Separator className="w-[3px] bg-stone-900 hover:bg-emerald-500/50 active:bg-emerald-500 transition-colors duration-200 relative cursor-col-resize group">
                        {/* Subtle visual drag handle accent */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-8 bg-stone-700 group-hover:bg-emerald-400 transition-colors" />
                    </Separator>

                    {/* Right Panel: Dangerously Rendered Live HTML Preview */}
                    <Panel
                        defaultSize={"50"}
                        minSize={"30"}
                        className="h-full bg-stone-900/10 overflow-y-auto border-l border-stone-950"
                    >
                        <div className="p-8 h-full">
                            <div className="w-full h-full max-w-3xl mx-auto bg-stone-950 border border-stone-900 rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)] overflow-y-auto">
                                <div
                                    className="prose prose-invert prose-stone max-w-none text-stone-300 text-sm leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: htmlPreview,
                                    }}
                                />
                            </div>
                        </div>
                    </Panel>
                </Group>
            </div>
        </main>
    );
}
