"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import { SectionId } from "@/types/prompt";
import { motion, AnimatePresence } from "framer-motion";

interface SectionProps {
    id: SectionId;
    title: string;
    isOpen?: boolean;
    children: React.ReactNode;
}

export function Section({ id, title, isOpen: defaultOpen = true, children }: SectionProps) {
    const [isOpen, setIsOpen] = React.useState(defaultOpen);

    const sectionStyle = {
        "--current-section": `var(--section-${id})`,
        "--current-section-foreground": `var(--section-${id}-foreground)`,
    } as React.CSSProperties;

    return (
        <div className="border-b-4 border-border last:border-0" style={sectionStyle}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "w-full flex items-center justify-between p-6 text-left transition-colors",
                    "hover:bg-[hsl(var(--current-section))] hover:text-[hsl(var(--current-section-foreground))]",
                    isOpen ? "bg-[hsl(var(--current-section))] text-[hsl(var(--current-section-foreground))]" : "bg-card text-card-foreground"
                )}
            >
                <h2 className="text-2xl font-black uppercase tracking-tighter">{title}</h2>
                {isOpen ? <ChevronUp className="w-6 h-6 border-2 border-current shadow-brutal-sm" /> : <ChevronDown className="w-6 h-6 border-2 border-current" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 bg-card/50 backdrop-blur-sm">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
