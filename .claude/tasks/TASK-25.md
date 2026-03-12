---
id: TASK-25
title: PostcardBridge mobile: sticky scroll dwell with tall wrapper
role: frontend
planId: PLAN-005
status: todo
dependencies: []
createdAt: 2026-03-12T21:00:00.000Z
---

## Context
On mobile, users scroll from the hero directly past the PostcardBridge section too quickly to absorb the voucher/postcard messaging. The section needs to "dwell" — stay visible longer during scroll — so users naturally pause on it before reaching the inline form. Uses the same tall-wrapper + sticky-content pattern already proven in HeroSection.

## Files to Read
- `src/components/PostcardBridge.vue` — the section to modify
- `src/components/HeroSection.vue` — reference for the tall-wrapper + sticky pattern
- `src/App.vue` — component composition / ordering

## Implementation Steps

1. **Wrap PostcardBridge content in a tall outer container on mobile.** Add an outer `<div>` that is `~180vh` tall on mobile only (`sm:h-auto`). The existing `<section>` becomes `position: sticky; top: 0` on mobile, so its content stays in view while the user scrolls through the extra height.

2. **Use responsive classes to keep desktop unchanged.** On `sm:` and above, the outer wrapper collapses to auto height and the section is not sticky — zero visual change on desktop.

3. **Add a subtle fade-in entrance animation** for the sticky section content using scroll-driven opacity (IntersectionObserver or scroll listener), so the PostcardBridge content fades in when entering the viewport and stays visible during the dwell.

4. **SSR-safe implementation.** Any `window`/`document` access must be inside `onMounted`. Use `ref` for reactive state.

5. **No new i18n strings needed** — this is purely a layout/scroll behavior change.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] On mobile: PostcardBridge stays visible for ~80vh of scroll distance before user reaches the form
- [ ] On desktop (sm+): zero visual or behavioral change — section renders normally without sticky/dwell
- [ ] No layout shift or flash when entering/leaving the sticky section

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
- NEVER use scroll-hijacking or prevent default on scroll events — use passive CSS sticky only
