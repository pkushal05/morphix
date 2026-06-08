"use client";
import { useEditor } from "@/context/EditorContext";
import Section from "./Section";
const EditorPanel = () => {
    const { state } = useEditor();

    return (
        <div>
            {state.sectionOrder.map((sectionId) => (
                <Section sectionId={sectionId} key={sectionId} />
            ))}
        </div>
    );
};

export default EditorPanel;
