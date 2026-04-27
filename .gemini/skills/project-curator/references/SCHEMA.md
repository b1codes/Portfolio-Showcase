# Project Data Schema

The portfolio data is defined in `src/data.ts` using types from `src/types.ts`.

## Project Interface

| Property | Type | Description |
| :--- | :--- | :--- |
| `id` | `number` | Unique identifier for the project. |
| `cardIcon` | `React.ElementType \| string` | MUI icon component or URL to an image for the project card. |
| `title` | `string` | Display name of the project. |
| `inspiration` | `string` | Brief explanation of the "why" behind the project. |
| `shortDescription` | `string` | One-sentence summary for the card view. |
| `longDescription` | `string` | Detailed technical breakdown and outcomes. |
| `technologies` | `string[]` | List of primary technologies (e.g., React, Go). |
| `techStack` | `TechStackCategory[]` | (Optional) Detailed breakdown by category (Frontend, Backend, etc.). |
| `images` | `string[]` | (Optional) Array of image paths in `public/images/`. |
| `video` | `string` | (Optional) Path to a demo video in `public/images/`. |
| `githubUrl` | `string` | URL to the source code repository. |
| `phases` | `ProjectPhase[]` | SDLC timeline of the project's development. |

## ProjectPhase Interface

| Property | Type | Description |
| :--- | :--- | :--- |
| `number` | `number` | Order of the phase (1, 2, 3, etc.). |
| `title` | `string` | Name of the milestone (e.g., MVP, V2). |
| `description` | `string` | (Optional) Goals and changes in this phase. |
| `isComplete` | `boolean` | Whether the milestone has been reached. |
| `currentPhaseStage` | `ProjectStage` | The current SDLC status of this specific phase. |

## ProjectStage Types

- `Planning & Requirements Analysis`
- `Implementation`
- `Deployment`
- `Maintenance & Support`
