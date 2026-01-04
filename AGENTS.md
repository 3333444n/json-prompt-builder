# AGENTS.md

> **Note to Agents:** This file contains the architectural context, design system rules, and mental models required to work on the `prompt-maker` project effectively. Read this before making changes.

## 1. Project Overview
**Name:** Prompt Maker
**Goal:** A brutalist, minimalist web app to generate detailed JSON prompts for AI image and video generation.
**Core UX:** A split-screen layout (Form on Left, Live JSON on Right). The form is dynamic, changing based on "Photo" vs "Video" mode.

## 2. Technology Stack
- **Framework:** Next.js 14+ (App Router)
- **Styling:** Tailwind CSS v4
  - **Theme:** Brutalist (Sharp edges, thick borders, high contrast).
  - **Variables:** CSS variables in `app/globals.css` control section colors and theme (light/dark).
- **Icons:** `lucide-react`
- **State Management:** React Context (`PromptContext`) + `useReducer`
- **Language:** TypeScript

## 3. Architecture & Key Files

### State & Logic (`/context`, `/types`)
- **`types/prompt.ts`**: Defines the source of truth for the data shape (`PromptState`, `SectionConfig`).
- **`context/prompt-context.tsx`**: Holds the global state for the prompt being built. It uses a reducer pattern.

### Data Configuration (`/lib`)
- **`lib/section-data.ts`**: **CRITICAL**. This file defines the entire schema of the form. It contains the `SECTIONS` array.
  - To add content, you almost always only need to edit this file.
  - Each section has a `color` property that maps to a Tailwind class (e.g., `section-character`).

### Components (`/components`)
- **`prompt-builder.tsx`**: The main layout wrapper.
- **`ui/multi-select.tsx`**: The workhorse input component. It handles selection logic and "Add Custom" functionality.
- **`ui/section.tsx`**: A collapsible wrapper that applies the section-specific color theme (`--current-section`).
- **`form/media-type-toggle.tsx`**: The specific logic for switching between Photo/Video modes.

## 4. Design System & Styling Rules
- **Brutalism**:
  - **Borders**: Thick (`border-2` or `border-4`), usually black (light mode) or white (dark mode) or section color.
  - **Shadows**: Hard shadows (`shadow-brutal`).
  - **Radius**: Zero or near-zero (`rounded-none` or `rounded-sm`).
- **Themes**:
  - The app uses CSS variables (`--section-[name]`) to dynamic color sections.
  - When creating a new section, you MUST define its corresponding variables in `app/globals.css`.

## 5. Common Tasks

### Adding a New Field
1. Open `lib/section-data.ts`.
2. Find the relevant section object.
3. Add a new object to the `fields` array: `{ id: "new_id", label: "Label", options: [...] }`.

### Adding a New Section
1. Define the section ID in `types/prompt.ts` (`SectionId`).
2. Add colors for the section in `app/globals.css` (e.g., `--section-new-id`).
3. Add the section config to `lib/section-data.ts`.

### Changing Layout
- The main grid is in `components/prompt-builder.tsx`. It handles the responsive breakdown (1 col mobile, 2 cols desktop).
