# Design Spec: Sync Public Template (Portfolio-Showcase) with Latest Enhancements

**Date:** 2026-05-08
**Status:** Approved
**Topic:** Synchronization and Sanitization

## 1. Goal
Sync the `main` branch of `Portfolio` with the `main` branch of `Portfolio-Showcase` to include recent features, architectural improvements, and bug fixes while ensuring the template remains generic and "plug-and-play".

## 2. Core Enhancements to Sync
- **ClickUp Integration:**
  - `src/components/ClickUpProgress.tsx`
  - `scripts/fetch_clickup_data.py` (ensure environment variable usage is clear)
  - Integration in `src/components/ProjectDetail.tsx`
  - Type updates in `src/types.ts`
- **Optional Project Header Images:**
  - Logic in `src/components/ProjectDetail.tsx` to render `headerImage` if present.
  - Interface update in `src/types.ts`.
- **UI/UX Polish:**
  - Improved `AboutMe.tsx` (animations, layout).
  - Enhanced `ProjectPhases.tsx` (SDLC visualization).
  - Updated `theme.ts` for consistent visual polish.

## 3. Deployment (Hybrid Strategy)
- **Terraform:** Port `infra/` directory to Showcase.
- **GitHub Pages:** Retain/Sync `package.json` scripts and `gh-pages` dependency.
- **Documentation:** Update README to explain both deployment paths (AWS/Terraform vs. GitHub Pages).

## 4. Data Sanitization (Purely Generic)
- **`src/data.ts`:**
  - Strip all personal projects.
  - Add 2-3 "Example Project" entries demonstrating all features (SDLC, ClickUp ID, Header Image).
  - Replace bio and social links with placeholders.
- **`src/generated/clickup_data.json`:**
  - Provide a sample JSON file with generic tasks to demonstrate the UI without needing a real ClickUp API key.
- **Assets:**
  - Ensure `public/images/` and `public/files/` only contain generic placeholders or examples.
  - Delete `public/files/Portfolio Resume.pdf` from Showcase.

## 5. Verification
- Run `pnpm dev` in `Portfolio-Showcase` to ensure it builds and renders the generic data correctly.
- Verify that no personal data remains in `src/data.ts` or assets.
- Ensure the ClickUp script works with dummy environment variables or gracefully fails with clear instructions.
