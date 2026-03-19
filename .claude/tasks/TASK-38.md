# TASK-38 — Create `ContaoFormPortal.vue` component

**Plan:** PLAN-009
**Role:** frontend
**Status:** done
**Dependencies:** TASK-37

---

## Goal

Create `src/components/ContaoFormPortal.vue` — a thin wrapper that:

1. Always renders a `<div :id="placeholderId">` in the DOM (v-show, not v-if, so the
   composable can find it synchronously in `onMounted`)
2. Uses `useContaoFormBridge(placeholderId)` to detect and portal the Contao form
3. Exposes a `#fallback` named slot rendered when NOT in Contao mode
4. Emits `contao-mode-detected` and `success` events so parents can react

---

## File to create

`src/components/ContaoFormPortal.vue`

```vue
<script setup lang="ts">
import { watch } from 'vue'
import { useContaoFormBridge } from '@/composables/useContaoFormBridge'

const props = defineProps<{
  /** Must be unique per page — used as the portal target element ID */
  placeholderId: string
}>()

const emit = defineEmits<{
  (e: 'contao-mode-detected'): void
  (e: 'success'): void
}>()

const { isContaoMode, isSuccess } = useContaoFormBridge(props.placeholderId)

watch(isContaoMode, (val) => { if (val) emit('contao-mode-detected') })
watch(isSuccess,    (val) => { if (val) emit('success') })
</script>

<template>
  <!--
    Portal target: always in DOM (v-show, not v-if) so onMounted can find it
    immediately via getElementById. Hidden until Contao form is detected.
  -->
  <div
    :id="props.placeholderId"
    class="contao-form-portal"
    v-show="isContaoMode && !isSuccess"
  />

  <!--
    Fallback slot: shown when mounted and no Contao source was found.
    Hosts <ClaimCheckForm> in both modal and inline contexts.
  -->
  <slot v-if="!isContaoMode" name="fallback" />
</template>
```

> **Note:** There is no explicit "isMounted" guard here because the fallback slot is
> `v-if="!isContaoMode"`. On the server and before mount, `isContaoMode = false`, so
> the fallback renders. Once `onMounted` fires and detects Contao source, `isContaoMode`
> flips to true and the fallback is removed — a single reactive swap with no flash.

---

## Acceptance

- File exists at `src/components/ContaoFormPortal.vue`
- Renders portal `<div>` + fallback slot correctly
- Emits `contao-mode-detected` and `success` when state transitions
- No `any`, no Options API, uses `<script setup lang="ts">`

## Result

Created `src/components/ContaoFormPortal.vue`. Portal div always in DOM (v-show). Fallback slot shown when no Contao source. Emits `contao-mode-detected` + `success`.
