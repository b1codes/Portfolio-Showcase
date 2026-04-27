# Migrate Project to pnpm Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rework the project to use pnpm as the package manager instead of npm.

**Architecture:**
- Clean migration by removing existing npm-related files.
- Re-installation using pnpm to generate a new `pnpm-lock.yaml`.
- Updating project scripts and documentation for pnpm compatibility.

**Tech Stack:**
- pnpm (latest stable)
- React 19 / Vite
- Material UI 5

---

## Design Details

### 1. Cleanup and Initialization
- Remove `node_modules/` directory.
- Remove `package-lock.json`.
- Run `pnpm install` to generate `pnpm-lock.yaml`.

### 2. Configuration Updates
- **package.json**: Update scripts that explicitly call `npm`.
  - `predeploy`: `npm run build ...` -> `pnpm run build ...`

### 3. Documentation Updates
- **README.md**: Update installation and script usage instructions.
- **GEMINI.md**: Update technical guide references to package manager commands.

### 4. Verification
- Run `pnpm install` to ensure lockfile is consistent.
- Run `pnpm run build` to verify the production build succeeds.
- Run `pnpm run dev` (briefly) to verify the development server starts.
