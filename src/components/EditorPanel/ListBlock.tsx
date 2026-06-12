import { BlockProps } from "@/types/props";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import WorkSpaceListInput from "../UI/WorkSpaceListInput";

const ListBlock = ({ sectionId, blockId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];

    if (block.type !== "list") return null;

    return (
        <div>
            <WorkSpaceListInput
                items={block.items}
                onChange={(updatedItems) => {
                    // 1. Find which specific row index was modified by the user
                    const updatedIndex = updatedItems.findIndex(
                        (item, idx) => item.text !== block.items[idx]?.text,
                    );

                    // If no changes found, break early to prevent unnecessary dispatches
                    if (updatedIndex === -1) return;

                    // 2. Dispatch using your exact UpdateListItemAction shape
                    dispatch({
                        type: ActionTypes.UPDATE_LIST_ITEM,
                        sectionId,
                        blockId,
                        itemIdx: updatedIndex,
                        value: updatedItems[updatedIndex].text, // Pass just the raw string text
                    });
                }}
            />
        </div>
    );
};

export default ListBlock;
