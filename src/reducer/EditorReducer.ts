import {
    document,
    topic,
    HeadingBlock,
    contentBlock,
    ParagraphBlock,
    ListBlock,
} from "@/types/document";
import { Actions, ActionTypes } from "@/types/actions";
import { text } from "stream/consumers";
export function reducer(state: document, action: Actions): document {
    switch (action.type) {
        case ActionTypes.LOAD_STATE:
            return action.payload;

        case ActionTypes.LOAD_STORAGE_STATE:
            return action.payload;

        case ActionTypes.UPDATE_TOPIC_TITLE:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    [action.sectionId]: {
                        ...state.sections[action.sectionId],
                        title: {
                            ...state.sections[action.sectionId].title,
                            text: action.value,
                        },
                    },
                },
            };

        case ActionTypes.UPDATE_PARAGRAPH: {
            const section = state.sections[action.sectionId];
            const targetBlock = section?.contents?.[action.blockId];

            if (!section || !targetBlock) return state;

            return {
                ...state,
                sections: {
                    ...state.sections,
                    [action.sectionId]: {
                        ...section,
                        contents: {
                            ...section.contents,
                            [action.blockId]: {
                                ...targetBlock,
                                ...(targetBlock.type !== "list" && {
                                    text: action.value,
                                }),
                            },
                        },
                    },
                },
            };
        }

        case ActionTypes.UPDATE_HEADING: {
            const section = state.sections[action.sectionId];
            const targetBlock = section?.contents?.[action.blockId];

            if (!section || !targetBlock) return state;

            return {
                ...state,
                sections: {
                    ...state.sections,
                    [action.sectionId]: {
                        ...section,
                        contents: {
                            ...section.contents,
                            [action.blockId]: {
                                ...targetBlock,
                                ...(targetBlock.type !== "list" && {
                                    text: action.value,
                                }),
                            },
                        },
                    },
                },
            };
        }

        case ActionTypes.UPDATE_LIST_ITEM: {
            const section = state.sections[action.sectionId];
            const targetBlock = section?.contents?.[action.blockId];

            if (!targetBlock || targetBlock.type !== "list") return state;

            const updateItems = [...targetBlock.items];
            updateItems[action.itemIdx] = {
                ...updateItems[action.itemIdx],
                text: action.value,
            };

            return {
                ...state,
                sections: {
                    ...state.sections,
                    [action.sectionId]: {
                        ...section,
                        contents: {
                            ...section.contents,
                            [action.blockId]: {
                                ...targetBlock,
                                items: updateItems,
                            },
                        },
                    },
                },
            };
        }

        case ActionTypes.ADD_SECTION: {
            const { targetSectionId } = action.payload;
            const newSectionId = crypto.randomUUID();

            const newSection: topic = {
                title: {
                    type: "heading",
                    level: 1,
                    text: "",
                },
                contents: {},
                contentOrder: [],
            };

            const currentIndex = state.sectionOrder.indexOf(targetSectionId);
            const newSectionOrder = [...state.sectionOrder];
            newSectionOrder.splice(currentIndex + 1, 0, newSectionId);

            return {
                ...state,
                sections: {
                    ...state.sections,
                    [newSectionId]: newSection,
                },
                sectionOrder: newSectionOrder,
            };
        }

        case ActionTypes.ADD_CONTENT_BLOCK: {
            const { sectionId, targetBlockId, blockType } = action.payload;
            const section = state.sections[sectionId];

            const newBlockId = crypto.randomUUID();

            let newBlock: contentBlock;
            if (blockType === "heading") {
                newBlock = {
                    type: "heading",
                    level: 2,
                    text: "",
                } as HeadingBlock;
            } else if (blockType === "paragraph") {
                newBlock = {
                    type: "paragraph",
                    text: "",
                } as ParagraphBlock;
            } else {
                newBlock = {
                    type: "list",
                    ordered: false,
                    items: [{ text: "" }],
                } as ListBlock;
            }

            const currentIndex = section.contentOrder.indexOf(targetBlockId);
            const newContentOrder = [...section.contentOrder];
            newContentOrder.splice(currentIndex + 1, 0, newBlockId);

            return {
                ...state,
                sections: {
                    ...state.sections,
                    [sectionId]: {
                        ...section,
                        contents: {
                            ...section.contents,
                            [newBlockId]: newBlock,
                        },
                        contentOrder: newContentOrder,
                    },
                },
            };
        }

        default:
            return state;
    }
}

export const initialState: document = {
    documentTitle: "",
    sections: {},
    sectionOrder: [],
};
