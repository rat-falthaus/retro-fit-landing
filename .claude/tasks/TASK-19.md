---
id: TASK-19
title: "Mobile scroll reveal: cinematic retrofit transition"
role: frontend
planId: PLAN-004
status: todo
dependencies: [TASK-18]
createdAt: "2026-03-12T18:30:00.000Z"
---

## Context
The before→after scroll reveal already works but doesn't feel cinematic on mobile. This task enhances the mobile scroll experience: as the user scrolls past the hero, the headline fades out, the "before" machine image cross-fades dramatically into the "after" (retrofitted) machine with a smooth wipe or dissolve, and the "RETO FITTED" stamp appears with a satisfying scale-and-rotate animation. The transition should feel like a premium app experience, not a web page scroll.

## Files to Read
- `src/components/HeroSection.vue` — full file (scroll logic, computed properties, template)
- `src/style.css` — existing utility classes

## Implementation Steps
1. **Mobile scroll timing**: On mobile, the text should fade out faster (first 10% of scroll instead of 20%) since there's less text to read.
2. **Enhanced crossfade**: Add a subtle scale transform to the "before" image as it fades — `transform: scale(1.05)` progressing during scroll to add parallax depth. Mobile only via computed + window width check (SSR-safe in onMounted).
3. **Clip-path animation**: On mobile, consider using a radial clip-path wipe (circle expanding from center) instead of the horizontal inset wipe for a more dramatic reveal. Computed as: `clipPath: circle(${radius}% at 50% 50%)` where radius goes from 0 to 150.
4. **Stamp entrance**: Enhance the stamp with a slight blur-to-sharp transition (filter: blur → 0) as it appears, making it feel like it's being "stamped" into focus.
5. **Haptic-style micro-interaction**: When stamp reaches full opacity, add a brief CSS scale pulse (`1 → 1.05 → 1`) via a one-shot CSS animation triggered by a class toggle when `stampProgress >= 1`.
6. **Performance**: Ensure all animated properties are GPU-composited (`transform`, `opacity`, `filter`). No layout-triggering properties. Add `will-change` hints on the animated elements.
7. **Desktop unchanged**: All mobile enhancements gated behind `@media (max-width: 639px)` or responsive Tailwind classes. Desktop keeps the horizontal slider wipe.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] Mobile scroll reveal uses radial/circle clip-path expanding from center
- [ ] Desktop scroll reveal unchanged (horizontal inset wipe)
- [ ] Stamp appears with blur-to-sharp + scale pulse
- [ ] 60fps scroll performance on mobile (only transform/opacity/filter animated)
- [ ] No layout shift during scroll transitions

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
