"use client";

import React from "react";
import { usePrompt } from "@/context/prompt-context";
import { SECTIONS } from "@/lib/section-data";
import { MediaTypeToggle } from "./form/media-type-toggle";
import { Section } from "./ui/section";
import { MultiSelect } from "./ui/multi-select";
import { JSONPreview } from "./form/json-preview";
import { ThemeToggle } from "./theme-toggle";
import { cn } from "@/lib/utils";

export function PromptBuilder() {
    const { state, updateField } = usePrompt();

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
                                        <MultiSelect
                                            sectionId={section.id}
                                            label={field.label}
                                            options={field.options}
                                            allowCustom={true}
                                            selected={state.sections[section.id]?.[field.id] || []}
                                            onChange={(values) => updateField(section.id, field.id, values)}
                                        />
                                    </div>
                                ))}
                            </div>
                        </Section>
                    ))}
                </div>
            </div>

            {/* Right Column: JSON Output */}
            <div className="p-4 md:p-8 lg:p-12 bg-muted/20 hidden lg:block">
                <JSONPreview />
            </div>

            {/* Mobile JSON Preview: Could be a drawer or just stacked. 
          For now, hiding on mobile until a better "toggle" solution or if user requests it. 
          But requirement said "2 columns", implying desktop focus. 
          Let's add a button to view JSON on mobile later if needed.
          For now, let's just make it appear at bottom on mobile via generic css.
      */}
            <div className="p-4 md:p-8 bg-muted/20 lg:hidden border-t-4 border-black dark:border-border">
                <JSONPreview />
            </div>
        </div>
    );
}
