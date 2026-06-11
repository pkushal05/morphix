"use client";
import { useEditor } from "@/context/EditorContext";
import Section from "./Section";
const EditorPanel = () => {
    const { state } = useEditor();

    return (
        <div className="max-w-xl mx-auto p-3">
            {state.sectionOrder.map((sectionId) => {
                return <Section sectionId={sectionId} key={sectionId} />;
            })}
        </div>
    );
};

export default EditorPanel;
