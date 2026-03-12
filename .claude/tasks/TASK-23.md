---
id: TASK-23
title: "Footer mobile: compact visual redesign"
role: frontend
planId: PLAN-004
status: todo
dependencies: [TASK-17]
createdAt: "2026-03-12T18:30:00.000Z"
---

## Context
The footer on mobile takes too much vertical space and reads as a dense text block. For the 2026 mobile feel, the footer should be compact — essential info only, with a clean visual hierarchy. Contact details as tappable pills, legal links as a horizontal row, minimal whitespace waste.

## Files to Read
- `src/components/FooterSection.vue` — full file
- `src/i18n/de.ts` — footer strings

## Implementation Steps
1. **Contact pills**: On mobile, render phone and email as side-by-side tappable pill buttons (rounded-full bg-rex-orange/10 text-rex-orange) instead of stacked text links. Icon + text format: 📞 +49... and ✉ info@...
2. **Address**: Compact to one line on mobile: "Fichtenweg 26 · 99098 Erfurt" with `text-xs`.
3. **Legal links**: Horizontal row with dot separators (Impressum · Datenschutz · AGB) using `flex flex-wrap gap-x-3 text-xs`.
4. **Disclaimer**: Collapse the long disclaimer into an expandable `<details>` element on mobile with a "Rechtliche Hinweise ▸" summary. Desktop stays expanded.
5. **Copyright line**: Compact `text-xs text-center` with Rex-AT name and year.
6. **Spacing**: Tight mobile padding: `py-6 sm:pt-16` (was pt-10 sm:pt-16).
7. **Desktop unchanged**: All mobile layouts gated behind responsive classes.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] Contact details render as tappable pill buttons on mobile
- [ ] Legal links in horizontal row on mobile
- [ ] Disclaimer collapsed by default in `<details>` on mobile
- [ ] Desktop footer visually unchanged
- [ ] All links have ≥48px touch targets

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
