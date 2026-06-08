import { BlockProps } from "@/types/props";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";

const HeadingBlock = ({ sectionId, blockId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];

    if (block.type !== "heading") return;

    return (
        <div>
            <input
                type="text"
                value={block.text}
                onChange={(e) =>
                    dispatch({
                        type: ActionTypes.UPDATE_HEADING,
                        sectionId,
                        blockId,
                        value: e.target.value,
                    })
                }
            />
        </div>
    );
};

export default HeadingBlock;
