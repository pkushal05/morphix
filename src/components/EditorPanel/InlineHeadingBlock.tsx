import { BlockProps } from "@/types/props";
import WorkspaceInput from "../UI/WorkSpaceInput";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import { GoPlus } from "react-icons/go";
import { Modal } from "../UI/Modal";
import { useState } from "react";
import { AddBlockModal } from "../UI/AddBlockModal";
import { LuHeading } from "react-icons/lu";
import { CiTextAlignLeft } from "react-icons/ci";
import { IoIosList } from "react-icons/io";

export const InlineHeadingBlock = ({ sectionId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const section = state.sections[sectionId];

    return (
        <div className="pb-2 flex items-center w-full group">
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
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 pl-1.5">
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
                    heading="Insert Content Node"
                    subHeading="Select the layout element to insert beneath this row."
                    options={[
                        {
                            label: "Heading",
                            desc: "Insert a sub-heading for lessons or topics.",
                            icon: <LuHeading className="text-sky-400" />,
                            value: "heading",
                        },
                        {
                            label: "Paragraph",
                            desc: "Standard body context blocks for description data.",
                            icon: (
                                <CiTextAlignLeft className="text-stone-400" />
                            ),
                            value: "paragraph",
                        },
                        {
                            label: "List",
                            desc: "Bulleted entry for deliverables or target outcomes.",
                            icon: <IoIosList className="text-amber-400" />,
                            value: "list",
                        },
                    ]}
                    onSelect={(selectedValue) => {
                        dispatch({
                            type: ActionTypes.ADD_CONTENT_BLOCK,
                            payload: {
                                sectionId,
                                targetBlockId: "",
                                blockType: selectedValue,
                            },
                        });

                        setIsMenuOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
};
