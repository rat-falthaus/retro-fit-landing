---
id: TASK-26
title: "QA: build verification + desktop regression check"
role: qa
planId: PLAN-005
status: todo
dependencies: [TASK-25]
createdAt: 2026-03-12T21:00:00.000Z
---

## Context
After adding the mobile scroll dwell behavior to PostcardBridge, verify the full build pipeline passes and desktop layout is unaffected.

## Files to Read
- `src/components/PostcardBridge.vue` — verify changes
- `src/App.vue` — confirm component ordering unchanged

## Implementation Steps

1. Run `vue-tsc --noEmit` — must exit 0.
2. Run `npm run build` — all 3 stages (client, server, generate) must pass.
3. Visually confirm in the built output that PostcardBridge renders correctly.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] Desktop layout unchanged — no sticky behavior on sm+ breakpoints
- [ ] No TypeScript errors or warnings

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
