# SmartHarvest Landing Page

> **Upgrade the Iron. Keep the Legacy.**

A high-performance, statically-generated Vue 3 landing page for SmartHarvest agricultural equipment retro-fitting services. Built with TypeScript, Vite, Tailwind CSS v4, and PrimeVue 4.

![Node.js 24+](https://img.shields.io/badge/node-%3E%3D24.0.0-brightgreen)
![Vue 3.5](https://img.shields.io/badge/vue-3.5.28-42b883)
![TypeScript](https://img.shields.io/badge/typescript-5.9.3-blue)
![Tailwind CSS v4](https://img.shields.io/badge/tailwind-4.2.0-38bdf8)

## 🎯 Project Overview

**Tagline:** "Upgrade the Iron. Keep the Legacy."

This landing page promotes the retro-fitting of legacy agricultural equipment with modern precision farming technology, offering visitors a €2,000 free compatibility check.

---

## 🚀 Features

- ✅ **Static Site Generation (SSG)** - Pre-rendered HTML for optimal SEO and performance
- ✅ **TypeScript Strict Mode** - Full type safety throughout the application
- ✅ **Tailwind CSS v4** - Latest CSS-first framework with @theme variables
- ✅ **PrimeVue 4** - Modern UI components with Aura theme
- ✅ **SEO Optimized** - Complete meta tags (OpenGraph, Twitter Cards, canonical URLs)
- ✅ **Responsive Design** - Mobile-first approach with beautiful animations
- ✅ **Accessibility** - WCAG compliant components and semantic HTML
- ✅ **Performance** - 102KB JS (gzipped), 11KB CSS (gzipped)

---

## � Prerequisites

- **Node.js 24+** (enforced via `.nvmrc`)
- **npm** or **pnpm**

### Install Node 24 (if needed)

```bash
nvm install 24
nvm use 24
```

---

## 🛠️ Installation

```bash
# Clone the repository
git clone <repository-url>
cd retro-fit-landing

# Ensure correct Node version
nvm use

# Install dependencies
npm install
```

---

## 🏃 Development

```bash
# Start development server with hot-reload
npm run dev

# Open http://localhost:5173
```

The development server supports:
- ⚡ **Instant HMR** (Hot Module Replacement)
- 🔍 **TypeScript type checking** in real-time
- 🎨 **Tailwind CSS** watch mode
- 📱 **Local network access** (`--host` flag)

---

## 🏗️ Build Process

The project uses a **three-stage build pipeline** for static site generation:

```bash
# Full production build (recommended)
npm run build
```

This executes:
1. **`build:client`** - Compiles Vue app with SSR manifest
2. **`build:server`** - Compiles server entry for SSR rendering
3. **`generate`** - Pre-renders static HTML from server build

### Individual Build Steps

```bash
# Step 1: Build client-side bundle
npm run build:client

# Step 2: Build server-side rendering entry
npm run build:server

# Step 3: Generate static HTML
npm run generate
```

### Build Output

```
dist/
├── index.html              # Pre-rendered static HTML (ready to serve)
├── assets/              
│   ├── app-[hash].js      # Client-side hydration bundle (102KB gzipped)
│   └── app-[hash].css     # Compiled Tailwind CSS (11KB gzipped)
└── server/
    └── entry-server.js    # SSR rendering module (not deployed)
```

---

## 🌐 Preview & Deployment

### Local Preview

```bash
npm run preview
# Open http://localhost:4173
```

### Deployment

The `dist/` folder contains a **complete static site**. Deploy to any static hosting:

#### Netlify

```bash
# netlify.toml (project root)
[build]
  command = "npm run build"
  publish = "dist"
```

#### Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": null
}
```

#### GitHub Pages

```bash
npm run build
# Deploy dist/ folder to gh-pages branch
```

#### AWS S3 / CloudFront

```bash
npm run build
aws s3 sync dist/ s3://your-bucket-name --delete
```

### Environment Variables

For production builds, set these in your hosting platform:

```bash
NODE_VERSION=24
NPM_FLAGS=--legacy-peer-deps  # If needed for PrimeVue
```

---

## 📁 Project Structure

```
retro-fit-landing/
├── src/
│   ├── components/          # Vue 3 components (Composition API)
│   │   ├── NavigationHeader.vue
│   │   ├── HeroSection.vue
│   │   ├── PostcardBridge.vue
│   │   ├── ComparisonSection.vue
│   │   ├── BentoGrid.vue
│   │   ├── ProcessSection.vue
│   │   ├── ValueProposition.vue
│   │   ├── ClaimCheckModal.vue
│   │   └── FooterSection.vue
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.vue             # Root component with SEO meta tags
│   ├── entry-client.ts     # Client-side hydration entry
│   ├── entry-server.ts     # Server-side rendering entry
│   └── style.css           # Tailwind CSS v4 with @theme variables
├── scripts/
│   └── prerender.js        # Static HTML generation script
├── planning/               # Original project documentation
│   ├── Content Strategy.md
│   ├── Implementation Blueprint.md
│   └── Claude Kickstart Prompt.md
├── index.html              # SSR template with placeholders
├── vite.config.ts          # Vite configuration for SSR/SSG
├── tailwind.config.js      # Tailwind CSS v4 configuration
├── tsconfig.json           # TypeScript strict mode config
├── .cursorrules            # AI coding assistant rules
├── .nvmrc                  # Node.js version enforcement (24)
└── package.json            # Dependencies and scripts
```

---

## 🎨 Tech Stack

### Core Framework
- **Vue 3.5.28** - Composition API with `<script setup>`
- **TypeScript 5.9.3** - Strict mode for full type safety
- **Vite 7.3.1** - Next-generation build tool

### Styling & UI
- **Tailwind CSS 4.2.0** - CSS-first framework with @theme
- **PrimeVue 4.5.4** - Enterprise-grade UI components
- **Aura Theme** (@primeuix/themes) - Modern design system
- **Google Fonts** - Inter & Roboto Condensed

### Icons & Assets
- **Lucide Vue Next** - Beautiful icon library
- **PrimeIcons** - PrimeVue icon set
- **Unsplash** - Hero images

### SEO & Meta
- **@vueuse/head** - Vue 3 document head management
- **@unhead/ssr** - Server-side head tag rendering

### Animations
- **AOS (Animate On Scroll)** - Scroll-triggered animations

---

## 🎨 Brand Colors

The color palette reflects agricultural heritage meets modern technology:

- **Deep Forest Green** (`#2D5A27`) - Trust & Agriculture
- **Industrial Amber** (`#F59E0B`) - Alert, Action & Machinery
- **Tech Slate** (`#1E293B`) - Modern Technology & Steel

## 💡 Key Implementation Details

### Static Site Generation

The project uses a **custom SSG implementation** (not `vite-ssg`) to avoid unnecessary dependencies like `vue-router` for a single-page landing.

**How it works:**

1. **`entry-client.ts`**: Creates Vue app for client-side hydration
   ```typescript
   import { createApp } from 'vue'
   import { createHead } from '@vueuse/head'
   import App from './App.vue'
   
   const app = createApp(App)
   const head = createHead()
   app.use(head)
   app.mount('#app')
   ```

2. **`entry-server.ts`**: Exports SSR render function
   ```typescript
   import { createSSRApp } from 'vue'
   import { renderToString } from 'vue/server-renderer'
   import { renderSSRHead } from '@unhead/ssr'
   
   export async function render() {
     const app = createSSRApp(App)
     const appHtml = await renderToString(app)
     const { headTags, htmlAttrs, bodyAttrs, bodyTags } = await renderSSRHead(head)
     return { appHtml, headTags, htmlAttrs, bodyAttrs, bodyTags }
   }
   ```

3. **`scripts/prerender.js`**: Generates final static HTML
   - Reads `dist/index.html` template
   - Imports `dist/server/entry-server.js`
   - Renders Vue app and head tags
   - Replaces placeholders (`<!--head-tags-->`, `<!--app-html-->`)
   - Writes final static HTML

### SEO Meta Tags

Complete SEO implementation in [`App.vue`](src/App.vue):

```vue
<script setup lang="ts">
import { useHead } from '@vueuse/head'

useHead({
  title: 'SmartHarvest - Upgrade the Iron. Keep the Legacy.',
  meta: [
    { name: 'description', content: '...' },
    { name: 'keywords', content: '...' },
    { property: 'og:title', content: '...' },
    { property: 'og:description', content: '...' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: '...' },
    { name: 'twitter:description', content: '...' }
  ],
  link: [
    { rel: 'canonical', href: 'https://smartharvest.example.com' }
  ]
})
</script>
```

### Tailwind CSS v4

Uses modern CSS-first approach with `@theme` directive:

```css
@import "tailwindcss";

@theme {
  --color-forest-green: #2D5A27;
  --color-industrial-amber: #F59E0B;
  --color-tech-slate: #1E293B;
  
  --font-family-display: 'Roboto Condensed', sans-serif;
}
```

---

## � Performance Metrics

### Build Size
- **JavaScript**: 403.37 kB (uncompressed) → **102.45 kB (gzipped)**
- **CSS**: 74.62 kB (uncompressed) → **11.58 kB (gzipped)**
- **Build Time**: ~2 seconds

### Lighthouse Scores (Target)
- **Performance**: 95+
- **SEO**: 100
- **Accessibility**: 95+
- **Best Practices**: 100

---

---

## 🧪 Type Safety

The project uses **TypeScript strict mode** with comprehensive type definitions:

```typescript
// src/types/index.ts
export interface MachineType {
  emoji: string
  title: string
  description: string
  features: string[]
}

export interface ProcessStep {
  number: number
  icon: string
  title: string
  description: string
  isLast: boolean
}
```

All components are fully typed with proper prop interfaces.

---

## � Troubleshooting

### Build Errors

**"Cannot find module '@unhead/ssr'"**
```bash
npm install --legacy-peer-deps
```

**"This version of Node is not supported"**
```bash
nvm use 24
npm install
```

**"TypeError: renderSSRHead is not a function"**
- Ensure `@unhead/ssr` version is ^1.12.0
- Check `entry-server.ts` uses correct API

### Development Issues

**Tailwind classes not applying**
```bash
# Ensure postcss.config.js has @tailwindcss/postcss plugin
npm run dev -- --force
```

**AOS animations not working**
- Check `entry-client.ts` has `AOS.init()` call
- Verify `data-aos` attributes in components

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for:
- Code style guidelines
- Component architecture patterns
- Git workflow
- Testing requirements

---

## 📝 Documentation

- **[Implementation Blueprint](planning/Implementation%20Blueprint.md)** - Technical architecture
- **[Content Strategy](planning/Content%20Strategy.md)** - Messaging & copy guidelines
- **[IMPLEMENTATION.md](IMPLEMENTATION.md)** - Detailed implementation notes

---

## 📄 License

This project is proprietary software for SmartHarvest.

## 👥 Team

Built with precision and care for modern agricultural innovation.

## 🚀 Next Steps

- [ ] Add real contact form backend integration
- [ ] Implement analytics (Google Analytics, Plausible)
- [ ] Add GDPR cookie consent banner
- [ ] Create multi-language support (i18n)
- [ ] Add blog/resource section
- [ ] Implement A/B testing for CTA variants

---

**Built with 💚 for farmers who value innovation**

*SmartHarvest © 2026 - All rights reserved*
