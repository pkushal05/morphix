import { document } from "./document";

enum ActionTypes {
    LOAD = "load",
    UPPDATE_TOPIC_TITLE = "update_topic_title",
    UPDATE_HEADING = "update_heading",
    UPDATE_PARAGRAPH = "update_paragraph",
    UPDATE_LIST_ITEM = "update_list_item",
}

type Load = { type: ActionTypes.LOAD; payload: document };
