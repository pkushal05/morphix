"use client";
import { useEditor } from "@/context/EditorContext";
import { SectionProps } from "@/types/props";
import HeadingBlock from "@/components/HeadingBlock";
import ParagraphBlock from "@/components/ParagraphBlock";
import ListBlock from "@/components/ListBlock";

const Section = ({ sectionId }: SectionProps) => {
    const { state, dispatch } = useEditor();
    const section = state.sections[sectionId];

    return (
        <div>
            <h1>{section.title.text}</h1>
            <div>
                {section.contentOrder.map((blockId) => {
                    const block = section.contents[blockId];
                    if (block.type === "heading")
                        return (
                            <HeadingBlock
                                sectionId={sectionId}
                                blockId={blockId}
                                key={blockId}
                            />
                        );
                    if (block.type === "paragraph")
                        return (
                            <ParagraphBlock
                                sectionId={sectionId}
                                blockId={blockId}
                                key={blockId}
                            />
                        );
                    if (block.type === "list")
                        return (
                            <ListBlock
                                sectionId={sectionId}
                                blockId={blockId}
                                key={blockId}
                            />
                        );
                })}
            </div>
        </div>
    );
};

export default Section;
