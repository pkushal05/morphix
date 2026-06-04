import { document } from "@/types/document";

export enum ActionTypes {
    LOAD = "load",
    UPPDATE_TOPIC_TITLE = "update_topic_title",
    UPDATE_HEADING = "update_heading",
    UPDATE_PARAGRAPH = "update_paragraph",
    UPDATE_LIST_ITEM = "update_list_item",
}

type LoadAction = { type: ActionTypes.LOAD; payload: document };

type UpdateHeadingAction = {
    type: ActionTypes.UPDATE_HEADING;
    value: string;
    sectionId: number;
    blockId: number;
};

type UpdateTopicTitleAction = {
    type: ActionTypes.UPPDATE_TOPIC_TITLE;
    value: string;
    sectionId: number;
};

type UpdateParagraphAction = {
    type: ActionTypes.UPDATE_PARAGRAPH;
    value: string;
    sectionId: number;
    blockId: number;
};

type UpdateListItemAction = {
    type: ActionTypes.UPDATE_LIST_ITEM;
    value: string;
    sectionId: number;
    blockId: number;
    itemIdx: number;
};

export type Actions =
    | LoadAction
    | UpdateHeadingAction
    | UpdateParagraphAction
    | UpdateTopicTitleAction
    | UpdateListItemAction;
