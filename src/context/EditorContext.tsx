"use client";

import { useContext, createContext, useReducer, useEffect } from "react";
import { reducer, initialState } from "@/reducer/EditorReducer";
import { EditorContextType } from "@/types/context";
import { ActionTypes } from "@/types/actions";

const EditorContext = createContext<EditorContextType | null>(null);
const STORAGE_KEY = "morphix_editor_state";

export function EditorProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                dispatch({
                    type: ActionTypes.LOAD_STORAGE_STATE,
                    payload: parsed,
                });
            } catch (e) {
                console.error("Failed to parse saved workspace state:", e);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }, [state]);

    return (
        <EditorContext.Provider value={{ state, dispatch }}>
            {children}
        </EditorContext.Provider>
    );
}

export function useEditor(): EditorContextType {
    const context = useContext(EditorContext);
    if (!context) throw new Error("useEditor must be within EditorProvider");

    return context;
}
