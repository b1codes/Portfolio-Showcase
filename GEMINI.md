# Developer Portfolio Template - GEMINI Context

This document provides architectural overview, development guidelines, and operational context for the Developer Portfolio Template project.

## Project Overview
A modern, responsive developer portfolio built with **React 19**, **TypeScript**, and **Material-UI (MUI) 5**. It features a dynamic project showcase with filtering, a detailed project view, and a visual representation of project phases (SDLC).

### Main Technologies
- **Core:** React 19, TypeScript
- **Build Tool:** Vite
- **UI Library:** Material-UI (MUI) 5
- **Routing:** React Router 7
- **Charts:** React-Plotly.js (for SDLC visualization)
- **Deployment:** GitHub Pages (via `gh-pages`)

## Architecture
The project follows a modular, data-driven architecture:

- **Entry Point (`src/index.tsx`):** Manages high-level routing (`/`, `/about`, `/sdlc`, `/project/:projectId`) and applies the MUI `ThemeProvider`.
- **Centralized Data (`src/data.ts`):** The single source of truth for project information, biographies, and social links.
- **Components (`src/components/`):** Reusable UI components exported via `src/components/index.ts`.
- **State Management:** Uses React's `useState` and `useMemo` for filtering and project selection.
- **Configuration (`src/utils.ts` & `vite.config.ts`):** Handles base URL settings for GitHub Pages deployment.
- **Styling:** Primarily utilizes MUI's `sx` prop and `ThemeProvider` for consistent design.

## Building and Running
Common commands for development and deployment:

| Command | Description |
| :--- | :--- |
| `npm install` | Install project dependencies. |
| `npm run dev` | Start the Vite development server (usually at `http://localhost:5173`). |
| `npm run build` | Compile and bundle for production in the `dist/` folder. |
| `npm run deploy` | Build and deploy the site to GitHub Pages. |
| `npm run preview` | Preview the production build locally. |

## Development Conventions
- **Customization:** To personalize the portfolio, users should primarily edit `src/data.ts`, `src/utils.ts`, and update assets in the `public/` directory.
- **Type Safety:** Always define interfaces in `src/types.ts` for new data structures.
- **Responsive UI:** Leverage MUI's responsive breakpoints (e.g., `sx={{ width: { xs: 120, sm: 150 } }}`).
- **Assets:** 
    - Images: `public/images/`
    - Documents (e.g., Resume): `public/files/`
- **Licensing:** Source files should include the Apache-2.0 SPDX license header.

## Key Files
- `src/data.ts`: Central project and bio data.
- `src/index.tsx`: Main application shell and routing.
- `src/utils.ts`: Global constants like `BASE_URL`.
- `src/theme.ts`: Global MUI theme configuration.
- `package.json`: Dependency and script definitions.
- `vite.config.ts`: Vite and build-time configuration.
