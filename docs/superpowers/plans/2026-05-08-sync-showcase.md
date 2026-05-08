# Showcase Synchronization & Sanitization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sync features (ClickUp, Header Images, UI Polish) from `Portfolio` to `Portfolio-Showcase` while replacing personal data with generic placeholders.

**Architecture:** Surgical manual copy of components and logic followed by exhaustive data sanitization in `src/data.ts`.

**Tech Stack:** React, TypeScript, Material-UI, Python (for ClickUp script), Terraform.

---

### Task 1: Sync Types and Utility Constants

**Files:**
- Modify: `Portfolio-Showcase/src/types.ts`
- Modify: `Portfolio-Showcase/src/utils.ts`

- [ ] **Step 1: Update `Project` interface**
  Add `clickupListId` and `headerImage` optional fields.

- [ ] **Step 2: Update `utils.ts`**
  Ensure any new shared constants (like DATE_FORMAT) are synced.

- [ ] **Step 3: Commit**
```bash
git add src/types.ts src/utils.ts
git commit -m "chore: sync types and utils for new features"
```

### Task 2: Port ClickUp Integration

**Files:**
- Create: `Portfolio-Showcase/src/components/ClickUpProgress.tsx`
- Create: `Portfolio-Showcase/scripts/fetch_clickup_data.py`
- Modify: `Portfolio-Showcase/src/components/index.ts`
- Create: `Portfolio-Showcase/src/generated/clickup_data.json`

- [ ] **Step 1: Copy `ClickUpProgress.tsx` from Portfolio**
  Ensure imports are adjusted if necessary.

- [ ] **Step 2: Copy `fetch_clickup_data.py` from Portfolio**
  Update the script comments to emphasize environment variable requirements.

- [ ] **Step 3: Create generic `clickup_data.json` placeholder**
  Provide a valid but generic JSON structure.

- [ ] **Step 4: Export component**
  Add `ClickUpProgress` to `src/components/index.ts`.

- [ ] **Step 5: Commit**
```bash
git add src/components/ClickUpProgress.tsx scripts/fetch_clickup_data.py src/components/index.ts src/generated/clickup_data.json
git commit -m "feat: port ClickUp integration components and script"
```

### Task 3: Sync UI Components and Polish

**Files:**
- Modify: `Portfolio-Showcase/src/components/AboutMe.tsx`
- Modify: `Portfolio-Showcase/src/components/ProjectDetail.tsx`
- Modify: `Portfolio-Showcase/src/components/ProjectPhases.tsx`
- Modify: `Portfolio-Showcase/src/components/ProjectCard.tsx`
- Modify: `Portfolio-Showcase/src/theme.ts`

- [ ] **Step 1: Sync `AboutMe.tsx`**
  Port the expanded layout and animations.

- [ ] **Step 2: Sync `ProjectDetail.tsx`**
  Include `ClickUpProgress` integration and optional `headerImage` rendering logic.

- [ ] **Step 3: Sync `ProjectPhases.tsx`**
  Port SDLC visualization improvements.

- [ ] **Step 4: Sync `ProjectCard.tsx`**
  Ensure cards look consistent with the main Portfolio.

- [ ] **Step 5: Sync `theme.ts`**
  Ensure all visual polish and color adjustments are mirrored.

- [ ] **Step 6: Commit**
```bash
git add src/components/ src/theme.ts
git commit -m "feat: sync UI components and visual polish"
```

### Task 4: Port Infrastructure (Terraform)

**Files:**
- Create: `Portfolio-Showcase/infra/` (main.tf, provider.tf, etc.)

- [ ] **Step 1: Copy `infra/` folder from Portfolio**
  Remove any specific AWS account IDs or sensitive defaults if they exist.

- [ ] **Step 2: Commit**
```bash
git add infra/
git commit -m "chore: add Terraform infrastructure for AWS hosting"
```

### Task 5: Sanitize Project Data

**Files:**
- Modify: `Portfolio-Showcase/src/data.ts`
- Modify: `Portfolio-Showcase/package.json`

- [ ] **Step 1: Replace `projects` array in `data.ts`**
  Use generic "Project 1", "Project 2" entries. Ensure one includes a `clickupListId` and one includes a `headerImage` path to demonstrate functionality.

- [ ] **Step 2: Replace personal bio/socials**
  Use placeholders like "[Your Bio Here]" and "https://github.com/yourusername".

- [ ] **Step 3: Verify `package.json`**
  Ensure it still has `gh-pages` and `copyfiles` for the Hybrid strategy.

- [ ] **Step 4: Commit**
```bash
git add src/data.ts package.json
git commit -m "chore: sanitize project data into generic placeholders"
```

### Task 6: Final Documentation and Cleanup

**Files:**
- Modify: `Portfolio-Showcase/README.md`
- Delete: `Portfolio-Showcase/public/files/Portfolio Resume.pdf`
- Delete: `Portfolio-Showcase/public/images/` (non-generic images)

- [ ] **Step 1: Update README.md**
  Add sections for "ClickUp Integration" and "Deployment Options" (GH Pages vs Terraform).

- [ ] **Step 2: Remove personal assets**
  Ensure the resume PDF and specific project images are removed.

- [ ] **Step 3: Final Verification**
  Run `pnpm install` and `pnpm dev` to ensure a clean build.

- [ ] **Step 4: Commit**
```bash
rm public/files/Portfolio\ Resume.pdf
git add README.md
git commit -m "docs: update README and remove personal assets"
```
