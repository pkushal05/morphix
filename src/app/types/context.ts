import { document } from "./document";
import { Actions } from "./actions";
import { Dispatch } from "react";

export interface EditorContextType {
    state: document;
    dispatch: Dispatch<Actions>;
}
