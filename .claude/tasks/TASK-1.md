---
id: TASK-1
title: Fix Vite base path, index.html favicon, CI node version
role: build
planId: PLAN-001
status: todo
dependencies: []
createdAt: 2026-03-10T14:10:00.000Z
---

## Context
The site is hosted at `https://rat-falthaus.github.io/retro-fit-landing/`. Without a `base`
in `vite.config.ts`, all compiled assets are emitted with a `/assets/` prefix that resolves
to paths not under the sub-path, causing 404s for every JS and CSS file. The CI also
specifies Node 20 while the project requires Node 24, and `index.html` has a stale
`/vite.svg` favicon reference pointing to a file that doesn't exist.

## Files to Read
- `vite.config.ts`
- `index.html`
- `.github/workflows/main.yml`

## Implementation Steps
1. In `vite.config.ts`, add `base: process.env.NODE_ENV === 'production' ? '/retro-fit-landing/' : '/'`
   so that local dev still serves at `/` while production builds use the correct sub-path.
2. In `index.html`:
   - Remove the `<link rel="icon" type="image/svg+xml" href="/vite.svg" />` line (file does not exist).
   - Change `lang="en"` to `lang="de"` on the `<html>` tag (German-language page).
3. In `.github/workflows/main.yml`, change `node-version: 20` to `node-version: 24`.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] `dist/index.html` contains `src="/retro-fit-landing/assets/` asset references after build
- [ ] `dist/assets/` directory is populated with correctly named chunks
- [ ] No `/vite.svg` reference in `index.html`
- [ ] CI workflow specifies `node-version: 24`

## Anti-patterns to Avoid
- NEVER hard-code `base: '/retro-fit-landing/'` unconditionally — local dev would break
- NEVER remove the `<!--app-html-->`, `<!--head-tags-->` placeholders from `index.html`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
