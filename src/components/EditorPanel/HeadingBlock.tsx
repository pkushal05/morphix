import { BlockProps } from "@/types/props";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import WorkspaceInput from "../UI/WorkSpaceInput";
import { GoPlus } from "react-icons/go";

const HeadingBlock = ({ sectionId, blockId }: BlockProps) => {
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
                    // onClick={() => handleAddBlock(index, "paragraph")}
                    title="Add Paragraph Block Below"
                    className="p-0.5 rounded text-stone-400 hover:text-green hover:bg-stone-800 transition-colors cursor-pointer"
                >
                    <GoPlus />
                </button>
            </div>
        </div>
    );
};

export default HeadingBlock;
