"use client";

import React, { useState } from "react";
import { usePrompt } from "@/context/prompt-context";
import { SECTIONS } from "@/lib/section-data";
import { MediaTypeToggle } from "./form/media-type-toggle";
import { PresetsPanel } from "./form/presets-panel";
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
                <PresetsPanel />

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
                                                    "--current-section": `var(--${section.color})`,
                                                    "--current-section-foreground": `var(--${section.color}-foreground)`,
                                                    "--current-section-muted": `var(--${section.color}-muted)`,
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
                                        ) : field.type === 'dynamic_list' ? (
                                            <div
                                                className="w-full mb-6"
                                                style={{
                                                    "--current-section": `var(--${section.color})`,
                                                    "--current-section-foreground": `var(--${section.color}-foreground)`,
                                                    "--current-section-muted": `var(--${section.color}-muted)`,
                                                } as React.CSSProperties}
                                            >
                                                <label className="block text-sm font-mono uppercase tracking-wider mb-4 font-bold opacity-70">
                                                    {field.label}
                                                </label>

                                                <div className="space-y-4 mb-4">
                                                    {(state.sections[section.id as keyof typeof state.sections]?.[field.id] || []).map((value, index) => (
                                                        <div key={index} className="flex gap-3 items-start p-4 border-2 border-dashed border-border/50 bg-card/50">
                                                            <div className="flex-none pt-2">
                                                                <div className="w-8 h-8 rounded-full bg-[var(--current-section)] text-[var(--current-section-foreground)] flex items-center justify-center font-bold font-mono text-xs border-2 border-black dark:border-white">
                                                                    {index + 1}
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 space-y-2">
                                                                <div className="text-xs font-mono font-bold opacity-50 uppercase">
                                                                    Image {index + 1}
                                                                </div>
                                                                <textarea
                                                                    className="w-full p-2 bg-background border-2 border-border font-mono text-sm shadow-sm focus:outline-none focus:border-[var(--current-section)] transition-all min-h-[80px] resize-y placeholder:text-muted-foreground/50"
                                                                    placeholder="Describe how this reference is used..."
                                                                    value={value}
                                                                    onChange={(e) => {
                                                                        const currentValues = state.sections[section.id as keyof typeof state.sections]?.[field.id] || [];
                                                                        const newValues = [...currentValues];
                                                                        newValues[index] = e.target.value;
                                                                        updateField(section.id, field.id, newValues);
                                                                    }}
                                                                />
                                                            </div>
                                                            <button
                                                                onClick={() => {
                                                                    const currentValues = state.sections[section.id as keyof typeof state.sections]?.[field.id] || [];
                                                                    const newValues = currentValues.filter((_, i) => i !== index);
                                                                    updateField(section.id, field.id, newValues);
                                                                }}
                                                                className="opacity-50 hover:opacity-100 p-1 hover:bg-destructive hover:text-destructive-foreground transition-colors"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        const currentValues = state.sections[section.id as keyof typeof state.sections]?.[field.id] || [];
                                                        updateField(section.id, field.id, [...currentValues, ""]);
                                                    }}
                                                    className="w-full py-3 px-4 border-2 border-dashed border-border hover:border-[var(--current-section)] hover:bg-[var(--current-section-muted)] hover:text-[var(--current-section-foreground)] transition-all font-mono font-bold uppercase text-sm flex items-center justify-center gap-2"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
                                                    Add Reference
                                                </button>
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
