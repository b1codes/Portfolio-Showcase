# Migrate Project to pnpm Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the project to use pnpm as the package manager instead of npm.

**Architecture:**
- Clean migration: delete `node_modules` and `package-lock.json`.
- Initialize `pnpm` and generate `pnpm-lock.yaml`.
- Update `package.json` scripts and documentation files.

**Tech Stack:**
- pnpm
- React 19 / Vite

---

### Task 1: Cleanup and pnpm Initialization

**Files:**
- Delete: `package-lock.json`
- Delete: `node_modules`
- Create: `pnpm-lock.yaml` (via pnpm install)

- [ ] **Step 1: Remove npm artifacts**

Run: `rm -rf node_modules package-lock.json`

- [ ] **Step 2: Install dependencies with pnpm**

Run: `pnpm install`
Expected: Success, `pnpm-lock.yaml` created.

- [ ] **Step 3: Commit**

```bash
git add pnpm-lock.yaml
git commit -m "chore: initialize pnpm and generate pnpm-lock.yaml"
```

---

### Task 2: Update package.json Scripts

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Update scripts to use pnpm**

Modify `package.json`:
- `predeploy`: Change `npm run build` to `pnpm run build`.

```json
  "scripts": {
    "predeploy": "pnpm run build && copyfiles .gitattributes dist",
    "deploy": "gh-pages -d dist",
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
```

- [ ] **Step 2: Commit**

```bash
git add package.json
git commit -m "chore: update package.json scripts for pnpm"
```

---

### Task 3: Update Documentation

**Files:**
- Modify: `README.md`
- Modify: `GEMINI.md`

- [ ] **Step 1: Update README.md**

Replace `npm install` with `pnpm install`, and other `npm run` commands with `pnpm`.

- [ ] **Step 2: Update GEMINI.md**

Replace `npm` command references with `pnpm`.

- [ ] **Step 3: Commit**

```bash
git add README.md GEMINI.md
git commit -m "docs: update README and GEMINI to use pnpm commands"
```

---

### Task 4: Final Verification

- [ ] **Step 1: Verify Build**

Run: `pnpm run build`
Expected: Success, `dist` folder created/updated.

- [ ] **Step 2: Verify Dev Server**

Run: `pnpm run dev`
Expected: Server starts without errors.

- [ ] **Step 3: Verify Predeploy Script**

Run: `pnpm run predeploy`
Expected: Build succeeds and `.gitattributes` is copied to `dist`.
