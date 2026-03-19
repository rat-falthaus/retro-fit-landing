# TASK-37 — Create `useContaoFormBridge` composable

**Plan:** PLAN-009
**Role:** frontend
**Status:** done
**Dependencies:** —

---

## Goal

Create `src/composables/useContaoFormBridge.ts` — a pure Vue composable that:

1. Detects `#contao-form-source` in the DOM (client-side only)
2. Lazily moves the `<form>` (or `.confirmation`) into a caller-supplied target element ID
3. Watches with `MutationObserver` for Contao's `.confirmation` success message
4. Returns reactive `isContaoMode` and `isSuccess` refs
5. Cleans up the observer on `onUnmounted`

---

## File to create

`src/composables/useContaoFormBridge.ts`

```typescript
import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Detects a Contao-rendered form inside #contao-form-source and portals it
 * into the element identified by `targetId`.
 *
 * Returns:
 *   isContaoMode — true once #contao-form-source is found in the DOM
 *   isSuccess    — true once Contao's .confirmation node appears (post-submit)
 *
 * Falls back gracefully: if no #contao-form-source exists, both refs stay false
 * and the caller should render its own fallback form.
 */
export function useContaoFormBridge(targetId: string) {
  const isContaoMode = ref(false)
  const isSuccess = ref(false)
  let observer: MutationObserver | null = null

  onMounted(() => {
    const source = document.getElementById('contao-form-source')
    const target = document.getElementById(targetId)

    if (!source || !target) return

    isContaoMode.value = true

    // Post-reload state: Contao already replaced the form with .confirmation
    const alreadyConfirmed = source.querySelector<HTMLElement>('.confirmation')
    if (alreadyConfirmed) {
      target.appendChild(alreadyConfirmed)
      isSuccess.value = true
      return
    }

    const form = source.querySelector<HTMLFormElement>('form')
    if (!form) return

    // Physically move the form DOM node (preserves CSRF hidden inputs)
    target.appendChild(form)

    // Watch both containers for Contao's deferred .confirmation injection
    observer = new MutationObserver(() => {
      const conf =
        source.querySelector('.confirmation') ??
        target.querySelector('.confirmation')
      if (conf) {
        isSuccess.value = true
        observer?.disconnect()
        observer = null
      }
    })
    observer.observe(source, { childList: true, subtree: true })
    observer.observe(target, { childList: true, subtree: true })
  })

  onUnmounted(() => {
    observer?.disconnect()
    observer = null
  })

  return { isContaoMode, isSuccess }
}
```

---

## Acceptance

- File exists at `src/composables/useContaoFormBridge.ts`
- Returns `{ isContaoMode: Ref<boolean>, isSuccess: Ref<boolean> }`
- No `any` types; strict TypeScript
- Observer is always disconnected on unmount

## Result

Created `src/composables/useContaoFormBridge.ts`. Returns `{ isContaoMode, isSuccess }`. MutationObserver disconnected on unmount. `vue-tsc --noEmit` passes.
