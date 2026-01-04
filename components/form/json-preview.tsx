"use client";

import { usePrompt } from "@/context/prompt-context";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import React from "react";

export function JSONPreview() {
    const { state } = usePrompt();
    const [copied, setCopied] = React.useState(false);

    // Filter out empty sections/fields for cleaner output
    const cleanState = React.useMemo(() => {
        const sections: Record<string, any> = {};
        Object.entries(state.sections).forEach(([key, fields]) => {
            const activeFields: Record<string, string[]> = {};
            let hasContent = false;
            Object.entries(fields).forEach(([fieldId, values]) => {
                if (values && values.length > 0) {
                    activeFields[fieldId] = values;
                    hasContent = true;
                }
            });
            if (hasContent) {
                sections[key] = activeFields;
            }
        });
        return {
            media_type: state.mediaType,
            prompt: sections,
        };
    }, [state]);

    const handleCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(cleanState, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="sticky top-6 h-[calc(100vh-3rem)] flex flex-col">
            <div className="flex items-center justify-between mb-2">
                <h3 className="font-mono text-xl font-bold uppercase">Prompt JSON</h3>
                <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-3 py-1 bg-primary text-primary-foreground font-mono text-sm border-2 border-transparent hover:border-black dark:hover:border-white shadow-brutal-sm hover:translate-y-[2px] hover:shadow-none active:translate-y-[4px] transition-all"
                >
                    {copied ? "Copied!" : <><Copy className="w-4 h-4" /> Copy</>}
                </button>
            </div>
            <div className="flex-1 rounded-sm border-4 border-black dark:border-white bg-card p-4 overflow-auto shadow-brutal font-mono text-sm">
                <pre className="whitespace-pre-wrap break-all text-foreground">
                    {/* Custom JSON Rendering with Highlights */}
                    <div className="font-mono text-sm leading-relaxed">
                        <span>{"{"}</span>
                        <div className="pl-4">
                            <span className="opacity-50">"media_type"</span>: <span className="text-green-600 dark:text-green-400">"{cleanState.media_type}"</span>,
                        </div>
                        <div className="pl-4">
                            <span className="opacity-50">"prompt"</span>: <span>{"{"}</span>
                            <div className="pl-4 flex flex-col gap-1 my-1">
                                {Object.entries(cleanState.prompt).map(([key, value], index, arr) => {
                                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                                    const { SECTIONS } = require("@/lib/section-data");
                                    const sectionConfig = SECTIONS.find((s: any) => s.id === key);
                                    const colorVar = sectionConfig ? sectionConfig.color : 'section-scene';

                                    return (
                                        <div
                                            key={key}
                                            style={{ backgroundColor: `hsl(var(--${colorVar}) / 0.15)` }}
                                            className="rounded px-2 py-0.5 -mx-2 w-fit"
                                        >
                                            <span className="opacity-70">"{key}"</span>: {JSON.stringify(value)}
                                            {index < arr.length - 1 ? "," : ""}
                                        </div>
                                    );
                                })}
                            </div>
                            <span>{"}"}</span>
                        </div>
                        <span>{"}"}</span>

                        {/* Fallback for empty state or to show structure clearly if empty */}
                        {Object.keys(cleanState.prompt).length === 0 && (
                            <div className="text-muted-foreground italic mt-2">
                                // Add details to see JSON structure
                            </div>
                        )}
                    </div>
                </pre>
            </div>
        </div>
    );
}
