"use client";

import EditorPanel from "@/components/EditorPanel/EditorPanel";
import PreviewPanel from "@/components/PreviewPanel/PreviewPanel";
import { Modal } from "@/components/UI/Modal";
import { useEditor } from "@/context/EditorContext";
import { convertToHtml, convertToSection } from "@/lib/jsonMapper";
import { useState } from "react";
import { Group, Panel, Separator } from "react-resizable-panels";

const EditorPage = () => {
    const { state } = useEditor();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleExportHtml = () => {
        const htmlContent = convertToHtml(state);

        const blob = new Blob([htmlContent], {
            type: "text/html;charset=utf-8;",
        });

        const rawFileName = state.documentTitle || "compiled-course";
        const sanitizedFileName =
            rawFileName
                .trim()
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-") + ".html";

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", sanitizedFileName);

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 100);
    };

    const handleExportMultipleHtml = () => {
        if (!state.sectionOrder || state.sectionOrder.length === 0) {
            console.warn("Morphix Export: No section order sequence found.");
            return;
        }

        state.sectionOrder.forEach((sectionId, index) => {
            const currentSection = state.sections[sectionId];
            if (!currentSection) return;

            const sectionTitle =
                currentSection.title.text || `Topic ${index + 1}`;

            const standaloneHtml = convertToSection(currentSection);
            const sanitizedFileName =
                sectionTitle
                    .trim()
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-+|-+$/g, "") + ".html";

            const blob = new Blob([standaloneHtml], {
                type: "text/html;charset=utf-8;",
            });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.setAttribute("download", sanitizedFileName);
            link.click();

            setTimeout(() => URL.revokeObjectURL(url), 100);
        });
    };

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
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-2 md:px-4 py-1.5 bg-stone-100 text-stone-950 text-xs font-mono uppercase tracking-wider rounded font-bold hover:bg-emerald-400 transition-colors cursor-pointer flex gap-x-2 items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-3.5 h-3.5 text-stone-500 group-hover:text-emerald-400 transition-colors"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
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
            </div>{" "}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="p-1 max-w-md">
                    <h2 className="text-xl font-syne font-bold text-stone-200">
                        Export Compiled Structure
                    </h2>
                    <p className="text-stone-400 text-sm mt-1.5 tracking-wide leading-relaxed">
                        Choose how you want Morphix to package and distribute
                        your semantic HTML build output.
                    </p>

                    <div className="mt-6 flex flex-col gap-y-3">
                        {/* OPTION 1: SINGLE ALL-IN-ONE BUILD */}
                        <button
                            onClick={() => {
                                handleExportHtml();
                                setIsModalOpen(false);
                            }}
                            className="w-full text-left p-4 bg-stone-900/40 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl transition-all group flex items-start gap-x-4 cursor-pointer"
                        >
                            <div className="p-2.5 bg-stone-950 border border-stone-800 rounded-lg shrink-0 text-stone-400 group-hover:text-emerald-400 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-syne font-semibold text-stone-200 text-sm group-hover:text-white transition-colors">
                                    Single Unified File
                                </h4>
                                <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                                    Compiles all course chapters sequentially
                                    into one single `.html` document web layout.
                                    Perfect for complete archiving.
                                </p>
                            </div>
                        </button>

                        {/* OPTION 2: SEPARATED MODULAR CHAINS */}
                        <button
                            onClick={() => {
                                handleExportMultipleHtml();
                                setIsModalOpen(false);
                            }}
                            className="w-full text-left p-4 bg-stone-900/40 hover:bg-stone-900 border border-stone-800 hover:border-stone-700 rounded-xl transition-all group flex items-start gap-x-4 cursor-pointer"
                        >
                            <div className="p-2.5 bg-stone-950 border border-stone-800 rounded-lg shrink-0 text-stone-400 group-hover:text-emerald-400 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="w-5 h-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 6h12M6 12h12M6 18h12"
                                    />
                                </svg>
                            </div>
                            <div>
                                <h4 className="font-syne font-semibold text-stone-200 text-sm group-hover:text-white transition-colors">
                                    Isolated Chapters (.html bundle)
                                </h4>
                                <p className="text-stone-500 text-xs mt-1 leading-relaxed">
                                    Splits every module section block into its
                                    own independent, custom-named standalone web
                                    file. Ideal for LMS uploads.
                                </p>
                            </div>
                        </button>
                    </div>

                    <div className="mt-6 flex justify-end pt-3 border-t border-stone-900">
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-stone-400 hover:text-stone-200 font-mono text-xs font-medium rounded-lg hover:bg-stone-900/60 transition-colors border border-stone-600 hover:border-stone-200 cursor-pointer"
                        >
                            Cancel Action
                        </button>
                    </div>
                </div>
            </Modal>
        </main>
    );
};

export default EditorPage;
