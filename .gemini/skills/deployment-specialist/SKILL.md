---
name: deployment-specialist
description: Manage and troubleshoot the portfolio's deployment to GitHub Pages. Use when configuring Vite build settings, updating the BASE_URL in src/utils.ts, or resolving CI/CD issues with gh-pages.
---

# Deployment Specialist

This skill ensures the portfolio is correctly built and deployed to a live environment.

## Core Workflows

### 1. Build Verification
Before deployment:
1.  **Check `BASE_URL`**: Verify that `BASE_URL` in `src/utils.ts` matches the user's GitHub repository name (e.g., `/my-portfolio/`).
2.  **Validate `vite.config.ts`**: Ensure the `base` property is correctly set to `BASE_URL`.
3.  **Run Build**: Execute `npm run build` and verify that the `dist/` directory is correctly populated.

### 2. GitHub Pages Deployment
1.  Verify `gh-pages` is installed in `package.json`.
2.  Suggest running `npm run deploy` for manual deployments.
3.  Check for a `404.html` file in `public/` to handle client-side routing.

### 3. Custom Domain Setup
If a user wants a custom domain:
1.  Guide them to update `BASE_URL` in `src/utils.ts` to `/`.
2.  Ensure `vite.config.ts` uses the new `base`.
3.  Assist in creating a `CNAME` file in the `public/` directory.

## Common Issues
-   **Broken Images**: Often caused by incorrect `BASE_URL` prefixing. Ensure assets use `src={`${BASE_URL}/images/my-image.png`}`.
-   **Routing Errors**: Refreshing a page on GitHub Pages results in a 404. Ensure `404.html` is present and correctly handles the redirect.

## Quality Standards
-   **Fast Load Time**: Monitor build sizes and recommend image optimization if `dist/` exceeds 2MB.
