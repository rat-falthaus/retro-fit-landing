---
id: TASK-29
title: "QA: vue-tsc + full build verification"
role: qa
planId: PLAN-006
status: done
dependencies: [TASK-28]
createdAt: 2026-03-19T10:00:00.000Z
completedAt: 2026-03-19T10:30:00.000Z
---

## Result
- `vue-tsc --noEmit`: exit 0, zero errors
- `npm run build`: all 3 stages passed (client 672ms, server 241ms, generate ✅)

## Context
After the PrimeVue form upgrade, verify TypeScript compilation and full SSG build pipeline pass.

## Files to Check
- `src/components/ClaimCheckForm.vue`
- `src/i18n/de.ts`

## Implementation Steps

1. Run `vue-tsc --noEmit` — must exit 0
2. Run `npm run build` — all 3 stages must pass (client, server, generate)

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] No hardcoded user-facing strings in components
- [ ] SelectButton renders for all 3 radio fields
- [ ] Checkbox group renders for machineDocs
