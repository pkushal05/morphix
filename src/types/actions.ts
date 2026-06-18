import { document } from "@/types/document";

export enum ActionTypes {
    LOAD_STATE = "load",
    LOAD_STORAGE_STATE = "load_storage",
    UPDATE_TOPIC_TITLE = "update_topic_title",
    UPDATE_HEADING = "update_heading",
    UPDATE_PARAGRAPH = "update_paragraph",
    UPDATE_LIST_ITEM = "update_list_item",
    ADD_SECTION = "add_section",
    ADD_CONTENT_BLOCK = "add_content_block",
    ADD_LIST_ITEM = "add_list_item",
}

type LoadAction = { type: ActionTypes.LOAD_STATE; payload: document };

type LoadStorage = { type: ActionTypes.LOAD_STORAGE_STATE; payload: document };

type UpdateHeadingAction = {
    type: ActionTypes.UPDATE_HEADING;
    value: string;
    sectionId: string;
    blockId: string;
};

type UpdateTopicTitleAction = {
    type: ActionTypes.UPDATE_TOPIC_TITLE;
    value: string;
    sectionId: string;
};

type UpdateParagraphAction = {
    type: ActionTypes.UPDATE_PARAGRAPH;
    value: string;
    sectionId: string;
    blockId: string;
};

type UpdateListItemAction = {
    type: ActionTypes.UPDATE_LIST_ITEM;
    value: string;
    sectionId: string;
    blockId: string;
    itemIdx: number;
};

type AddSectionAfter = {
    type: ActionTypes.ADD_SECTION;
    payload: { targetSectionId: string };
};

type AddContentBlockAfter = {
    type: ActionTypes.ADD_CONTENT_BLOCK;
    payload: {
        sectionId: string;
        targetBlockId: string;
        blockType: string;
    };
};

type AddSingleListItem = {
    type: ActionTypes.ADD_LIST_ITEM;
    payload: {
        sectionId: string;
        targetBlockId: string;
        itemIdx: number;
    };
};

export type Actions =
    | LoadAction
    | LoadStorage
    | UpdateHeadingAction
    | UpdateParagraphAction
    | UpdateTopicTitleAction
    | UpdateListItemAction
    | AddSectionAfter
    | AddContentBlockAfter
    | AddSingleListItem;
