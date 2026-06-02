import { document } from "@/types/document";
import { Actions, ActionTypes } from "@/types/actions";

export function reducer(state: document, action: Actions) {
    switch (action.type) {
        case ActionTypes.LOAD:
            return action.payload;

        case ActionTypes.UPPDATE_TOPIC_TITLE:
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
                                text: action.value,
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
                                text: action.value,
                            },
                        },
                    },
                },
            };
    }
}

export const initialState: document = {
    documentTitle: "",
    sections: {},
    sectionOrder: [],
};
