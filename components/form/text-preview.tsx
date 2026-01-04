"use client";

import { usePrompt } from "@/context/prompt-context";
import { Copy } from "lucide-react";
import React from "react";

export function TextPreview() {
    const { state } = usePrompt();
    const [copied, setCopied] = React.useState(false);

    const promptText = React.useMemo(() => {
        const parts: string[] = [];

        // 1. Scene Description (This is usually the main subject/setting)
        const sceneDesc = state.sections.scene?.description?.[0];
        if (sceneDesc) {
            parts.push(sceneDesc);
        }

        // 2. Iterate other sections
        const excludedSections = ["scene"]; // Handled separately (description) or just regular iteration

        // Helper to format values
        const formatValues = (values: string[]) => values.join(", ");

        // Order matters for a good prompt
        const outputOrder = [
            // "scene" fields like atmosphere, time_period etc. are good to have early
            "scene",
            "character",
            "action",
            "clothing",
            "pose",
            "place",
            "lighting",
            "cinematography",
            "palette",
            "cameraMotion",
            "sound",
            "speech"
        ];

        outputOrder.forEach(sectionId => {
            const sectionData = state.sections[sectionId as keyof typeof state.sections];
            if (!sectionData) return;

            const sectionParts: string[] = [];

            Object.entries(sectionData).forEach(([fieldId, values]) => {
                if (!values || values.length === 0) return;

                // Skip the description field as we handled it first (if it's the scene section)
                if (sectionId === "scene" && fieldId === "description") return;

                // For speech/actual_speech, maybe we want quotes?
                if (sectionId === "speech" && fieldId === "actual_speech") {
                    sectionParts.push(`"${values[0]}"`);
                    return;
                }

                sectionParts.push(formatValues(values));
            });

            if (sectionParts.length > 0) {
                parts.push(sectionParts.join(", "));
            }
        });

        // Prefix with media type
        const prefix = state.mediaType === "photo" ? "A photograph of" : "A video of";

        // Check if we have a scene description to attach natural language to
        let finalPrompt = "";

        if (sceneDesc) {
            finalPrompt = `${prefix} ${parts.join(", ")}`;
        } else {
            // If no main description, just list the attributes
            finalPrompt = `${prefix} ${parts.join(", ")}`;
        }

        // Clean up double commas or empty spaces just in case
        return finalPrompt.replace(/, ,/g, ",").trim();
    }, [state]);

    const handleCopy = () => {
        navigator.clipboard.writeText(promptText);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="sticky top-6 h-[calc(100vh-3rem)] flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-mono text-xl font-bold uppercase">Prompt Text</h3>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground font-mono text-sm border-2 border-transparent hover:border-black dark:hover:border-white shadow-brutal-sm hover:translate-y-[2px] hover:shadow-none active:translate-y-[4px] transition-all"
                >
                    {copied ? "Copied!" : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
            </div>
            <div className="flex-1 rounded-sm border-4 border-black dark:border-white bg-card p-4 overflow-auto shadow-brutal font-mono text-lg leading-relaxed">
                <p className="whitespace-pre-wrap text-foreground">
                    {promptText}
                </p>
            </div>
        </div>
    );
}
