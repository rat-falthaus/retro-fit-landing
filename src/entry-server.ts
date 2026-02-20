import { createSSRApp } from 'vue'
import { renderToString } from 'vue/server-renderer'
import { createHead } from '@vueuse/head'
import { renderSSRHead } from '@unhead/ssr'
import PrimeVue from 'primevue/config'
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

  // Render app to HTML string
  const appHtml = await renderToString(app)
  
  // Render head tags
  const headResult = await renderSSRHead(head)
  
  return {
    appHtml,
    headTags: headResult.headTags,
    htmlAttrs: headResult.htmlAttrs || '',
    bodyAttrs: headResult.bodyAttrs || '',
    bodyTags: headResult.bodyTagsOpen || ''
  }
}
