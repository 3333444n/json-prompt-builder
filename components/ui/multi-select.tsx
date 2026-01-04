"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Check, X, Plus } from "lucide-react";
import { SectionId } from "@/types/prompt";

interface MultiSelectProps {
    sectionId: SectionId;
    label: string;
    options: string[];
    selected: string[];
    onChange: (values: string[]) => void;
    allowCustom?: boolean;
}

export function MultiSelect({
    sectionId,
    label,
    options,
    selected,
    onChange,
    allowCustom = false,
}: MultiSelectProps) {
    const [customValue, setCustomValue] = React.useState("");
    const [isOpen, setIsOpen] = React.useState(false);

    // Dynamic keys for Tailwind classes based on sectionId
    // Note: These must be safelisted or used in a way Tailwind detects them if strictly relying on class names.
    // Since we defined CSS variables, we can use style attributes or generic utility classes mapped in globals.css.
    // However, for cleaner code, we'll use the CSS variables we defined: --section-[id]

    const toggleOption = (option: string) => {
        if (selected.includes(option)) {
            onChange(selected.filter((item) => item !== option));
        } else {
            onChange([...selected, option]);
        }
    };

    const handleAddCustom = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (customValue.trim() && !selected.includes(customValue.trim())) {
            onChange([...selected, customValue.trim()]);
            setCustomValue("");
        }
    };

    // We use style to inject the dynamic variable for the specific component instance
    // This allows us to use one generic class that looks up the variable.
    const sectionStyle = {
        "--current-section": `var(--section-${sectionId})`,
        "--current-section-foreground": `var(--section-${sectionId}-foreground)`,
        "--current-section-muted": `var(--section-${sectionId}-muted)`,
    } as React.CSSProperties;

    return (
        <div className="w-full mb-6" style={sectionStyle}>
            <label className="block text-sm font-mono uppercase tracking-wider mb-2 font-bold opacity-70">
                {label}
            </label>

            <div className="flex flex-wrap gap-2 mb-3">
                {selected.map((item) => (
                    <button
                        key={item}
                        onClick={() => toggleOption(item)}
                        className={cn(
                            "group flex items-center gap-1.5 px-3 py-1 text-sm font-medium border-2 transition-all shadow-brutal-sm hover:translate-y-0.5 hover:shadow-none",
                            // Active State: Solid color
                            "bg-[hsl(var(--current-section))] text-[hsl(var(--current-section-foreground))] border-black dark:border-white"
                        )}
                    >
                        {item}
                        <X className="w-3 h-3" />
                    </button>
                ))}
            </div>

            <div className={cn(
                "relative rounded-none border-2 border-border bg-card shadow-brutal focus-within:shadow-none focus-within:translate-x-[2px] focus-within:translate-y-[2px] transition-all"
            )}>
                <div className="flex flex-wrap gap-2 p-3 max-h-60 overflow-y-auto">
                    {options.map((option) => {
                        const isSelected = selected.includes(option);
                        if (isSelected) return null; // Don't show already selected in the list to save space? Or stick to standard?
                        // User asked for "fields to be shades". Let's use muted for unselected.
                        return (
                            <button
                                key={option}
                                onClick={() => toggleOption(option)}
                                className={cn(
                                    "px-2 py-1 text-xs font-mono border border-transparent hover:border-border transition-colors text-left",
                                    "hover:bg-[hsl(var(--current-section-muted))] hover:text-foreground"
                                )}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>

                {allowCustom && (
                    <form onSubmit={handleAddCustom} className="flex items-center gap-2 border-t-2 border-border p-2 bg-muted/20">
                        <input
                            type="text"
                            value={customValue}
                            onChange={(e) => setCustomValue(e.target.value)}
                            placeholder="Add custom..."
                            className="flex-1 bg-transparent text-sm active:outline-none focus:outline-none font-mono"
                        />
                        <button type="submit" disabled={!customValue.trim()} className="p-1 hover:bg-[hsl(var(--current-section))] hover:text-white transition-colors">
                            <Plus className="w-4 h-4" />
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
