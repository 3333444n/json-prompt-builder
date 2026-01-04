"use client";

import React from "react";
import { usePrompt } from "@/context/prompt-context";
import { cn } from "@/lib/utils";
import { Clapperboard, Smartphone, Dices, Trash2, Film, Camera } from "lucide-react";
import { SECTIONS } from "@/lib/section-data";

export function PresetsPanel() {
    const { state, updateField, dispatch } = usePrompt();

    const applyCinematic = () => {
        updateField("cinematography", "camera", ["Arri Alexa"]);
        updateField("cinematography", "lighting_style", ["Cinematic"]);
        updateField("cinematography", "film_stock", ["Kodak Portra 400"]);
        updateField("cinematography", "photo_style", ["Cine Still", "Hyperrealistic"]);
        updateField("cinematography", "camera_angle", ["Full Shot"]);
        updateField("cinematography", "lenses", ["12mm-wide angle"]);
        updateField("cinematography", "effects", ["Bokeh", "Grain", "Depth of Field", "Halation"]);
    };

    const applyUGC = () => {
        // Scene
        updateField("scene", "atmosphere", ["Candid"]);

        // Character
        updateField("character", "skin", ["Subtle Subsurface Scattering", "Visible Pores", "Faint Asymmetry"]);

        // Pose
        updateField("pose", "type", ["Facing Camera"]);
        updateField("pose", "gaze", ["Looking at Camera"]);
        updateField("pose", "hand", ["Holding the camera"]);

        // Location
        updateField("place", "setting", ["Indoor"]);
        updateField("place", "location", ["Bedroom"]);
        updateField("place", "time", ["Morning"]);
        updateField("place", "weather", ["Sunny"]);
        updateField("place", "architecture", ["Modern"]);

        // Lighting
        updateField("lighting", "source", ["Sun", "Natural Light", "Window"]);
        updateField("lighting", "color", ["Neutral"]);
        updateField("lighting", "intensity", ["Soft"]);
        updateField("lighting", "direction", ["Side"]);
        updateField("lighting", "shadows", ["Soft"]);
        updateField("lighting", "contrast-ratio", ["2:1 Low"]);

        // Camera / Cinematography
        updateField("cinematography", "camera", ["iPhone"]);
        updateField("cinematography", "photo_style", ["UGC", "Hyperrealistic"]);
        updateField("cinematography", "camera_angle", ["Selfie", "Eye Level"]);
        updateField("cinematography", "lighting_style", ["Natural"]);
        updateField("cinematography", "lenses", ["Phone Lenses"]);
        updateField("cinematography", "film_stock", ["iPhone color"]);
        updateField("cinematography", "format", [".heic"]);

        updateField("clothing", "style", ["Casual"]);
    };

    const applyMovieStill = () => {
        updateField("scene", "atmosphere", ["Blockbuster", "Cinematic"]);
        updateField("scene", "references", ["Movie Still"]);

        updateField("cinematography", "camera", ["Arri Alexa"]);
        updateField("cinematography", "lenses", ["Anamorphic"]);
        updateField("cinematography", "film_stock", ["Kodak Vision3 500T"]);
        // Format options are specific, skipping invalid ones
        updateField("cinematography", "photo_style", ["Cine Still", "Hyperrealistic"]);
        updateField("cinematography", "lighting_style", ["Cinematic", "Volumetric"]);
        updateField("cinematography", "effects", ["Grain", "Chromatic Aberration", "Motion Blur"]);

        updateField("lighting", "color", ["Warm", "Teal"]); // Classic teal/orange if possible, or just mixed
        updateField("lighting", "shadows", ["Contrasty", "Deep"]);
        updateField("lighting", "contrast-ratio", ["5:1"]);
    };

    const applyFashion = () => {
        updateField("scene", "atmosphere", ["Editorial", "Glamorous"]);
        updateField("scene", "references", ["Vogue"]);

        updateField("cinematography", "camera", ["Phase One XF"]);
        updateField("cinematography", "lenses", ["85mm-telephoto"]);
        updateField("cinematography", "photo_style", ["Editorial", "Portrait"]);
        updateField("cinematography", "lighting_style", ["Studio", "High Key"]); // High Key is maybe not an option, check data. 'Studio' is.

        updateField("lighting", "source", ["Strobe", "Beauty Dish"]);
        updateField("lighting", "direction", ["Front", "Overhead"]); // Butterfly lighting usually overhead/front
        updateField("lighting", "shadows", ["Soft", "Short"]);

        updateField("clothing", "style", ["Haute Couture", "Luxury", "Avant-garde"]);

        updateField("character", "skin", ["Porcelain", "Glowing"]);
        updateField("pose", "type", ["Dynamic Angle", "Standing"]);
        updateField("pose", "gaze", ["Looking at Camera"]);
    };

    const applyRandom = () => {
        SECTIONS.forEach((section) => {
            // Check if section is visible for current media type
            if (section.visibleFor.includes(state.mediaType)) {
                section.fields.forEach((field) => {
                    // Only randomize fields that have options
                    if (field.options && field.options.length > 0) {
                        const randomOption = field.options[Math.floor(Math.random() * field.options.length)];
                        updateField(section.id as any, field.id, [randomOption]);
                    }
                });
            }
        });
    };

    const applyClear = () => {
        dispatch({ type: "RESET" });
    };

    const buttonClass = "flex items-center gap-3 px-4 py-3 border-2 border-black dark:border-white shadow-brutal hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all bg-card text-left group w-full";

    return (
        <div className="mb-8">
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider mb-3 opacity-70">
                Quick Presets
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                    onClick={applyRandom}
                    className={buttonClass}
                >
                    <div className="p-2 bg-purple-400 border-2 border-black rounded-full shrink-0">
                        <Dices className="w-4 h-4 text-black" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold font-mono uppercase text-sm truncate">Random</div>
                        <div className="text-[10px] md:text-xs opacity-70 font-mono truncate">Surprise me</div>
                    </div>
                </button>

                <button
                    onClick={applyClear}
                    className={buttonClass}
                >
                    <div className="p-2 bg-red-400 border-2 border-black rounded-full shrink-0">
                        <Trash2 className="w-4 h-4 text-black" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold font-mono uppercase text-sm truncate">Clear</div>
                        <div className="text-[10px] md:text-xs opacity-70 font-mono truncate">Reset all fields</div>
                    </div>
                </button>

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

                <button
                    onClick={applyMovieStill}
                    className={buttonClass}
                >
                    <div className="p-2 bg-emerald-400 border-2 border-black rounded-full shrink-0">
                        <Film className="w-4 h-4 text-black" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold font-mono uppercase text-sm truncate">Movie Still</div>
                        <div className="text-[10px] md:text-xs opacity-70 font-mono truncate">Anamorphic, 500T...</div>
                    </div>
                </button>

                <button
                    onClick={applyFashion}
                    className={buttonClass}
                >
                    <div className="p-2 bg-pink-400 border-2 border-black rounded-full shrink-0">
                        <Camera className="w-4 h-4 text-black" />
                    </div>
                    <div className="min-w-0">
                        <div className="font-bold font-mono uppercase text-sm truncate">Fashion</div>
                        <div className="text-[10px] md:text-xs opacity-70 font-mono truncate">Editorial, Studio...</div>
                    </div>
                </button>
            </div>
        </div>
    );
}
