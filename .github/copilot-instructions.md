# SmartHarvest Landing Page – Copilot Instructions

## Project Overview
Static landing page for agricultural equipment retro-fitting services. Goal: convert farmers to claim a free €2,000 compatibility check. Tagline: "Upgrade the Iron. Keep the Legacy."

## Tech Stack
- **Vue 3.5+** with `<script setup lang="ts">` (Composition API only — no Options API)
- **TypeScript 5.9+ strict mode** — no `any`, all props/emits explicitly typed
- **Vite 7** with `@` alias pointing to `src/`
- **Tailwind CSS v4** — uses `@import "tailwindcss"` + `@theme {}` (NOT `@tailwind base/components/utilities`)
- **PrimeVue 4.5** with Aura/`@primeuix/themes` — for Dialog, InputText, Textarea, Button
- **Lucide Vue Next** for icons; **AOS** for scroll animations
- **Node.js 24** required (`nvm use` to activate)

## Build Pipeline (3-stage SSG)
```bash
npm run dev          # Vite dev server → http://localhost:5173
npm run build        # Full production: client → server → prerender
npm run build:client # Vite client build with SSR manifest → dist/
npm run build:server # Vite SSR build → dist/server/
npm run generate     # Node prerender script: injects SSR HTML into dist/index.html
npm run preview      # Preview built output
```
The `scripts/prerender.js` reads `dist/index.html`, imports `dist/server/entry-server.js`, calls `render()`, then replaces `<!--app-html-->`, `<!--head-tags-->`, `<html`, `<body`, and `</body>` placeholders. Do not remove those comment placeholders from `index.html`.

## SSR / SEO Pattern
SEO meta tags live in `src/App.vue` via `useHead()` from `@vueuse/head`. The entry points are `src/entry-client.ts` (hydration) and `src/entry-server.ts` (returns `appHtml` + head tags for prerender). Add new meta tags in `App.vue`'s `useHead()` call, not in `index.html`.

## Static i18n (German)
All user-facing text lives in `src/i18n/de.ts` — a single `as const` object exported as `t`. **No hardcoded strings in templates.** Import and use directly:
```typescript
import { t } from '@/i18n/de'
// in template: {{ t.hero.headline }}, {{ t.footer.copyright(year) }}
```
SEO strings (`t.seo.*`) are consumed in `App.vue`'s `useHead()`. Form labels, placeholders, success messages, and footer copy (including real contact details and disclaimer text) are all in this file. Add new sections under the appropriate namespace key.

## Hero Before/After Image Slider
`HeroSection.vue` uses a pointer-capture drag approach — no global event listeners, no external library:
- `@pointerdown` on the container calls `setPointerCapture` then updates position
- The "after" image (`/images/machine-after.png`) is clipped via `:style="{ clipPath: \`inset(0 ${100 - sliderPosition}% 0 0)\` }"`
- Drag right → more of the retrofitted machine is revealed
- Images live in `public/images/` (`machine-before.png`, `machine-after.png`) and are served as static assets

## Component Architecture
All page sections are flat siblings in `App.vue`. Order: `NavigationHeader` → `HeroSection` → `PostcardBridge` → `ComparisonSection` → `BentoGrid` → `ProcessSection` → `ValueProposition` → `ClaimCheckModal` → `FooterSection`. The modal is controlled by `isModalVisible` ref; child sections emit `openClaimModal` up to `App.vue`.

## Styling Conventions
Brand tokens defined in `src/style.css` under `@theme {}`:
```css
--color-forest-green: #2D5A27    /* Primary — trust, agriculture */
--color-industrial-amber: #F59E0B /* Accent — CTAs, action */
--color-tech-slate: #1E293B      /* Text, dark UI */
```
Reusable utility classes in `@layer components`: `.btn-primary`, `.btn-secondary`, `.section-container`. Typography: `font-sans` (Inter) for body, `font-display` (Roboto Condensed) for headings. Section padding convention: `py-16` or `py-20`.

## TypeScript Interfaces
Shared types live in `src/types/index.ts`: `MachineType`, `ProcessStep`, `ComparisonData`, `ValueProposition`. Add new shared interfaces there. Component-local types (e.g., `FormData` in `ClaimCheckModal.vue`) stay in the component file.

## Component Prop/Emit Pattern
```typescript
// Props
const props = defineProps<{ visible: boolean }>()
// Emits
const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
  (e: 'submit', data: FormData): void
}>()
```
Always use TypeScript generic syntax — no runtime `PropType` validators.

## Key File Map
| File | Purpose |
|---|---|
| `src/style.css` | Tailwind v4 theme tokens + global utilities |
| `src/types/index.ts` | All shared TypeScript interfaces |
| `src/App.vue` | SEO head, modal state, component composition |
| `scripts/prerender.js` | Node SSG script (runs after both builds) |
| `tailwind.config.js` | Tailwind v4 config (brand color extensions) |
| `vite.config.ts` | Vue plugin + `@` path alias |
