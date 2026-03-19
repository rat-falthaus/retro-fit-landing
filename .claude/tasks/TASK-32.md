---
id: TASK-32
title: "ClaimCheckModal: 2-step wizard UI (step indicator, Next/Back/Submit footer)"
role: implementation
planId: PLAN-007
status: done
dependencies: [TASK-31]
createdAt: 2026-03-19T11:00:00.000Z
completedAt: 2026-03-19T11:35:00.000Z
---

## Result
- Added `dialogStep: 1 | 2` ref + `goNext()` (calls validateStep1) + `goBack()`
- `closeDialog` resets `dialogStep` to 1
- Added step indicator (two numbered pills + connector line) inside `<template #header>`  
- Passes `:form-step="dialogStep"` to `<ClaimCheckForm>`
- Step 1 footer: single wide "Weiter →" button
- Step 2 footer: "← Zurück" + full-width "Retrofit-Check absenden →" side by side

## Context
`ClaimCheckModal.vue` needs a `dialogStep: 1 | 2` ref, step indicator in the header area (below title), and dynamic footer buttons (Next on step 1, Back+Submit on step 2).

## Files to Edit
- `src/components/ClaimCheckModal.vue`

## Implementation Steps

### 1. Script changes
Add `dialogStep` ref and navigation handlers:
```ts
const dialogStep = ref<1 | 2>(1)

const goNext = () => {
  if (formRef.value?.validateStep1()) {
    dialogStep.value = 2
  }
}
const goBack = () => { dialogStep.value = 1 }
```
Reset `dialogStep` in `closeDialog`:
```ts
const closeDialog = () => {
  emit('update:visible', false)
  setTimeout(() => {
    formRef.value?.reset()
    step.value = 'input'
    dialogStep.value = 1
  }, 300)
}
```

### 2. Header: step indicator
Inside `<template #header>`, below the title block, add step indicator pills (only when `step === 'input'`):
```vue
<div v-if="step === 'input'" class="flex items-center gap-2 mt-3">
  <div
    v-for="n in 2" :key="n"
    class="flex items-center gap-1"
  >
    <div
      class="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-200"
      :class="dialogStep >= n ? 'bg-industrial-amber text-white' : 'bg-white/20 text-white/60'"
    >{{ n }}</div>
    <span
      class="text-xs transition-colors duration-200"
      :class="dialogStep >= n ? 'text-white' : 'text-white/50'"
    >{{ n === 1 ? t.modal.dialogStep1Label : t.modal.dialogStep2Label }}</span>
    <div v-if="n === 1" class="w-6 h-px mx-1" :class="dialogStep === 2 ? 'bg-industrial-amber' : 'bg-white/20'" />
  </div>
</div>
```

### 3. Pass formStep to ClaimCheckForm
```vue
<ClaimCheckForm
  v-else
  ref="formRef"
  form-id="modal"
  :form-step="dialogStep"
  @success="step = 'opened'"
/>
```

### 4. Footer: dynamic buttons
Replace the `v-if="step === 'input'"` footer block:
```vue
<template v-if="step === 'input'" #footer>
  <!-- Step 1: Next -->
  <template v-if="dialogStep === 1">
    <Button
      type="button"
      :label="t.modal.dialogStepNext + ' →'"
      class="w-full btn-primary py-4 text-base font-bold"
      @click="goNext"
    />
  </template>
  <!-- Step 2: Back + Submit -->
  <template v-else>
    <div class="flex gap-3">
      <Button
        type="button"
        :label="'← ' + t.modal.dialogStepBack"
        class="btn-secondary py-4 px-6 text-base font-semibold"
        @click="goBack"
      />
      <Button
        type="button"
        :label="t.modal.submit"
        class="flex-1 btn-primary py-4 text-base font-bold"
        @click="formRef?.submitForm()"
      />
    </div>
  </template>
  <p class="text-xs text-gray-500 text-center mt-3">{{ t.modal.privacyNote }}</p>
</template>
```

## Acceptance Criteria
- [ ] Step indicator shows 2 numbered pills in header
- [ ] Step 1 footer: single "Weiter →" button, validates machine fields before proceeding
- [ ] Step 2 footer: "← Zurück" + "Absenden" side-by-side
- [ ] `dialogStep` resets to 1 on dialog close
- [ ] `formStep` prop passed to `ClaimCheckForm` so sections show/hide correctly
- [ ] No TypeScript errors
