---
id: TASK-17
title: "i18n: add mobile hero, reveal & visual section strings"
role: i18n
planId: PLAN-004
status: todo
dependencies: []
createdAt: "2026-03-12T18:30:00.000Z"
---

## Context
PLAN-004 redesigns the mobile experience with cinematic visual sections. New i18n keys are needed for the re-imagined hero footer-style headline, the scroll reveal prompt, social-proof stats strip, and refined section copy. Desktop strings stay untouched.

## Files to Read
- `src/i18n/de.ts` — existing string structure

## Implementation Steps
1. Read current `de.ts` to understand namespace structure.
2. Add/update these namespaces under the `t` const:
   - `t.hero.mobileHeadline` — short punchy headline for bottom of hero (e.g. "Ihre Maschine. Neu gedacht.")
   - `t.hero.mobileSubline` — one-liner below (e.g. "Scrollen Sie & erleben Sie den Unterschied")
   - `t.hero.scrollHint` — scroll cue label (e.g. "Weiter scrollen")
   - `t.stats` — social-proof counters: `{ yearsLabel, yearsValue, projectsLabel, projectsValue, savingsLabel, savingsValue, uptimeLabel, uptimeValue }`
   - `t.postcard.mobileHighlight` — short benefit callout for the redesigned mobile card
   - `t.inlineForm.stepLabels` — array of 3 step labels: ["Kontakt", "Maschine", "Details"]
3. Ensure all new keys are `as const` typed, no hardcoded strings escape.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] All new keys accessible as `t.hero.mobileHeadline` etc. with correct German text
- [ ] Existing desktop strings unchanged

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
