import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import { BlockProps } from "@/types/props";

const ParagraphBlock = ({ sectionId, blockId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];

    if (block.type !== "paragraph") return null;

    return (
        <div>
            <textarea
                value={block.text}
                onChange={(e) =>
                    dispatch({
                        type: ActionTypes.UPDATE_PARAGRAPH,
                        sectionId,
                        blockId,
                        value: e.target.value,
                    })
                }
            />
        </div>
    );
};

export default ParagraphBlock;
