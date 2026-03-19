---
id: TASK-31
title: "ClaimCheckForm: formStep prop + validateStep1() + machineDocs vertical layout"
role: implementation
planId: PLAN-007
status: done
dependencies: [TASK-30]
createdAt: 2026-03-19T11:00:00.000Z
completedAt: 2026-03-19T11:30:00.000Z
---

## Result
- Added `formStep?: 1 | 2 | 'all'` prop (default `'all'`) — inline form unchanged
- Added `validateStep1()` with shake+toast on error; exposed via `defineExpose`
- Wrapped each fieldset in `v-show` by formStep value
- Changed machineDocs checkbox wrapper from `flex flex-wrap gap-3` to `flex flex-col gap-2`

## Context
`ClaimCheckForm.vue` must conditionally render sections by a new `formStep` prop.
Also fix machineDocs checkbox group to stack vertically.

## Files to Edit
- `src/components/ClaimCheckForm.vue`

## Implementation Steps

### 1. Props
Add `formStep` prop:
```ts
const props = withDefaults(defineProps<{
  formId?: string
  formStep?: 1 | 2 | 'all'
}>(), {
  formId: 'gw',
  formStep: 'all',
})
```

### 2. Expose validateStep1()
Add a method that validates only the Machine section fields and expose it:
```ts
const validateStep1 = (): boolean => {
  const e: Partial<Record<keyof GatewayFormData, string>> = {}
  if (!formData.value.machineType.trim()) e.machineType = 'Pflichtfeld'
  if (!formData.value.machineAge) e.machineAge = 'Pflichtfeld'
  if (!formData.value.servicePartner) e.servicePartner = 'Pflichtfeld'
  if (!formData.value.spareParts) e.spareParts = 'Pflichtfeld'
  if (!formData.value.recentIssues) e.recentIssues = 'Pflichtfeld'
  errors.value = { ...errors.value, ...e }
  if (Object.keys(e).length > 0) {
    shakingFields.value = Object.keys(e) as (keyof GatewayFormData)[]
    setTimeout(() => { shakingFields.value = [] }, 600)
    toast.add({
      severity: 'warn',
      summary: t.modal.validationToastTitle,
      detail: t.modal.validationToastDetail,
      life: 4000,
    })
    return false
  }
  return true
}
```
Update `defineExpose`: `defineExpose({ submitForm, reset, validateStep1 })`

### 3. Conditional section rendering
Wrap each fieldset in `v-show` (not v-if — keeps DOM stable for validation):
- Machine fieldset: `v-show="props.formStep === 'all' || props.formStep === 1"`
- Contact fieldset: `v-show="props.formStep === 'all' || props.formStep === 2"`
- Optional fieldset: `v-show="props.formStep === 'all' || props.formStep === 2"`

### 4. machineDocs vertical layout
Change `.flex.flex-wrap.gap-3` to `.flex.flex-col.gap-2` on the Checkbox group wrapper.

## Acceptance Criteria
- [ ] `formStep` prop defaults to `'all'` — inline form unaffected
- [ ] Machine fieldset hidden when `formStep === 2`
- [ ] Contact + Optional fieldsets hidden when `formStep === 1`
- [ ] `validateStep1()` exposed and only validates machine fields
- [ ] machineDocs checkboxes stack vertically
- [ ] No TypeScript errors
