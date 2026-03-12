---
id: TASK-18
title: "HeroSection mobile: bottom-anchored headline + image right-center"
role: frontend
planId: PLAN-004
status: todo
dependencies: [TASK-17]
createdAt: "2026-03-12T18:30:00.000Z"
---

## Context
Current mobile hero dumps all text top-left with a dark gradient — feels like desktop shrunk down. The 2026 mobile redesign flips the layout: the machine image fills the viewport (positioned right-center so the machine is visually centered), with a minimal bottom-gradient and a bold, short headline anchored to the bottom third of the screen — like an iOS lock screen or Instagram story title. Desktop layout stays completely unchanged.

## Files to Read
- `src/components/HeroSection.vue` — full file
- `src/i18n/de.ts` — new `t.hero.mobileHeadline`, `t.hero.mobileSubline`, `t.hero.scrollHint`
- `src/style.css` — hero-viewport, gradient classes

## Implementation Steps
1. **Mobile gradient flip**: Change the `@media (max-width: 639px)` `.hero-gradient-overlay` from top-to-bottom to a bottom-to-top gradient — dark at bottom (where text lives), transparent at top (machine visible):
   ```css
   background: linear-gradient(to top, rgba(49,49,49,0.92) 0%, rgba(49,49,49,0.6) 30%, rgba(49,49,49,0.0) 55%);
   ```
2. **Mobile text position**: Wrap the text content in a `<div>` that on mobile uses `items-end pb-safe` (flex end = bottom of viewport) instead of `items-center`. Use responsive classes: `items-end sm:items-center` on the existing flex container.
3. **Mobile headline swap**: Inside the text block, show `t.hero.mobileHeadline` on `sm:hidden` and the existing `t.hero.headline` on `hidden sm:block`. The mobile headline should be `text-3xl font-display font-bold text-white` — punchy, 2 lines max.
4. **Mobile subline**: Below the mobile headline, show `t.hero.mobileSubline` as `text-sm text-white/70 mt-2 sm:hidden`.
5. **Hide verbose elements on mobile**: Add `hidden sm:block` to the `<p>` subheadline paragraph and the trust badges `<ul>`. Keep both CTA buttons visible on mobile but make them slightly smaller: `text-sm py-2.5 px-5` on mobile via responsive classes.
6. **Mobile scroll cue**: Redesign the bottom bounce arrow — add a subtle text label `t.hero.scrollHint` next to/below the arrow, `sm:hidden`, fading with scroll as before.
7. **Image positioning**: Ensure `bg-center` on mobile keeps the machine centered. The images already use `bg-center sm:bg-right` which is correct — verify the PSD crop works.
8. **Bottom padding for safe area**: Add `pb-[env(safe-area-inset-bottom,16px)]` or equivalent to the mobile text container.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] On mobile (<640px): headline at bottom third, machine image fills viewport, dark gradient from bottom only
- [ ] On desktop (≥640px): layout identical to current (left-aligned text, left-to-right gradient)
- [ ] Scroll cue arrow + hint text visible on mobile, fades on scroll
- [ ] Both CTA buttons visible and touch-friendly on mobile (≥48px touch target)

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
