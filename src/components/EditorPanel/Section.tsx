"use client";
import { useEditor } from "@/context/EditorContext";
import { SectionProps } from "@/types/props";
import HeadingBlock from "@/components/EditorPanel/HeadingBlock";
import ParagraphBlock from "@/components/EditorPanel/ParagraphBlock";
import ListBlock from "@/components/EditorPanel/ListBlock";
import WorkspaceInput from "../UI/WorkSpaceInput";
import { ActionTypes } from "@/types/actions";

const Section = ({ sectionId }: SectionProps) => {
    const { state, dispatch } = useEditor();
    const section = state.sections[sectionId];

    return (
        <div className="border-2 border-dashed border-stone-800 rounded-md px-4 py-6 flex flex-col">
            <div className="border-b border-stone-800 pb-2 flex items-center w-full">
                <WorkspaceInput
                    label="Topic:"
                    variant="inline-header"
                    value={section.title.text}
                    onChange={(e) => {
                        dispatch({
                            type: ActionTypes.UPDATE_TOPIC_TITLE,
                            value: e.target.value,
                            sectionId: sectionId,
                        });
                    }}
                />
            </div>

            <div className="flex flex-col gap-y-6">
                {section.contentOrder.map((blockId) => {
                    const block = section.contents[blockId];

                    if (!block) return null;

                    switch (block.type) {
                        case "heading":
                            return (
                                <HeadingBlock
                                    sectionId={sectionId}
                                    blockId={blockId}
                                />
                            );

                        
                    }
                })}
            </div>
        </div>
    );
};

export default Section;
