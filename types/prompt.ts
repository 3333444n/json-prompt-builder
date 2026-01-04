export type SectionId =
    | "scene"
    | "character"
    | "cinematography"
    | "pose"
    | "clothing"
    | "lighting"
    | "place"
    | "palette"
    | "cameraMotion"
    | "action"
    | "sound"
    | "speech"
    | "references";

export type MediaType = "photo" | "video";

export type PromptState = {
    mediaType: MediaType;
    sections: Record<SectionId, Record<string, string[]>>;
};

export type SectionConfig = {
    id: SectionId;
    label: string;
    color: string; // Tailwind class partial, e.g. "section-character"
    fields: FieldConfig[];
    visibleFor: MediaType[];
};

export type FieldConfig = {
    id: string;
    label: string;
    options: string[];
    allowCustom?: boolean;
    type?: "select" | "textarea" | "dynamic_list";
};

export const INITIAL_STATE: PromptState = {
    mediaType: "photo",
    sections: {
        scene: {},
        character: {},
        cinematography: {},
        pose: {},
        clothing: {},
        lighting: {},
        place: {},
        palette: {},
        cameraMotion: {},
        action: {},
        sound: {},
        speech: {},
        references: {},
    },
};
