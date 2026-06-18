import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import { BlockProps } from "@/types/props";
import WorkSpaceTextarea from "../UI/WorkSpaceTextarea";
import { GoPlus } from "react-icons/go";
import { Modal } from "../UI/Modal";
import { useState } from "react";
import { AddBlockModal } from "../UI/AddBlockModal";
import { CiTextAlignLeft } from "react-icons/ci";
import { LuHeading } from "react-icons/lu";
import { IoIosList } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

const ParagraphBlock = ({ sectionId, blockId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    if (block.type !== "paragraph") return null;

    return (
        <div className="flex items-center group">
            <WorkSpaceTextarea
                value={block.text}
                onChange={(e) =>
                    dispatch({
                        type: ActionTypes.UPDATE_PARAGRAPH,
                        value: e.target.value,
                        sectionId,
                        blockId,
                    })
                }
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
                        {
                            label: "Delete",
                            desc: "Remove the element from DOM",
                            icon: <FaRegTrashCan className="text-red-500" />,
                            value: "delete",
                        },
                    ]}
                    onSelect={(selectedValue) => {
                        if (selectedValue !== "delete") {
                            dispatch({
                                type: ActionTypes.ADD_CONTENT_BLOCK,
                                payload: {
                                    sectionId,
                                    targetBlockId: blockId,
                                    blockType: selectedValue,
                                },
                            });
                        } else {
                            dispatch({
                                type: ActionTypes.REMOVE_BLOCK,
                                payload: {
                                    sectionId,
                                    targetBlockId: blockId,
                                },
                            });
                        }

                        setIsMenuOpen(false);
                    }}
                />
            </Modal>
        </div>
    );
};

export default ParagraphBlock;
