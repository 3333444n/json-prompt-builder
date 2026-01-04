import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                // Section Colors
                section: {
                    character: {
                        DEFAULT: "hsl(var(--section-character))",
                        foreground: "hsl(var(--section-character-foreground))",
                        muted: "hsl(var(--section-character-muted))",
                    },
                    cinematography: {
                        DEFAULT: "hsl(var(--section-cinematography))",
                        foreground: "hsl(var(--section-cinematography-foreground))",
                        muted: "hsl(var(--section-cinematography-muted))",
                    },
                    pose: {
                        DEFAULT: "hsl(var(--section-pose))",
                        foreground: "hsl(var(--section-pose-foreground))",
                        muted: "hsl(var(--section-pose-muted))",
                    },
                    clothing: {
                        DEFAULT: "hsl(var(--section-clothing))",
                        foreground: "hsl(var(--section-clothing-foreground))",
                        muted: "hsl(var(--section-clothing-muted))",
                    },
                    lighting: {
                        DEFAULT: "hsl(var(--section-lighting))",
                        foreground: "hsl(var(--section-lighting-foreground))",
                        muted: "hsl(var(--section-lighting-muted))",
                    },
                    place: {
                        DEFAULT: "hsl(var(--section-place))",
                        foreground: "hsl(var(--section-place-foreground))",
                        muted: "hsl(var(--section-place-muted))",
                    },
                    palette: {
                        DEFAULT: "hsl(var(--section-palette))",
                        foreground: "hsl(var(--section-palette-foreground))",
                        muted: "hsl(var(--section-palette-muted))",
                    },
                    video: {
                        DEFAULT: "hsl(var(--section-video))",
                        foreground: "hsl(var(--section-video-foreground))",
                        muted: "hsl(var(--section-video-muted))",
                    },
                },
            },
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },
            borderWidth: {
                '3': '3px',
            },
            boxShadow: {
                'brutal': '4px 4px 0px 0px rgba(0,0,0,1)',
                'brutal-sm': '2px 2px 0px 0px rgba(0,0,0,1)',
                'brutal-lg': '8px 8px 0px 0px rgba(0,0,0,1)',
                'brutal-dark': '4px 4px 0px 0px rgba(255,255,255,1)',
            },
        },
    },
    plugins: [],
};
export default config;
