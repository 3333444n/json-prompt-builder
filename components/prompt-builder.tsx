"use client";

import React, { useState } from "react";
import { usePrompt } from "@/context/prompt-context";
import { SECTIONS } from "@/lib/section-data";
import { MediaTypeToggle } from "./form/media-type-toggle";
import { Section } from "./ui/section";
import { MultiSelect } from "./ui/multi-select";
import { JSONPreview } from "./form/json-preview";
import { TextPreview } from "./form/text-preview";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";
import { FileCode, FileText } from "lucide-react";

export function PromptBuilder() {
    const { state, updateField } = usePrompt();
    const [viewMode, setViewMode] = useState<"json" | "text">("text");

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen bg-background text-foreground">
            {/* Left Column: Form */}
            <div className="p-4 md:p-8 lg:p-12 border-r-4 border-black dark:border-border overflow-y-auto">
                <header className="mb-12 flex justify-between items-start">
                    <div>
                        <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter uppercase">Prompt Maker</h1>
                        <p className="font-mono text-sm md:text-base opacity-70">
                            Generate detailed JSON prompts for AI image and video generation.
                            Select a media type and configure your scene.
                        </p>
                    </div>
                    <ThemeToggle />
                </header>

                <MediaTypeToggle />

                <div className="space-y-8">
                    {SECTIONS.filter(section => section.visibleFor.includes(state.mediaType)).map((section) => (
                        <Section key={section.id} id={section.id} title={section.label}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {section.fields.map((field) => (
                                    <div key={field.id} className="col-span-1">
                                        {field.type === 'textarea' ? (
                                            <div
                                                className="w-full mb-6"
                                                style={{
                                                    "--current-section": `var(--section-${section.id})`,
                                                    "--current-section-foreground": `var(--section-${section.id}-foreground)`,
                                                    "--current-section-muted": `var(--section-${section.id}-muted)`,
                                                } as React.CSSProperties}
                                            >
                                                <label className="block text-sm font-mono uppercase tracking-wider mb-2 font-bold opacity-70">
                                                    {field.label}
                                                </label>
                                                <textarea
                                                    className="w-full p-3 bg-card border-2 border-border font-mono text-sm shadow-brutal focus:outline-none focus:shadow-none focus:translate-x-[2px] focus:translate-y-[2px] transition-all min-h-[120px] resize-y placeholder:text-muted-foreground/50"
                                                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                                                    value={state.sections[section.id as keyof typeof state.sections]?.[field.id]?.[0] || ""}
                                                    onChange={(e) => updateField(section.id, field.id, [e.target.value])}
                                                />
                                            </div>
                                        ) : (
                                            <MultiSelect
                                                sectionId={section.id}
                                                label={field.label}
                                                options={field.options}
                                                allowCustom={true}
                                                selected={state.sections[section.id as keyof typeof state.sections]?.[field.id] || []}
                                                onChange={(values) => updateField(section.id, field.id, values)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </Section>
                    ))}
                </div>
            </div>

            {/* Right Column: Key Output */}
            <div className="p-4 md:p-8 lg:p-12 bg-muted/20 hidden lg:block relative">
                <div className="absolute top-8 right-8 z-10 flex gap-2">
                    <button
                        onClick={() => setViewMode("text")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 font-mono font-bold text-sm border-2 border-black dark:border-white transition-all shadow-brutal",
                            viewMode === "text"
                                ? "bg-black text-white dark:bg-white dark:text-black translate-x-[2px] translate-y-[2px] shadow-none"
                                : "bg-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                        )}
                    >
                        <FileText className="w-4 h-4" />
                        Text
                    </button>
                    <button
                        onClick={() => setViewMode("json")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 font-mono font-bold text-sm border-2 border-black dark:border-white transition-all shadow-brutal",
                            viewMode === "json"
                                ? "bg-black text-white dark:bg-white dark:text-black translate-x-[2px] translate-y-[2px] shadow-none"
                                : "bg-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                        )}
                    >
                        <FileCode className="w-4 h-4" />
                        JSON
                    </button>
                </div>

                <div className="pt-16">
                    {viewMode === "json" ? <JSONPreview /> : <TextPreview />}
                </div>
            </div>

            {/* Mobile Preview */}
            <div className="p-4 md:p-8 bg-muted/20 lg:hidden border-t-4 border-black dark:border-border">
                <div className="flex gap-2 mb-4 justify-end">
                    <button
                        onClick={() => setViewMode("text")}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1 font-mono font-bold text-xs border-2 border-black dark:border-white transition-all shadow-brutal-sm",
                            viewMode === "text"
                                ? "bg-black text-white dark:bg-white dark:text-black translate-x-[2px] translate-y-[2px] shadow-none"
                                : "bg-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                        )}
                    >
                        <FileText className="w-3 h-3" />
                        Text
                    </button>
                    <button
                        onClick={() => setViewMode("json")}
                        className={cn(
                            "flex items-center gap-2 px-3 py-1 font-mono font-bold text-xs border-2 border-black dark:border-white transition-all shadow-brutal-sm",
                            viewMode === "json"
                                ? "bg-black text-white dark:bg-white dark:text-black translate-x-[2px] translate-y-[2px] shadow-none"
                                : "bg-card hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
                        )}
                    >
                        <FileCode className="w-3 h-3" />
                        JSON
                    </button>
                </div>
                {viewMode === "json" ? <JSONPreview /> : <TextPreview />}
            </div>
        </div>
    );
}
