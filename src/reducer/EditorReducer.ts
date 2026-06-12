import { document } from "@/types/document";
import { Actions, ActionTypes } from "@/types/actions";

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

        default:
            return state;
    }
}

export const initialState: document = {
    documentTitle: "",
    sections: {},
    sectionOrder: [],
};
