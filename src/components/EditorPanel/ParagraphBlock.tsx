import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import { BlockProps } from "@/types/props";
import WorkSpaceTextarea from "../UI/WorkSpaceTextarea";

const ParagraphBlock = ({ sectionId, blockId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];

    if (block.type !== "paragraph") return null;

    return (
        <div>
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
        </div>
    );
};

export default ParagraphBlock;
