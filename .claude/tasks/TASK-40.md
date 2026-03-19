# TASK-40 — Integrate `ContaoFormPortal` into `InlineClaimSection.vue`

**Plan:** PLAN-009
**Role:** frontend
**Status:** done
**Dependencies:** TASK-38

---

## Goal

Modify `src/components/InlineClaimSection.vue` so that:

1. `ContaoFormPortal` wraps `ClaimCheckForm` with `placeholderId="inline-contao-form"` in
   the `#fallback` slot
2. The "Retrofit-Check absenden" submit button is hidden in Contao mode (Contao form has
   its own submit)
3. The privacy note paragraph is hidden in Contao mode
4. On `@success` from the portal, `step` advances to `'opened'` — existing success screen
   is shown (unchanged)

---

## Changes to `src/components/InlineClaimSection.vue`

### Script additions:

```typescript
import ContaoFormPortal from './ContaoFormPortal.vue'

const isContaoMode = ref(false)
```

### Template — wrap ClaimCheckForm + button:

Replace:
```html
<template v-else>
  <div data-aos="fade-up" data-aos-delay="100">
    <ClaimCheckForm ref="formRef" form-id="inline" @success="step = 'opened'" />
    <button type="button" class="w-full btn-primary py-4 text-base font-bold text-center mt-8"
            @click="formRef?.submitForm()">
      {{ t.modal.submit }}
    </button>
    <p class="text-xs text-gray-500 text-center mt-3">{{ t.modal.privacyNote }}</p>
  </div>
</template>
```

With:
```html
<template v-else>
  <div data-aos="fade-up" data-aos-delay="100">
    <ContaoFormPortal
      placeholder-id="inline-contao-form"
      @contao-mode-detected="isContaoMode = true"
      @success="step = 'opened'"
    >
      <template #fallback>
        <ClaimCheckForm ref="formRef" form-id="inline" @success="step = 'opened'" />
        <button type="button" class="w-full btn-primary py-4 text-base font-bold text-center mt-8"
                @click="formRef?.submitForm()">
          {{ t.modal.submit }}
        </button>
        <p class="text-xs text-gray-500 text-center mt-3">{{ t.modal.privacyNote }}</p>
      </template>
    </ContaoFormPortal>
  </div>
</template>
```

---

## Acceptance

- `InlineClaimSection.vue` imports and uses `ContaoFormPortal`
- In standalone mode: existing ClaimCheckForm + submit button + privacy note render as before
- In Contao mode: Contao form rendered, no duplicate submit button
- `@success` sets `step = 'opened'` → success screen shows
- No TypeScript errors

## Result

Modified `InlineClaimSection.vue`: added `ContaoFormPortal` import + `isContaoMode` ref; wrapped `ClaimCheckForm` + submit button + privacy note inside portal `#fallback` slot.
