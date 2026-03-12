---
id: TASK-16
title: "QA: full mobile build + type-check + visual audit"
role: qa
planId: PLAN-003
status: todo
dependencies: [TASK-8, TASK-9, TASK-11, TASK-12, TASK-13, TASK-14, TASK-15]
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
Final validation gate for PLAN-003. All mobile tasks must pass type-check and build. Visual sanity check at simulated breakpoints (320px, 375px, 768px, 1280px).

## Files to Read
- All modified components
- `.claude/orchestrator.json`

## Implementation Steps

1. **Run `vue-tsc --noEmit`** — must exit 0.
2. **Run `npm run build`** — all 3 stages (client, server, generate) must pass.
3. **Audit checklist** (visual/logical):
   - [ ] Hero: headline fits 320px, no overflow
   - [ ] Hero: `100dvh` sticky viewport on mobile
   - [ ] Hero: gradient readable on mobile
   - [ ] Hero: video/images centered on portrait mobile
   - [ ] Nav: hamburger appears <768px, desktop nav appears ≥768px
   - [ ] Nav: menu opens/closes, links work
   - [ ] Form: inline section visible on mobile CTA click
   - [ ] Form: dialog opens on desktop CTA click
   - [ ] Form: validation + toast + shake work in both modes
   - [ ] Postcard: text/button don't overflow on 320px
   - [ ] Footer: text ≥14px, links tappable, stacks cleanly
   - [ ] All buttons: ≥48px touch targets on mobile
   - [ ] No console errors in dev server
4. **Fix any issues** found during audit.
5. **Mark PLAN-003 complete** in orchestrator.json when all criteria pass.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] All checklist items verified
- [ ] PLAN-003 status set to "completed" in orchestrator.json
