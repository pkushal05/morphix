"use client";
import { useEditor } from "@/context/EditorContext";
import Section from "@/components/Section";
const EditorPanel = () => {
    const { state, dispatch } = useEditor();

    return (
        <div>
            {state.sectionOrder.map((sectionId) => (
                <Section sectionId={sectionId} key={sectionId} />
            ))}
        </div>
    );
};

export default EditorPanel;
