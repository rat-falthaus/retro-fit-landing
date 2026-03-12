---
id: TASK-22
title: "InlineClaimSection mobile: flat borderless form + progress dots"
role: frontend
planId: PLAN-004
status: todo
dependencies: [TASK-17]
createdAt: "2026-03-12T18:30:00.000Z"
---

## Context
The inline form on mobile is currently inside a bordered card which creates a "panel-in-a-page" feel. For the 2026 redesign, the form should feel like a native part of the page — no card border, no box shadow. Fields flow directly in the page. A 3-dot progress indicator at the top shows which fieldset group the user is in (Contact / Machine / Details), making the long form feel manageable. The submit button sits naturally below the last field.

## Files to Read
- `src/components/InlineClaimSection.vue` — full file
- `src/components/ClaimCheckForm.vue` — full file (fieldset structure)
- `src/i18n/de.ts` — `t.inlineForm.stepLabels` from TASK-17

## Implementation Steps
1. **Remove card wrapper**: In `InlineClaimSection.vue`, remove the `bg-white rounded-2xl shadow-xl overflow-hidden` div with the orange border. Let the form content flow directly inside the section.
2. **Section background**: Keep `bg-rex-warm` on the section. Form fields will have white backgrounds individually (each input already has white bg from PrimeVue).
3. **Progress dots**: Add a 3-step indicator at the top of the form area:
   - 3 dots with labels from `t.inlineForm.stepLabels` (["Kontakt", "Maschine", "Details"])
   - Active dot: `w-3 h-3 rounded-full bg-rex-orange`
   - Inactive dot: `w-3 h-3 rounded-full bg-gray-300`
   - Connected by a thin line: `h-px bg-gray-300 flex-1`
   - Track which fieldset group is visible using a simple scroll-spy or IntersectionObserver on the 3 fieldset elements inside ClaimCheckForm.
4. **ClaimCheckForm enhancement**: Add `id` attributes to each `<fieldset>` for scroll-spy targeting: `contact-fields-${formId}`, `machine-fields-${formId}`, `details-fields-${formId}`. Expose a `fieldsetIds` getter or just use convention.
5. **Smooth field grouping**: Add visual spacing between fieldset groups (`mb-8`) with a subtle divider (thin line or extra padding).
6. **Submit button**: Already flat below form from previous fix. Ensure it has prominent rex-orange styling and full width.
7. **Header**: Keep the section title/subtitle but remove the badge pill — use a simpler layout with just the heading and one-line description.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] No card border/shadow wrapping the form on mobile
- [ ] Progress dots visible showing 3 steps
- [ ] Active step highlights as user scrolls through form fields
- [ ] Submit button below last field, full-width, no sticky footer
- [ ] Desktop modal form unaffected (ClaimCheckModal unchanged)

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
