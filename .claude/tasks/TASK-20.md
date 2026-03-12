---
id: TASK-20
title: "PostcardBridge mobile: visual card redesign with icon accents"
role: frontend
planId: PLAN-004
status: todo
dependencies: [TASK-17]
createdAt: "2026-03-12T18:30:00.000Z"
---

## Context
The PostcardBridge section currently reads as a wall of text on mobile — a rotated card with paragraphs. For the 2026 mobile redesign, this should feel more like a visual "story card" — short punchy text, an icon or illustration accent, and the voucher CTA as a prominent swipeable/tappable element. Desktop stays unchanged.

## Files to Read
- `src/components/PostcardBridge.vue` — full file
- `src/i18n/de.ts` — postcard strings
- `src/style.css` — section-container, brand tokens

## Implementation Steps
1. **Mobile card layout**: On `< sm`, remove the rotation (`sm:-rotate-1` keeps desktop tilt, mobile gets `rotate-0`). Card should be full-width with rounded-2xl, no shadow on mobile (cleaner).
2. **Icon accent**: Add a large SVG icon (wrench + gear or similar retrofit symbol) above the heading on mobile only (`sm:hidden`). Use `text-rex-orange` coloring, `w-12 h-12`.
3. **Shorter mobile text**: Use `t.postcard.mobileHighlight` (from TASK-17) as a one-liner replacing the long bridge text on mobile. Show full text on `hidden sm:block`, short on `sm:hidden`.
4. **Voucher redesign**: On mobile, make the voucher value ("€2.000") a large display number (`text-4xl font-display font-black text-rex-orange`) centered above the description text and CTA button. Stack everything vertically, centered.
5. **CTA button**: Full-width on mobile, with a subtle animated arrow icon (→) that pulses.
6. **Spacing**: Reduce vertical padding on mobile: `py-8 sm:py-20`.
7. **Background**: Keep warm beige (`rex-warm`).

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] Mobile card is flat (no rotation), full-width, clean
- [ ] Icon accent visible on mobile only
- [ ] Voucher value displayed as large centered number on mobile
- [ ] Desktop PostcardBridge visually unchanged
- [ ] CTA button full-width with touch-friendly sizing (≥48px)

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
