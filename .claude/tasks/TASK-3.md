---
id: TASK-3
title: Verify full build passes (vue-tsc + npm run build)
role: qa
planId: PLAN-001
status: todo
dependencies: [TASK-1, TASK-2]
createdAt: 2026-03-10T14:10:00.000Z
---

## Context
After TASK-1 (base path + CI) and TASK-2 (asset path fixes) are applied, we need to confirm
the entire 3-stage SSG pipeline succeeds and that the output `dist/index.html` actually
contains the correct `/retro-fit-landing/` prefixed paths for all assets and images.

## Files to Read
- `dist/index.html` (post-build, check asset paths)
- `.claude/orchestrator.json` (confirm TASK-1 and TASK-2 are done)

## Implementation Steps
1. Run `vue-tsc --noEmit` and confirm exit code 0.
2. Run `npm run build` (client → server → prerender) and confirm all 3 stages succeed.
3. Inspect `dist/index.html`:
   - Confirm `<script src="/retro-fit-landing/assets/…">` (base-prefixed chunks)
   - Confirm `<link rel="stylesheet" href="/retro-fit-landing/assets/…">` (CSS chunk)
   - Confirm no `/vite.svg` reference
4. Run `grep -r '"/images/' dist/` to confirm no bare `/images/` paths remain in output HTML.
5. Mark TASK-1, TASK-2, TASK-3 as `done` in `orchestrator.json` and set
   `plans.PLAN-001.status = "completed"`.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 — all 3 stages pass
- [ ] `dist/index.html` contains `/retro-fit-landing/assets/` references
- [ ] `dist/index.html` does NOT contain `/vite.svg`
- [ ] No bare `/images/` paths in built HTML output
- [ ] `orchestrator.json` has all 3 tasks marked `done`, PLAN-001 marked `completed`

## Anti-patterns to Avoid
- NEVER modify source files in this verification task
- NEVER mark tasks done if the build fails
