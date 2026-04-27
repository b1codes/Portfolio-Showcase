---
name: mui-theming
description: Customize the portfolio's Material-UI (MUI) 5 theme. Use when updating colors, typography, or component styles in src/theme.ts to create a unique personal brand.
---

# MUI Theming

This skill provides expert guidance on styling your portfolio using Material-UI's `createTheme`.

## Core Workflows

### 1. Palette Customization
When the user wants to change the look and feel:
1.  **Suggest Palettes**: Recommend high-contrast, professional color schemes (e.g., Deep Indigo & Cyan, Dark Slate & Emerald).
2.  **Define `primary` & `secondary`**: Update `palette.primary` and `palette.secondary` in `src/theme.ts`.
3.  **Mode Toggle**: Support both `light` and `dark` modes if the theme allows.

### 2. Typography Adjustments
1.  Suggest modern font pairings (e.g., Inter for body, Roboto Slab for headers).
2.  Ensure responsive font sizes using `responsiveFontSizes` from `@mui/material/styles`.

### 3. Component Overrides
1.  Modify `components` in `createTheme` to apply global styles to `MuiButton`, `MuiCard`, etc.
2.  Suggest specific overrides like rounded corners (`borderRadius: 12`) or card shadows.

## Reference Materials
-   **Color Guide**: See [COLORS.md](references/COLORS.md) for pre-defined palettes.
-   **Theme Structure**: Refer to `src/theme.ts` for the project's current theme definition.

## Quality Standards
-   **Accessibility**: Always verify that color pairings meet WCAG AA contrast ratios.
-   **Consistency**: Ensure the theme is applied globally through `ThemeProvider` in `src/index.tsx`.
