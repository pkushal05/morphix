import { BlockProps } from "@/types/props";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import WorkSpaceListInput from "../UI/WorkSpaceListInput";
import { useRef, useState } from "react";

const ListBlock = ({ sectionId, blockId }: BlockProps) => {
    const { state, dispatch } = useEditor();
    const block = state.sections[sectionId].contents[blockId];
    

    if (block.type !== "list") return null;

    return (
        <div>
            <WorkSpaceListInput
                items={block.items}
                onChange={(updatedItems) => {
                    const updatedIndex = updatedItems.findIndex(
                        (item, idx) => item.text !== block.items[idx]?.text,
                    );
                    if (updatedIndex === -1) return;
                    dispatch({
                        type: ActionTypes.UPDATE_LIST_ITEM,
                        sectionId,
                        blockId,
                        itemIdx: updatedIndex,
                        value: updatedItems[updatedIndex].text,
                    });
                }}
            />
        </div>
    );
};

export default ListBlock;
