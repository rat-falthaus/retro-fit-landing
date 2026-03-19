# TASK-39 — Integrate `ContaoFormPortal` into `ClaimCheckModal.vue`

**Plan:** PLAN-009
**Role:** frontend
**Status:** done
**Dependencies:** TASK-38

---

## Goal

Modify `src/components/ClaimCheckModal.vue` so that:

1. A new `isContaoMode` ref tracks whether Contao mode was detected
2. `ContaoFormPortal` wraps `ClaimCheckForm` with `placeholderId="modal-contao-form"` in
   the `#fallback` slot
3. The 2-step wizard footer (Next / Back / Submit buttons) is hidden in Contao mode, because
   the Contao form has its own submit button
4. The step indicator dots are hidden in Contao mode
5. On `@success` from the portal, `step` advances to `'opened'` (same as existing path)

---

## Changes to `src/components/ClaimCheckModal.vue`

### Script additions (after existing `step` / `dialogStep` refs):

```typescript
import ContaoFormPortal from './ContaoFormPortal.vue'

const isContaoMode = ref(false)
```

### Template — wrap ClaimCheckForm:

Replace:
```html
<!-- Input step — shared ClaimCheckForm -->
<ClaimCheckForm v-else ref="formRef" form-id="modal" :form-step="dialogStep" @success="step = 'opened'" />
```

With:
```html
<!-- Input step — Contao portal (Contao mode) or internal gateway form -->
<ContaoFormPortal
  v-else
  placeholder-id="modal-contao-form"
  @contao-mode-detected="isContaoMode = true"
  @success="step = 'opened'"
>
  <template #fallback>
    <ClaimCheckForm ref="formRef" form-id="modal" :form-step="dialogStep" @success="step = 'opened'" />
  </template>
</ContaoFormPortal>
```

### Step indicator — hide in Contao mode:

```html
<!-- before: v-if="step === 'input'" -->
<div v-if="step === 'input' && !isContaoMode" ...>
```

### Footer — hide in Contao mode:

```html
<template v-if="step === 'input' && !isContaoMode" #footer>
```

---

## Acceptance

- `ClaimCheckModal.vue` imports and uses `ContaoFormPortal`
- When `#contao-form-source` absent: existing 2-step ClaimCheckForm renders as before
- When `#contao-form-source` present: Contao form shown, wizard footer hidden
- `@success` from portal sets `step = 'opened'` → success screen shows
- No TypeScript errors

## Result

Modified `ClaimCheckModal.vue`: added `ContaoFormPortal` import + `isContaoMode` ref; wrapped `ClaimCheckForm` in portal `#fallback` slot; step indicator + footer hidden in Contao mode.
