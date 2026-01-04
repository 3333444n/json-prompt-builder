"use client";

import React from "react";
import { usePrompt } from "@/context/prompt-context";
import { cn } from "@/lib/utils";
import { Clapperboard, Smartphone } from "lucide-react";

export function PresetsPanel() {
    const { updateField } = usePrompt();

    const applyCinematic = () => {
        updateField("cinematography", "shot_type", ["Wide Angle"]);
        updateField("cinematography", "camera", ["Arri Alexa"]);
        updateField("cinematography", "lighting_style", ["Cinematic"]);
        updateField("cinematography", "film_stock", ["Kodak Portra 400"]);
    };

    const applyUGC = () => {
        updateField("cinematography", "shot_type", ["Selfie"]);
        updateField("cinematography", "camera", ["iPhone"]);
        updateField("cinematography", "lighting_style", ["Natural"]);
        updateField("clothing", "style", ["Casual"]);
    };

    const buttonClass = "flex items-center gap-3 px-4 py-3 border-2 border-black dark:border-white shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all bg-card text-left group w-full";

    return (
        <div className="mb-8">
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-3 opacity-70">
                Quick Presets
            </h3>
            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={applyCinematic}
                    className={buttonClass}
                >
                    <div className="p-2 bg-yellow-400 border-2 border-black rounded-full shrink-0">
                        <Clapperboard className="w-4 h-4 text-black" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold font-mono uppercase text-sm truncate">Cinematic</div>
                        <div className="text-[10px] md:text-xs opacity-70 font-mono truncate">Arri Alexa, Wide...</div>
                    </div>
                </button>

                <button
                    onClick={applyUGC}
                    className={buttonClass}
                >
                    <div className="p-2 bg-blue-400 border-2 border-black rounded-full shrink-0">
                        <Smartphone className="w-4 h-4 text-black" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold font-mono uppercase text-sm truncate">UGC</div>
                        <div className="text-[10px] md:text-xs opacity-70 font-mono truncate">iPhone, Selfie...</div>
                    </div>
                </button>
            </div>
        </div>
    );
}
