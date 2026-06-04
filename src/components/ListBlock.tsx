import { BlockProps } from "@/types/props";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";

const ListBlock = ({ sectionId, blockId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];

    if (block.type !== "list") return null;

    return (
        <div>
            {block.items.map((item, itemIdx) => (
                <input
                    type="text"
                    value={item.text}
                    key={itemIdx}
                    // onChange={(e) =>
                    //     dispatch({
                    //         type: ActionTypes.UPDATE_LIST_ITEM,
                    //         sectionId,
                    //         blockId,
                    //         value: e.target.value,
                    //         itemIdx,
                    //     })
                    // }
                />
            ))}
        </div>
    );
};

export default ListBlock;
