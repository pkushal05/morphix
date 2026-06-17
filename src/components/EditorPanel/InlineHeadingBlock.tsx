import { BlockProps } from "@/types/props";
import WorkspaceInput from "../UI/WorkSpaceInput";
import { useEditor } from "@/context/EditorContext";
import { ActionTypes } from "@/types/actions";
import { GoPlus } from "react-icons/go";

export const InlineHeadingBlock = ({ sectionId }: BlockProps) => {
    const { state, dispatch } = useEditor();

    const section = state.sections[sectionId];

    return (
        <div className="pb-2 flex items-center w-full group">
            <WorkspaceInput
                label="Topic:"
                variant="inline-header"
                value={section.title.text}
                onChange={(e) => {
                    dispatch({
                        type: ActionTypes.UPDATE_TOPIC_TITLE,
                        value: e.target.value,
                        sectionId: sectionId,
                    });
                }}
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
