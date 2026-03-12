---
id: TASK-21
title: "Mobile social-proof strip: animated stats counters"
role: frontend
planId: PLAN-004
status: todo
dependencies: [TASK-17]
createdAt: "2026-03-12T18:30:00.000Z"
---

## Context
Between the hero reveal and the form, mobile users need visual social proof — not just text. A horizontal strip of 3-4 key stats with count-up animation on scroll-into-view adds credibility and visual interest without reading. This is mobile-only; desktop uses the existing sections.

## Files to Read
- `src/i18n/de.ts` — `t.stats.*` keys from TASK-17
- `src/App.vue` — component order, where to insert
- `src/style.css` — brand tokens

## Implementation Steps
1. **Create `SocialProofStrip.vue`**: New component in `src/components/`.
2. **Layout**: Horizontal scrollable strip on mobile (`flex overflow-x-auto snap-x snap-mandatory gap-4 px-4 py-8 md:hidden`). Each stat card is a `snap-center min-w-[140px]` pill.
3. **Stat cards**: Each card has:
   - Large number (`text-3xl font-display font-black text-rex-orange`) — count-up animated
   - Label below (`text-xs text-rex-slate font-medium uppercase tracking-wider`)
   - Subtle background: `bg-white rounded-2xl shadow-sm p-4 text-center`
4. **Count-up animation**: Use `IntersectionObserver` (SSR-safe, wrapped in `onMounted`) to trigger a `requestAnimationFrame` counter from 0 to target over 1.5s with easeOutQuart. Numbers: "35+" (years), "500+" (projects), "40%" (savings), "99.2%" (uptime).
5. **Stats data**: Use `t.stats.yearsValue`, `t.stats.yearsLabel`, etc. from i18n. Parse numeric values for animation target.
6. **Insert in App.vue**: Add between `PostcardBridge` and `InlineClaimSection`. Import and render as `<SocialProofStrip />`.
7. **AOS**: `data-aos="fade-up"` on the container.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] SocialProofStrip renders only on mobile (`md:hidden`)
- [ ] Stats count up from 0 when scrolled into view
- [ ] Horizontal scroll with snap alignment
- [ ] No SSR errors (IntersectionObserver only in onMounted)
- [ ] Component registered in App.vue between PostcardBridge and InlineClaimSection

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
