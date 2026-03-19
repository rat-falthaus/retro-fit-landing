import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Module-level lock: only one portal instance may hold the Contao form at a time.
 * Prevents the modal portal and inline portal from competing for #contao-form-source.
 */
let _formOwner: string | null = null

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
    // Bail if another portal instance already holds the form
    if (_formOwner !== null) return

    const source = document.getElementById('contao-form-source')
    const target = document.getElementById(targetId)

    if (!source || !target) return

    // Check for usable content (form OR post-submit confirmation)
    const alreadyConfirmed = source.querySelector<HTMLElement>('.confirmation')
    const form = source.querySelector<HTMLFormElement>('form')

    if (!alreadyConfirmed && !form) return

    // Claim ownership for this portal instance
    _formOwner = targetId
    isContaoMode.value = true

    // Post-reload state: Contao already replaced the form with .confirmation
    if (alreadyConfirmed) {
      target.appendChild(alreadyConfirmed)
      isSuccess.value = true
      return
    }

    // Physically move the form DOM node (preserves CSRF hidden inputs)
    target.appendChild(form!)

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

    // Release ownership and return nodes to source so the form can be re-claimed
    // on re-mount (e.g., Dialog closes and reopens; or resize flips layout mode)
    if (_formOwner === targetId) {
      _formOwner = null
      const source = document.getElementById('contao-form-source')
      const target = document.getElementById(targetId)
      if (source && target) {
        const form = target.querySelector('form')
        const conf = target.querySelector<HTMLElement>('.confirmation')
        if (form) source.appendChild(form)
        if (conf) source.appendChild(conf)
      }
    }
  })

  return { isContaoMode, isSuccess }
}
