# Prompt Maker

A brutalist, hyper-minimal web application designed to help users construct detailed JSON prompts for AI image and video generation.

## Features

- **Dynamic Form Builder**: Sections and fields adapt based on the selected media type (Photo vs. Video).
- **Live JSON Preview**: Real-time updates of your prompt structure as you select options.
- **Brutalist Design**: High contrast, distinctive color-coded sections, and a stark aesthetic.
- **Customizable**: Add your own custom values to any field on the fly.
- **Dark/Light Mode**: Fully supported system-wide theming.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

## Project Structure

- `app/`: Next.js App Router pages and global styles.
- `components/`: React components.
  - `ui/`: Reusable primitive components (MultiSelect, Section).
  - `form/`: specialized form components (JSONPreview).
- `context/`: State management (PromptContext).
- `lib/`: Utility functions and **data configuration**.
- `types/`: TypeScript definitions.

---

## How to Extend

This application is data-driven. Most changes to the form structure do not require touching React components.

### 1. Adding Options to an Existing Field
To simply add more choices to a dropdown (e.g., adding "Purple" to Hair Color):

1. Open `lib/section-data.ts`.
2. Locate the relevant section (e.g., `id: "character"`).
3. Find the field (e.g., `id: "hair_color"`).
4. Append your new string to the `options` array.

```typescript
// lib/section-data.ts
{ 
  id: "hair_color", 
  label: "Hair Color", 
  options: ["Black", ..., "NEW_OPTION_HERE"] 
}
```

### 2. Adding a New Field to a Section
To add a new category within an existing section (e.g., adding "Beard Style" to "Character"):

1. Open `lib/section-data.ts`.
2. Find the section where you want the field.
3. Add a new object to the `fields` array:

```typescript
// lib/section-data.ts
{
  id: "beard_style",
  label: "Beard Style",
  options: ["Stubble", "Full Beard", "Goatee", "Clean Shaven"]
}
```

### 3. Adding a Completely New Section
To add a brand new major section (e.g., "Post-Processing"):

**Step A: Define the Type**
Open `types/prompt.ts` and add your new ID to the `SectionId` type union:

```typescript
// types/prompt.ts
export type SectionId = 
  | "character"
  | ...
  | "post_processing"; // <-- Add this
```

**Step B: Define Colors**
Open `app/globals.css`. You must define the CSS variables for your new section so the theme works.
Follow the pattern `--section-[id]`:

```css
/* app/globals.css */
:root {
  /* ... existing vars ... */
  
  /* Post Processing - Cyan */
  --section-post_processing: 180 100% 50%;
  --section-post_processing-foreground: 180 100% 5%;
  --section-post_processing-muted: 180 100% 90%;
}

.dark {
  /* ... existing vars ... */
  
  /* Dark mode variants */
  --section-post_processing: 180 100% 40%;
  --section-post_processing-foreground: 180 100% 95%;
  --section-post_processing-muted: 180 50% 15%;
}
```

**Step C: Configure the Section**
Open `lib/section-data.ts` and add the section configuration object to the `SECTIONS` array:

```typescript
// lib/section-data.ts
export const SECTIONS: SectionConfig[] = [
  // ... existing sections
  {
    id: "post_processing",
    label: "Post Processing",
    color: "section-post_processing", // This matches the CSS variable name suffix
    visibleFor: ["photo", "video"], // Or just ["photo"] etc.
    fields: [
      { id: "grading", label: "Color Grading", options: ["High Contrast", "Sepia", "B&W"] }
    ]
  }
];
```

That's it! The application will automatically render the new section, apply the correct colors, and include it in the JSON output.
