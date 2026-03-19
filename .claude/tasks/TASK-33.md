---
id: TASK-33
title: "QA: vue-tsc + full build after dialog wizard"
role: qa
planId: PLAN-007
status: done
dependencies: [TASK-32]
createdAt: 2026-03-19T11:00:00.000Z
completedAt: 2026-03-19T11:45:00.000Z
---

## Result
- `vue-tsc --noEmit`: exit 0, zero errors
- `npm run build`: all 3 stages passed ✅

## Context
Verify TypeScript and full SSG build after all wizard changes.

## Implementation Steps
1. `npx vue-tsc --noEmit` — must exit 0
2. `npm run build` — all 3 stages pass

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] InlineClaimSection unaffected (formStep defaults to 'all')
