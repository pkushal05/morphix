import { document, ActionTypes } from "@/types/document";
import { ActionDispatch } from "react";

type Action =
    | { type: ActionTypes.LOAD; payload: document }
    | {
          type: ActionTypes.UPDATE_HEADING;
          value: string;
          sectionIdx: number;
          blockIdx: number;
      }
    | {
          type: ActionTypes.UPPDATE_TOPIC_TITLE;
          value: string;
          sectionIdx: number;
      };

export function reducer(state: document, action: ActionDispatch<[]>) {
    switch (action.type) {
        case "LOAD":
            return action.payload;

        case "UPDATE_HEADING":
            return { ...state, title: action.value };
    }
}

export const initialState: document = {
    sections: [],
};
