---
name: resume-sync
description: Sync content between the portfolio's About Me section and an external resume file. Use when updating biographical information, experience, or skills to ensure consistency across the site and downloadable assets.
---

# Resume Sync

This skill ensures your online biography and your downloadable resume remain in lockstep.

## Core Workflows

### 1. Syncing Bio to Resume
When `ABOUT_ME_TEXT` in `src/data.ts` is updated:
1.  **Extract Changes**: Identify new skills, roles, or achievements added to the bio.
2.  **Suggest Resume Updates**: Offer to update the corresponding sections in `public/files/resume.pdf` (if a source like `.docx` or `.html` exists) or a `resume.json` file.
3.  **Validate Consistency**: Check that dates, titles, and skill names match exactly.

### 2. Syncing Resume to Bio
When an external resume source is updated:
1.  **Parse Resume**: Identify the core narrative changes.
2.  **Update `src/data.ts`**: Re-write or append to `ABOUT_ME_TEXT` to reflect the latest resume content.

## Asset Management
-   **File Path**: Downloadable resumes should be located in `public/files/`.
-   **Naming Convention**: Use a generic name like `resume.pdf` to ensure links in `AboutMe.tsx` don't break when the file is replaced.

## Integration Hints
-   Check `src/components/AboutMe.tsx` for how the biography is rendered and if it includes a "Download Resume" button.
