"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import React, { ChangeEvent, useRef, useState } from "react";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import { useRouter } from "next/navigation";

export default function UploadPage() {
    const [isDragActive, setIsDragActive] = useState(false);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const { dispatch } = useEditor();
    const router = useRouter();

    useGSAP(() => {
        const titleSplit = new SplitText(headingRef.current, {
            type: "words",
            mask: "words",
        });

        const descSplit = new SplitText(descRef.current, {
            type: "words",
            mask: "words",
        });

        const tl = gsap.timeline({ delay: 0.5 });

        tl.from(titleSplit.words, {
            y: 30,
            rotation: -5,
            filter: "blur(10px)",
            opacity: 0,
            stagger: 0.08,
            duration: 1.4,
            ease: "power4.out",
        });

        tl.from(
            descSplit.words,
            {
                x: -20,
                opacity: 0,
                stagger: 0.08,
                duration: 1.4,
            },
            "<",
        );

        return () => {
            titleSplit.revert();
            descSplit.revert();
        };
    }, []);

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setIsDragActive(true);
        } else if (e.type === "dragleave") {
            setIsDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsDragActive(false);
        setError(null);

        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) validateAndSetFile(droppedFile);
    };

    const validateAndSetFile = (selectedFile: File) => {
        if (
            selectedFile.type !==
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" &&
            !selectedFile.name.endsWith(".docx")
        ) {
            setError(
                "Invalid file format. Please upload a structured .docx file",
            );
            setFile(null);
            return;
        }

        if (selectedFile.size > 25 * 1024 * 1024) {
            setError(
                "File payload exceeds maximum capacity boundary (25MB limit).",
            );
            setFile(null);
            return;
        }

        setError(null);
        setFile(selectedFile);
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!file) {
            setError("Please select or drop a file first");
            return;
        }

        setIsUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/parsefile", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                throw new Error("Error Parsing File. Please Try Again.");
            }

            const data = await res.json();

            dispatch({
                type: ActionTypes.LOAD_STATE,
                payload: data.parsedJson,
            });
            router.push("/editor");
        } catch (err: unknown) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected execution error occured",
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full min-h-[80vh] bg-stone-950 text-stone-400 py-20 px-7 flex flex-col items-center justify-center"
        >
            <div className="w-full max-w-5xl space-y-10">
                {/* Header Block */}
                <div className="text-center md:text-left space-y-2">
                    <h1
                        ref={headingRef}
                        className="text-3xl font-extrabold font-syne text-stone-100 uppercase tracking-wider leading-[0.95]"
                    >
                        Initialize Pipeline
                    </h1>
                    <p
                        ref={descRef}
                        className="text-sm text-stone-500 max-w-xl"
                    >
                        Upload educational modules or curriculum blueprints to
                        extract semantic HTML string.
                    </p>
                </div>

                <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    className={`w-full aspect-video md:h-80 border rounded-xl flex flex-col items-center justify-center p-8 text-center transition-all duration-500 relative group cursor-pointer ${
                        error
                            ? "border-red-500/50 bg-red-950/5"
                            : file
                              ? "border-emerald-500/50 bg-emerald-950/5"
                              : isDragActive
                                ? "border-emerald-500 bg-emerald-950/10 shadow-[0_0_30px_rgba(16,185,129,0.05)]"
                                : "border-stone-800/80 bg-stone-900/20 hover:border-stone-700/80"
                    }`}
                >
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-stone-700 group-hover:border-emerald-500/60 transition-colors opacity-0 group-hover:opacity-100" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-stone-700 group-hover:border-emerald-500/60 transition-colors opacity-0 group-hover:opacity-100" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-stone-700 group-hover:border-emerald-500/60 transition-colors opacity-0 group-hover:opacity-100" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-stone-700 group-hover:border-emerald-500/60 transition-colors opacity-0 group-hover:opacity-100" />

                    <div className="space-y-4 max-w-sm pointer-events-none">
                        <div
                            className={`mx-auto w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center transition-all ${file ? "border-emerald-500 bg-emerald-950/30" : "border-stone-800 bg-stone-900/80 group-hover:border-emerald-500/30 group-hover:bg-emerald-950/20"}`}
                        >
                            <span
                                className={`font-mono text-xs ${file ? "text-emerald-400 font-bold" : "text-stone-500 group-hover:text-emerald-400"}`}
                            >
                                {file ? "✓" : "DOCX"}
                            </span>
                        </div>
                        <div className="space-y-1">
                            <p className="text-sm font-medium text-stone-300">
                                {file ? (
                                    <span className="text-emerald-400 font-mono text-xs">
                                        {file.name}
                                    </span>
                                ) : (
                                    <>
                                        Drag & drop source document, or{" "}
                                        <span className="text-emerald-400 group-hover:underline">
                                            browse
                                        </span>
                                    </>
                                )}
                            </p>
                            <p className="text-xs text-stone-600 font-mono">
                                {file
                                    ? `${(file.size / (1024 * 1024)).toFixed(2)} MB // ready`
                                    : "max_payload: 25mb // extensions [.docx]"}
                            </p>
                        </div>
                    </div>
                    <input
                        type="file"
                        accept=".docx"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const selected = e.target.files?.[0];
                            if (selected) validateAndSetFile(selected);
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                </div>
                {error && (
                    <div className="w-full flex justify-center -mt-8">
                        <span className="text-red-400 text-xs font-mono tracking-wider uppercase">
                            {error}
                        </span>
                    </div>
                )}
                <div className="w-full flex justify-center">
                    <button
                        type="submit"
                        disabled={isUploading}
                        className="px-5 py-3 border border-stone-700 rounded-xl cursor-pointer hover:border-stone-500 text-stone-700 hover:text-stone-500 transition-all duration-200 active:scale-95 active:border-emerald-600 active:text-emerald-400"
                    >
                        {isUploading ? "Processing..." : "Parse Document"}
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-900 md:text-center">
                    <div className="space-y-1">
                        <h4 className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                            01. Structure
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            Use structural Word heading hierarchies (H1, H2, H3)
                            to get accurate output tracking layouts.
                        </p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                            02. Formatting
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            Format your desired markup layout options straight
                            through the main interface GUI elements.
                        </p>
                    </div>
                    <div className="space-y-1">
                        <h4 className="text-xs font-mono text-stone-500 uppercase tracking-wider">
                            03. Download
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                            Export clean files compiled directly out into
                            structured{" "}
                            <code className="border border-stone-800 px-1.5 py-0.5 rounded bg-stone-900/60 font-mono text-[10px] text-stone-500">
                                .html
                            </code>{" "}
                            templates.
                        </p>
                    </div>
                </div>
            </div>
        </form>
    );
}
