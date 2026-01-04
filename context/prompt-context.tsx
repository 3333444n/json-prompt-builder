"use client";

import React, { createContext, useContext, useReducer } from "react";
import { MediaType, PromptState, SectionId, INITIAL_STATE } from "@/types/prompt";

type PromptAction =
    | { type: "SET_MEDIA_TYPE"; payload: MediaType }
    | { type: "UPDATE_FIELD"; payload: { sectionId: SectionId; fieldId: string; values: string[] } }
    | { type: "RESET" };

const promptReducer = (state: PromptState, action: PromptAction): PromptState => {
    switch (action.type) {
        case "SET_MEDIA_TYPE":
            return { ...state, mediaType: action.payload };
        case "UPDATE_FIELD":
            return {
                ...state,
                sections: {
                    ...state.sections,
                    [action.payload.sectionId]: {
                        ...state.sections[action.payload.sectionId],
                        [action.payload.fieldId]: action.payload.values,
                    },
                },
            };
        case "RESET":
            return INITIAL_STATE;
        default:
            return state;
    }
};

type PromptContextType = {
    state: PromptState;
    dispatch: React.Dispatch<PromptAction>;
    updateField: (sectionId: SectionId, fieldId: string, values: string[]) => void;
    setMediaType: (type: MediaType) => void;
};

const PromptContext = createContext<PromptContextType | undefined>(undefined);

export function PromptProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(promptReducer, INITIAL_STATE);

    const updateField = (sectionId: SectionId, fieldId: string, values: string[]) => {
        dispatch({ type: "UPDATE_FIELD", payload: { sectionId, fieldId, values } });
    };

    const setMediaType = (type: MediaType) => {
        dispatch({ type: "SET_MEDIA_TYPE", payload: type });
    };

    return (
        <PromptContext.Provider value={{ state, dispatch, updateField, setMediaType }}>
            {children}
        </PromptContext.Provider>
    );
}

export function usePrompt() {
    const context = useContext(PromptContext);
    if (context === undefined) {
        throw new Error("usePrompt must be used within a PromptProvider");
    }
    return context;
}
