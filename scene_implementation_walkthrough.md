# Scene Section Implementation

## Overview
Added a new "Scene" section to the Prompt Builder that is available for both Photo and Video modes. This section allows users to define the setting and atmosphere of their prompt in detail.

## Changes

### 1. Type Definitions (`types/prompt.ts`)
- Added `scene` to `SectionId` type
- Updated `INITIAL_STATE` to include `scene`

### 2. Section Configuration (`lib/section-data.ts`)
Added new Scene section with the following fields:
- **Scene Description**: A text area for detailed custom descriptions
- **Atmosphere**: (Eerie, Joyful, Tense, etc.)
- **Time Period**: (Ancient Rome, 1980s, Cyberpunk Future, etc.)
- **Architecture**: (Brutalist, Gothic, Modern, etc.)
- **Weather & Environment**: (Stormy, Sunny, Foggy, etc.)
- **Crowd / Population**: (Deserted, Bustling, etc.)

### 3. Styling (`app/globals.css`)
- Added specific CSS variables for the scene section theme (Lime Green base)
- Light Mode: `85 100% 45%`
- Dark Mode: `85 100% 35%`

## Usage
The new section appears at the top of the form, allowing users to set the scene before configuring characters or other details. It works seamlessly with the JSON preview and supports both media types.
