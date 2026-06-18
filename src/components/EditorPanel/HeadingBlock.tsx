import { BlockProps } from "@/types/props";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import WorkspaceInput from "../UI/WorkSpaceInput";
import { GoPlus } from "react-icons/go";
import { useState } from "react";
import { Modal } from "../UI/Modal";
import { AddBlockModal } from "../UI/AddBlockModal";
import { LuHeading } from "react-icons/lu";
import { CiTextAlignLeft } from "react-icons/ci";
import { IoIosList } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

const HeadingBlock = ({ sectionId, blockId }: BlockProps) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];

    if (block.type !== "heading") return;

    return (
        <div className="flex items-center group">
            <WorkspaceInput
                value={block.text}
                onChange={(e) =>
                    dispatch({
                        type: ActionTypes.UPDATE_HEADING,
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
                        dispatch({
                            type: ActionTypes.ADD_CONTENT_BLOCK,
                            payload: {
                                sectionId,
                                targetBlockId: blockId,
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

export default HeadingBlock;
