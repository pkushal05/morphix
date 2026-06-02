import { useContext, createContext, useReducer } from "react";
import { reducer, initialState } from "@/reducer/EditorReducer";

const EditorContext = createContext(null);

export function EditorProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <EditorContext.Provider value={{state, dispatch}}>{children}</EditorContext.Provider>;
}

export function useEditor() {
    return useContext(EditorContext);
}
