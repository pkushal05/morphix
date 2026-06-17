"use client";
import { useEditor } from "@/context/EditorContext";
import { SectionProps } from "@/types/props";
import HeadingBlock from "@/components/EditorPanel/HeadingBlock";
import ParagraphBlock from "@/components/EditorPanel/ParagraphBlock";
import ListBlock from "@/components/EditorPanel/ListBlock";
import { InlineHeadingBlock } from "./InlineHeadingBlock";

const Section = ({ sectionId }: SectionProps) => {
    const { state } = useEditor();
    const section = state.sections[sectionId];

    return (
        <div className="border-2 border-dashed border-stone-800 rounded-xl px-4 py-6 flex flex-col">
            <InlineHeadingBlock sectionId={sectionId} blockId="" />

            <div className="flex flex-col gap-y-6">
                {section.contentOrder.map((blockId, idx) => {
                    const block = section.contents[blockId];

                    if (!block) return null;

                    switch (block.type) {
                        case "heading":
                            return (
                                <HeadingBlock
                                    sectionId={sectionId}
                                    blockId={blockId}
                                    key={idx}
                                />
                            );

                        case "paragraph":
                            return (
                                <ParagraphBlock
                                    sectionId={sectionId}
                                    blockId={blockId}
                                    key={idx}
                                />
                            );

                        case "list":
                            return (
                                <ListBlock
                                    sectionId={sectionId}
                                    blockId={blockId}
                                    key={idx}
                                />
                            );
                        default:
                            return "<p>Cant find it</p>";
                    }
                })}
            </div>
        </div>
    );
};

export default Section;
