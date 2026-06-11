import EditorPanel from "@/components/EditorPanel/EditorPanel";
import PreviewPanel from "@/components/PreviewPanel/PreviewPanel";
import React from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

const EditorPage = () => {
    return (
        <main className="w-full h-screen mt-19 text-stone-400">
            <div className="w-full max-w-7xl mx-auto px-7 h-full flex flex-col">
                <div className="flex items-center justify-between shrink-0 border-b border-stone-900 pb-5">
                    <div className="flex items-center space-x-2">
                        <span className="font-syne font-bold text-stone-200  tracking-wider uppercase text-sm md:text-lg">
                            Workspace
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-stone-900 border border-stone-800 rounded text-stone-500">
                            v1.0.core
                        </span>
                    </div>
                    <button className="px-2 md:px-4 py-1.5 bg-stone-100 text-stone-950 text-xs font-mono uppercase tracking-wider rounded font-bold hover:bg-emerald-400 transition-colors cursor-pointer">
                        Export
                    </button>
                </div>

                <div className="w-full flex-1 overflow-hidden rounded-lg">
                    <Group className="h-full">
                        <Panel
                            className="h-full overflow-y-auto bg-stone-950 custom-scrollbar"
                            data-lenis-prevent
                            defaultSize={"50"}
                            minSize={"30"}
                        >
                            <EditorPanel />
                        </Panel>
                        <Separator className="w-0.75 bg-stone-800 hover:bg-emerald-500/50 active:bg-emerald-500 cursor-col-resize transition-all duration-200 group relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-1 rounded-2xl bg-stone-500 group-hover:bg-emerald-400 transition-colors" />
                        </Separator>
                        <Panel
                            className="h-full overflow-y-auto bg-stone-950 custom-scrollbar"
                            data-lenis-prevent
                            defaultSize={"50"}
                            minSize={"30"}
                        >
                            <PreviewPanel />
                        </Panel>
                    </Group>
                </div>
            </div>
        </main>
    );
};

export default EditorPage;
