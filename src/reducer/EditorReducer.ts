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

        case ActionTypes.UPDATE_PARAGRAPH:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    [action.sectionId]: {
                        ...state.sections[action.sectionId],
                        contents: {
                            ...state.sections[action.sectionId].contents,
                            [action.blockId]: {
                                ...state.sections[action.sectionId].contents[
                                    action.blockId
                                ],
                                ...(state.sections[action.sectionId].contents[
                                    action.blockId
                                ].type !== "list" && {
                                    text: action.value,
                                }),
                            },
                        },
                    },
                },
            };

        case ActionTypes.UPDATE_HEADING:
            return {
                ...state,
                sections: {
                    ...state.sections,
                    [action.sectionId]: {
                        ...state.sections[action.sectionId],
                        contents: {
                            ...state.sections[action.sectionId].contents,
                            [action.blockId]: {
                                ...state.sections[action.sectionId].contents[
                                    action.blockId
                                ],
                                ...(state.sections[action.sectionId].contents[
                                    action.blockId
                                ].type !== "list" && {
                                    text: action.value,
                                }),
                            },
                        },
                    },
                },
            };

        default:
            return state;
    }
}

export const initialState: document = {
    documentTitle: "",
    sections: {},
    sectionOrder: [],
};
