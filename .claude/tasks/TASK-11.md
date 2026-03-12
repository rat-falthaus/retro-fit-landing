---
id: TASK-11
title: "ClaimCheckModal desktop-only + new InlineClaimSection for mobile"
role: frontend
planId: PLAN-003
status: todo
dependencies: [TASK-10]
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
With ClaimCheckForm.vue extracted (TASK-10), we now create two wrappers: (1) refactor ClaimCheckModal.vue to use ClaimCheckForm and only render on desktop (md+), (2) create InlineClaimSection.vue for mobile that renders the form inline in the page flow — no dialog overlay.

## Files to Read
- `src/components/ClaimCheckForm.vue` (from TASK-10)
- `src/components/ClaimCheckModal.vue` (current — to be refactored)
- `src/i18n/de.ts`

## Implementation Steps

### Part A: Refactor ClaimCheckModal.vue (desktop only)

1. **Import ClaimCheckForm** and replace all inline form markup with `<ClaimCheckForm />`.
2. **Keep Dialog wrapper** with current `:pt` styling, header slot, footer slot.
3. **Footer slot**: Keep the submit button in the Dialog footer — pass `showSubmitButton: false` to ClaimCheckForm, and trigger form submission from footer button via a ref/method.
   - OR: let ClaimCheckForm handle its own submit button (`showSubmitButton: true`) and remove the Dialog footer button. Simpler approach.
4. **Keep the "opened" step** (success state after redirect) — this stays in the Dialog.
5. **Wrap entire template** in a container that's only mounted on desktop. Use CSS `hidden md:block` or a `v-if` based on a reactive viewport width check.
   - Preferred: Use Tailwind `class="hidden md:block"` on the outer wrapper. The Dialog is invisible on mobile via CSS, but SSR-safe (no `window` access).

### Part B: Create InlineClaimSection.vue (mobile only)

1. **Create `src/components/InlineClaimSection.vue`**:
   ```vue
   <script setup lang="ts">
   import ClaimCheckForm from './ClaimCheckForm.vue'
   import { t } from '@/i18n/de'
   
   defineProps<{ visible: boolean }>()
   const emit = defineEmits<{ (e: 'submitted'): void }>()
   </script>
   ```

2. **Template**: A full-width section (NOT a dialog) that shows when `visible` is true:
   - Outer: `<section v-if="visible" class="md:hidden">` — only shown on mobile
   - Background: `bg-white` or subtle `bg-gray-50` with top border accent
   - Max width container: `max-w-lg mx-auto px-4 py-8`
   - Header: title + subtitle (same as modal header but in section style, not dark bar)
   - `<ClaimCheckForm compact @submit="emit('submitted')" />`
   - Smooth scroll-into-view when `visible` becomes true (watch prop)

3. **Success state**: After form submit, show inline success message (same content as modal "opened" step) instead of the Dialog.

4. **Scroll behavior**: When `visible` becomes true, auto-scroll to the section using `scrollIntoView({ behavior: 'smooth', block: 'start' })`.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] ClaimCheckModal renders Dialog only on md+ screens
- [ ] InlineClaimSection renders inline form only on <md screens
- [ ] Both use the same ClaimCheckForm component
- [ ] Form validation works identically in both modes
- [ ] Desktop experience unchanged
