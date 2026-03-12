import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createHead, renderHeadToString } from '@vueuse/head'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura'
import App from './App.vue'

export async function render() {
  const app = createSSRApp(App)
  
  // Setup head management
  const head = createHead()
  app.use(head)
  
  // Setup PrimeVue
  app.use(PrimeVue, {
    theme: {
      preset: Aura,
      options: {
        prefix: 'p',
        darkModeSelector: 'system',
        cssLayer: false
      }
    },
    ripple: true
  })
  app.use(ToastService)

  // Render app to HTML string
  const appHtml = await renderToString(app)
  
  // Render head tags (uses @vueuse/head's internal renderHeadToString for v1 compatibility)
  const headResult = await renderHeadToString(head)
  
  return {
    appHtml,
    headTags: headResult.headTags,
    htmlAttrs: headResult.htmlAttrs || '',
    bodyAttrs: headResult.bodyAttrs || '',
    bodyTags: headResult.bodyTagsOpen || ''
  }
}
