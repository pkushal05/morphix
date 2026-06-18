"use client";
import { useEditor } from "@/context/EditorContext";
import { SectionProps } from "@/types/props";
import HeadingBlock from "@/components/EditorPanel/HeadingBlock";
import ParagraphBlock from "@/components/EditorPanel/ParagraphBlock";
import ListBlock from "@/components/EditorPanel/ListBlock";
import { InlineHeadingBlock } from "./InlineHeadingBlock";
import { GoPlus } from "react-icons/go";
import { Modal } from "../UI/Modal";
import { useState } from "react";
import { HiOutlineFolderPlus } from "react-icons/hi2";
import { AddBlockModal } from "../UI/AddBlockModal";
import { ActionTypes } from "@/types/actions";
import { FaRegTrashCan } from "react-icons/fa6";

const Section = ({ sectionId }: SectionProps) => {
    const { state, dispatch } = useEditor();
    const section = state.sections[sectionId];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex flex-col gap-y-4">
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
            <div className="w-full opacity-100 transition-opacity duration-150 pl-1.5 flex justify-center">
                <button
                    onClick={() => setIsMenuOpen(true)}
                    title="Add Paragraph Block Below"
                    className="p-0.5 rounded text-stone-400 hover:text-green hover:bg-stone-800 transition-colors cursor-pointer"
                >
                    <GoPlus />
                </button>
            </div>
            <Modal isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                <AddBlockModal
                    heading="Insert Structural Break"
                    subHeading="Establish a completely new chapter boundary."
                    options={[
                        {
                            label: "New Section",
                            desc: "Create a top-level divider or major module block layout.",
                            icon: (
                                <HiOutlineFolderPlus className="text-green" />
                            ),
                            value: "section",
                        },
                        {
                            label: "Delete",
                            desc: "Remove the above entire section from DOM",
                            icon: <FaRegTrashCan className="text-red-500" />,
                            value: "delete",
                        },
                    ]}
                    onSelect={(selectedValue) => {
                        if (selectedValue === "section") {
                            dispatch({
                                type: ActionTypes.ADD_SECTION,
                                payload: { targetSectionId: sectionId },
                            });
                        } else {
                            dispatch({
                                type: ActionTypes.REMOVE_SECTION,
                                payload: { sectionId },
                            });
                        }
                        setIsMenuOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
};

export default Section;
