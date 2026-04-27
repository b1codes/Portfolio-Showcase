---
name: project-curator
description: Manage and curate projects in the developer portfolio. Use when adding, updating, or validating project entries in src/data.ts, ensuring consistent schemas, asset paths, and SDLC phase mappings.
---

# Project Curator

This skill manages the content and integrity of the portfolio's project showcase.

## Core Workflows

### 1. Adding a New Project
When a user wants to add a project:
1.  **Gather Details**: Ask for title, short/long description, inspiration, technologies, and GitHub URL.
2.  **Asset Verification**: Check that any provided image or video paths exist in `public/images/`.
3.  **SDLC Mapping**: Assist in defining `phases` (MVP, V2, etc.) and their corresponding `ProjectStage`.
4.  **Implementation**: Append the new project to `PROJECTS` in `src/data.ts`.

### 2. Updating Existing Projects
1.  Locate the project by `id` or `title` in `src/data.ts`.
2.  Apply changes while maintaining the `Project` interface.
3.  Update the `isComplete` status of phases or add new phases as the project evolves.

### 3. Data Validation
Verify that `src/data.ts` matches the `Project` and `ProjectPhase` interfaces defined in `src/types.ts`.

## Reference Materials
-   **Schema Definition**: See [SCHEMA.md](references/SCHEMA.md) for detailed property explanations.
-   **SDLC Stages**: Valid stages include:
    -   `Planning & Requirements Analysis`
    -   `Implementation`
    -   `Deployment`
    -   `Maintenance & Support`

## Quality Standards
-   **Conciseness**: Short descriptions should be catchy (under 100 characters).
-   **Technical Detail**: Long descriptions should highlight specific challenges and technical stacks.
-   **Visuals**: Ensure `cardIcon` is either a Material-UI icon component or a valid URL.
