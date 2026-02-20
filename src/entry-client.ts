import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import AOS from 'aos'
import 'aos/dist/aos.css'
import 'primeicons/primeicons.css'
import './style.css'
import App from './App.vue'

const app = createApp(App)

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

app.mount('#app')

// Initialize AOS on client
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true,
  offset: 100
})
