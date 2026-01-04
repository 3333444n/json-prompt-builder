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
                    {JSON.stringify(cleanState, null, 2)}
                </pre>
            </div>
        </div>
    );
}
