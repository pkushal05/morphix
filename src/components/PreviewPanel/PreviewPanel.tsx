"use client";

import { useEditor } from "@/context/EditorContext";
import { convertToHtmlFragment } from "@/lib/jsonMapper";
import { useMemo } from "react";

const PreviewPanel = () => {
    const { state } = useEditor();

    const html = useMemo(() => {
        return convertToHtmlFragment(state);
    }, [state]);

    return (
        <div className="p-4 h-full">
            <div className="w-full h-full max-w-3xl mx-auto bg-stone-950 border border-stone-900 rounded-xl p-5">
                <div
                    className="prose prose-invert prose-stone max-w-none text-stone-300 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                        __html: html,
                    }}
                />
            </div>
        </div>
    );
};

export default PreviewPanel;
