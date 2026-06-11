import { BlockProps } from "@/types/props";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import WorkspaceInput from "../UI/WorkSpaceInput";

const HeadingBlock = ({ sectionId, blockId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];

    if (block.type !== "heading") return;

    return (
        <div>
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
        </div>
    );
};

export default HeadingBlock;
