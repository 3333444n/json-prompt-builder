"use client";

import { usePrompt } from "@/context/prompt-context";
import { cn } from "@/lib/utils";
import { Camera, Video } from "lucide-react";

export function MediaTypeToggle() {
    const { state, setMediaType } = usePrompt();

    return (
        <div className="flex w-full border-4 border-black dark:border-white shadow-brutal mb-12 bg-card">
            <button
                onClick={() => setMediaType("photo")}
                className={cn(
                    "flex-1 flex flex-col items-center justify-center p-6 gap-2 transition-all border-r-4 border-black dark:border-white last:border-0 hover:bg-muted/50",
                    state.mediaType === "photo"
                        ? "bg-primary text-primary-foreground shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                        : "text-foreground"
                )}
            >
                <Camera className="w-8 h-8 md:w-12 md:h-12" />
                <span className="text-xl md:text-3xl font-black uppercase tracking-widest">Photo</span>
            </button>
            <button
                onClick={() => setMediaType("video")}
                className={cn(
                    "flex-1 flex flex-col items-center justify-center p-6 gap-2 transition-all hover:bg-muted/50",
                    state.mediaType === "video"
                        ? "bg-primary text-primary-foreground shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                        : "text-foreground"
                )}
            >
                <Video className="w-8 h-8 md:w-12 md:h-12" />
                <span className="text-xl md:text-3xl font-black uppercase tracking-widest">Video</span>
            </button>
        </div>
    );
}
