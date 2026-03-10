import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  // Use sub-path base for GitHub Pages (rat-falthaus.github.io/retro-fit-landing/)
  // Falls back to '/' in dev mode so localhost:5173 works without a prefix
  base: process.env.NODE_ENV === 'production' ? '/retro-fit-landing/' : '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      input: {
        app: './index.html'
      }
    }
  }
})
