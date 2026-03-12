---
id: TASK-5
title: Rework ClaimCheckModal for gateway+redirect flow
role: frontend
planId: PLAN-002
status: todo
dependencies: [TASK-4]
createdAt: 2026-03-12T10:00:00.000Z
---

## Context
The ClaimCheckModal currently collects 6 fields and simulates a fake API call (setTimeout).
The actual conversion form lives at `https://rex-at.de/landingpage-retrofit.html` (Contao CMS),
which is iframeable only from the same origin (X-Frame-Options: SAMEORIGIN blocks us).

The new flow:
1. **Input step**: 3 mandatory fields — Name, Email, Phone — collected in a clean,
   low-friction form. Emitting `openClaimModal` is unchanged; the `visible` v-model binding
   in App.vue does not change.
2. **Opened step**: After clicking CTA, we build a URL with the user's data as query params,
   call `window.open(url, '_blank', 'noopener,noreferrer')`, then switch to a success state
   that confirms the tab opened and shows a manual fallback link.

URL params passed to rex-at.de (matching real Contao field names):
- `Name_Ansprechpartner` → user's name
- `Email` → user's email
- `Telefon` → user's phone

Target URL: `https://rex-at.de/landingpage-retrofit.html`

## Files to Read
- `src/components/ClaimCheckModal.vue` — full current implementation to replace
- `src/i18n/de.ts` — t.modal keys after TASK-4 (title, subtitle, name, email, phone,
  submit, privacyNote, required, openedTitle, openedText, openedFallback,
  openedFallbackLink, openedClose)
- `src/types/index.ts` — verify no shared type needs adding (GatewayFormData stays local)
- `src/style.css` — brand tokens: forest-green, industrial-amber, tech-slate

## Implementation Steps

### Step 1 — Rewrite `<script setup lang="ts">`

```typescript
<script setup lang="ts">
import { ref, computed } from 'vue'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { t } from '@/i18n/de'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

interface GatewayFormData {
  name: string
  email: string
  phone: string
}

type ModalStep = 'input' | 'opened'

const step = ref<ModalStep>('input')

const formData = ref<GatewayFormData>({
  name: '',
  email: '',
  phone: '',
})

const externalFormUrl = 'https://rex-at.de/landingpage-retrofit.html'

const isFormValid = computed(
  () => formData.value.name.trim() !== '' &&
        formData.value.email.trim() !== '' &&
        formData.value.phone.trim() !== ''
)

const buildPrefillUrl = (): string => {
  const params = new URLSearchParams({
    Name_Ansprechpartner: formData.value.name.trim(),
    Email: formData.value.email.trim(),
    Telefon: formData.value.phone.trim(),
  })
  return `${externalFormUrl}?${params.toString()}`
}

const handleSubmit = () => {
  if (!isFormValid.value) return
  window.open(buildPrefillUrl(), '_blank', 'noopener,noreferrer')
  step.value = 'opened'
}

const closeDialog = () => {
  emit('update:visible', false)
  // Reset after CSS transition completes
  setTimeout(() => {
    step.value = 'input'
    formData.value = { name: '', email: '', phone: '' }
  }, 300)
}
</script>
```

### Step 2 — Rewrite `<template>`

Replace the entire template with:

```html
<template>
  <Dialog
    :visible="props.visible"
    @update:visible="closeDialog"
    modal
    :closable="true"
    :style="{ width: '90vw', maxWidth: '560px' }"
    :pt="{
      root: { class: 'rounded-2xl' },
      header: { class: 'bg-forest-green text-white rounded-t-2xl' },
      content: { class: 'p-6' },
    }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-industrial-amber rounded-lg flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-display font-bold">{{ t.modal.title }}</h2>
          <p class="text-white/90 text-sm">{{ t.modal.subtitle }}</p>
        </div>
      </div>
    </template>

    <!-- Step: opened (success) -->
    <div v-if="step === 'opened'" class="text-center py-8 space-y-4">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-2xl font-display font-bold text-forest-green">{{ t.modal.openedTitle }}</h3>
      <p class="text-tech-slate/80 text-sm leading-relaxed max-w-sm mx-auto">{{ t.modal.openedText }}</p>
      <p class="text-xs text-tech-slate/60">
        {{ t.modal.openedFallback }}
        <a
          :href="externalFormUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-industrial-amber font-semibold underline hover:text-amber-600 ml-1"
        >{{ t.modal.openedFallbackLink }}</a>
      </p>
      <Button
        :label="t.modal.openedClose"
        class="btn-primary mt-2"
        @click="closeDialog"
      />
    </div>

    <!-- Step: input (gateway form) -->
    <form v-else @submit.prevent="handleSubmit" class="space-y-4" novalidate>
      <!-- Name -->
      <div>
        <label for="gw-name" class="block text-sm font-semibold text-tech-slate mb-1">
          {{ t.modal.name }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
        </label>
        <InputText
          id="gw-name"
          v-model="formData.name"
          autocomplete="name"
          class="w-full"
          :placeholder="t.modal.namePlaceholder"
          required
        />
      </div>

      <!-- Email -->
      <div>
        <label for="gw-email" class="block text-sm font-semibold text-tech-slate mb-1">
          {{ t.modal.email }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
        </label>
        <InputText
          id="gw-email"
          v-model="formData.email"
          type="email"
          autocomplete="email"
          class="w-full"
          :placeholder="t.modal.emailPlaceholder"
          required
        />
      </div>

      <!-- Phone -->
      <div>
        <label for="gw-phone" class="block text-sm font-semibold text-tech-slate mb-1">
          {{ t.modal.phone }} <span class="text-red-500" aria-label="Pflichtfeld">*</span>
        </label>
        <InputText
          id="gw-phone"
          v-model="formData.phone"
          type="tel"
          autocomplete="tel"
          class="w-full"
          :placeholder="t.modal.phonePlaceholder"
          required
        />
      </div>

      <!-- Submit -->
      <div class="pt-2">
        <Button
          type="submit"
          :disabled="!isFormValid"
          :label="t.modal.submit"
          class="w-full btn-primary py-4 text-base font-bold disabled:opacity-50 disabled:cursor-not-allowed"
        />
        <p class="text-xs text-tech-slate/60 text-center mt-3">{{ t.modal.privacyNote }}</p>
      </div>
    </form>
  </Dialog>
</template>
```

### Step 3 — Verify App.vue is unaffected
- `ClaimCheckModal` is used with `:visible="isModalVisible"` and `@update:visible` — this pattern is unchanged.
- The `(e: 'submit', data: FormData)` emit is being removed. Check `App.vue` for any handler
  on `@submit` from ClaimCheckModal and remove that handler if present (or just leave it —
  extra emit listeners are harmless, but emit declaration must be cleaned up from the component).

### Step 4 — SSR safety
- `window.open()` is called only inside `handleSubmit` which runs on user click — safe,
  never called during SSR prerender.
- `new URLSearchParams(...)` is available in Node 18+ globally — SSR-safe in Node 24.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages)
- [ ] Modal opens correctly from CTA button
- [ ] Clicking submit with all 3 fields filled opens rex-at.de in a new browser tab
- [ ] URL includes correct query params: `?Name_Ansprechpartner=...&Email=...&Telefon=...`
- [ ] Modal transitions to "opened" state
- [ ] Fallback link renders correctly and opens rex-at.de in new tab
- [ ] Forms resets on modal close (300 ms delay for animation)
- [ ] `isSubmitting` ref is completely removed (no loading spinner / delay needed)
- [ ] No `any` types anywhere in the file
