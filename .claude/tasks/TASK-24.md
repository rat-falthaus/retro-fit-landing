---
id: TASK-24
title: "QA: full mobile build + visual audit + scroll performance"
role: qa
planId: PLAN-004
status: todo
dependencies: [TASK-18, TASK-19, TASK-20, TASK-21, TASK-22, TASK-23]
createdAt: "2026-03-12T18:30:00.000Z"
---

## Context
Final QA gate for PLAN-004. Verify the full build passes, all mobile visual changes are correctly implemented, desktop is unchanged, scroll performance is smooth, and SSR prerender works correctly.

## Files to Read
- All component files in `src/components/`
- `src/App.vue`
- `src/i18n/de.ts`
- `src/style.css`

## Implementation Steps
1. Run `vue-tsc --noEmit 2>&1` — must exit 0.
2. Run `npm run build 2>&1` — all 3 stages must pass.
3. Verify each TASK-18 through TASK-23 acceptance criterion by reading the code:
   - TASK-18: HeroSection bottom headline on mobile, image centered, gradient from bottom
   - TASK-19: Radial clip-path on mobile, stamp blur-to-sharp
   - TASK-20: PostcardBridge flat card on mobile, icon accent, large voucher number
   - TASK-21: SocialProofStrip component exists, md:hidden, count-up animation, in App.vue
   - TASK-22: InlineClaimSection borderless, progress dots, step labels from i18n
   - TASK-23: Footer pills, horizontal legal, collapsible disclaimer
4. Verify no desktop regressions by checking all responsive classes are properly gated (sm:, md:, lg:).
5. Verify SSR safety: grep for `window`, `document`, `navigator` outside `onMounted` — should find none.
6. Verify all text comes from i18n: grep for German text literals in .vue templates — should find none.
7. Report pass/fail for each criterion.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] All 6 task acceptance criteria verified
- [ ] No SSR-unsafe browser API usage outside onMounted
- [ ] Desktop visual regression check passes (no mobile-only classes leaking)

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
