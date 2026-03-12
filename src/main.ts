import { ViteSSG } from 'vite-ssg'
import type { ViteSSGContext } from 'vite-ssg'
import { createHead } from '@vueuse/head'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Aura from '@primeuix/themes/aura'
import 'aos/dist/aos.css'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'
import { createWebHistory, RouterOptions } from 'vue-router'

export const routerOptions:RouterOptions = {
  history: createWebHistory(),
  routes: []
}
    
export const createApp = ViteSSG(
  App,
  routerOptions,
  ({ app }: ViteSSGContext) => {
    // Install plugins
    const head = createHead()
    app.use(head)
    
    app.use(PrimeVue, {
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: false,
          cssLayer: false
        }
      },
      ripple: true
    })
    app.use(ToastService)

    // Initialize AOS only on client side
    if (!import.meta.env.SSR) {
      import('aos').then((AOS) => {
        AOS.default.init({
          duration: 800,
          easing: 'ease-in-out',
          once: true,
          offset: 100
        })
      })
    }
  }
)
