"use client";

import { useContext, createContext, useReducer } from "react";
import { reducer, initialState } from "@/reducer/EditorReducer";
import { EditorContextType } from "@/types/context";

const EditorContext = createContext<EditorContextType | null>(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

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
