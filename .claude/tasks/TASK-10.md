---
id: TASK-10
title: "Extract ClaimCheckForm.vue reusable form component"
role: frontend
planId: PLAN-003
status: todo
dependencies: [TASK-7]
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
The form currently lives inside ClaimCheckModal.vue tightly coupled with its Dialog wrapper. To support both a desktop Dialog and a mobile inline section, we must extract the form (fields, validation, shake animation, submission logic) into a standalone reusable component `ClaimCheckForm.vue`. This is the architectural pivot for the mobile-inline-form strategy.

## Files to Read
- `src/components/ClaimCheckModal.vue` (full file — extract form logic from here)
- `src/i18n/de.ts` (modal section strings)
- `src/types/index.ts`

## Implementation Steps

1. **Create `src/components/ClaimCheckForm.vue`** — a `<script setup lang="ts">` component containing:
   - `GatewayFormData` interface (move from ClaimCheckModal)
   - `formData` ref, `errors` ref, `shakingFields` ref
   - `EMAIL_REGEX`, `PHONE_REGEX` constants
   - `validate()` function
   - `buildPrefillUrl()` function
   - `handleSubmit()` — calls validate, shows toast, emits `submit` event on success
   - All 3 fieldsets (contact, machine, optional) with identical field markup
   - Shake animation styles (`@keyframes field-shake` in `<style scoped>`)

2. **Props for the new component**:
   ```typescript
   defineProps<{
     compact?: boolean  // true = tighter spacing for inline mobile layout
   }>()
   ```
   When `compact` is true: use `space-y-3` instead of `space-y-5`, smaller legends, etc.

3. **Emits**:
   ```typescript
   defineEmits<{
     (e: 'submit'): void          // form successfully submitted (new tab opened)
     (e: 'validationFail'): void  // validation failed (parent can react)
   }>()
   ```

4. **The submit button**: Include it inside the form component (at the bottom) with a prop to control whether it's shown (for when the Dialog footer handles it instead). OR always include it in the form and let the parent handle via `#footer` slot override.
   - Recommend: add `showSubmitButton` prop (default `true`). When `false`, the form just emits `submit` from external trigger.

5. **Toast**: `useToast()` stays inside the form — it's available from the global ToastService.

6. **Do NOT delete or modify ClaimCheckModal.vue yet** — that's TASK-11. Just create the new component.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] `ClaimCheckForm.vue` is a valid Vue component with all form fields
- [ ] Component accepts `compact` and `showSubmitButton` props
- [ ] Emits `submit` and `validationFail` events
- [ ] Form validation + shake + toast work standalone
