---
id: TASK-28
title: "ClaimCheckForm: SelectButton radios + Checkbox machineDocs + buildPrefillUrl fixes"
role: implementation
planId: PLAN-006
status: done
dependencies: [TASK-27]
createdAt: 2026-03-19T10:00:00.000Z
completedAt: 2026-03-19T10:20:00.000Z
---

## Result
- Added `import SelectButton from 'primevue/selectbutton'` and `import Checkbox from 'primevue/checkbox'`
- Removed local `machineDocsOptions` array (now in `de.ts`)
- Changed interface: `machineDocs?: string` → `machineDocs?: string[]`
- Changed `emptyForm.machineDocs: ''` → `machineDocs: []`
- Updated `buildPrefillUrl`: appends `address` (companyAddress) and `docs` (machineDocs joined)
- Replaced all 3 native `<input type="radio">` groups with `<SelectButton>` using `optionLabel`, `optionValue`, `:invalid`, `:allowEmpty="false"`
- Added `<Checkbox>` multi-select group for `machineDocs` at bottom of Machine fieldset

## Context
Replace 3× native radio groups with PrimeVue `SelectButton`. Activate `machineDocsOptions` as a `Checkbox` multi-select. Fix `machineDocs` type to `string[]`. Wire `companyAddress` + `machineDocs` into `buildPrefillUrl`. Remove local `machineDocsOptions` array (now in i18n).

## Files to Edit
- `src/components/ClaimCheckForm.vue`

## Implementation Steps

### Script changes
1. Add imports: `import SelectButton from 'primevue/selectbutton'` and `import Checkbox from 'primevue/checkbox'`
2. Remove local `machineDocsOptions` array
3. Change interface: `machineDocs?: string` → `machineDocs?: string[]`
4. Change `emptyForm.machineDocs`: `''` → `[]`
5. Update `buildPrefillUrl`:
   - Add: `if (formData.value.companyAddress?.trim()) entries.address = formData.value.companyAddress.trim()`
   - Add: `if (formData.value.machineDocs?.length) entries.docs = formData.value.machineDocs.join(',')`

### Template changes (Machine fieldset)
6. Replace each `<div class="flex gap-4">` + `<label v-for>` + `<input type="radio">` block for servicePartner, spareParts, recentIssues with:
```vue
<SelectButton
  v-model="formData.FIELD"
  :options="[...t.modal.FOO_OPTIONS]"
  optionLabel="label"
  optionValue="value"
  :invalid="!!errors.FIELD"
/>
```

7. Add machineDocs Checkbox group after recentIssues div, before closing `</fieldset>`:
```vue
<!-- Machine Docs -->
<div>
  <span class="block text-sm font-semibold text-gray-800 mb-1">
    {{ t.modal.machineDocs }}
  </span>
  <div class="flex flex-wrap gap-3 mt-1">
    <div
      v-for="opt in t.modal.machineDocsOptions"
      :key="opt.value"
      class="flex items-center gap-2"
    >
      <Checkbox
        :inputId="`${formId}-docs-${opt.value}`"
        v-model="formData.machineDocs"
        :value="opt.value"
      />
      <label
        :for="`${formId}-docs-${opt.value}`"
        class="text-sm text-gray-800 cursor-pointer select-none"
      >{{ opt.label }}</label>
    </div>
  </div>
</div>
```

## Acceptance Criteria
- [ ] All 3 radio groups replaced by `<SelectButton>`
- [ ] `machineDocs` Checkbox group rendered, model is `string[]`
- [ ] Local `machineDocsOptions` array removed
- [ ] `buildPrefillUrl` appends `address` and `docs` params
- [ ] No TypeScript errors
