---
id: TASK-36
title: "QA: vue-tsc + full build after logo swap"
role: qa
planId: PLAN-008
status: todo
dependencies: [TASK-34, TASK-35]
createdAt: 2026-03-19T12:00:00.000Z
---

## Implementation Steps
1. `npx vue-tsc --noEmit` — must exit 0
2. `npm run build` — all 3 stages pass

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
