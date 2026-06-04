import { document } from "@/types/document";
import { Actions } from "@/types/actions";
import { Dispatch } from "react";

export interface EditorContextType {
    state: document;
    dispatch: Dispatch<Actions>;
}
