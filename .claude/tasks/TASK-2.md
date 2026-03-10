---
id: TASK-2
title: Fix public asset paths in HeroSection.vue
role: frontend
planId: PLAN-001
status: todo
dependencies: []
createdAt: 2026-03-10T14:10:00.000Z
---

## Context
Vite does NOT rewrite runtime string paths that reference `public/` assets — only `import`
statements and CSS files get the `base` prefix applied. `HeroSection.vue` has 4 absolute
`/images/…` references (2 in CSS `url()` and 2 in `<video src>`). After the base fix in
TASK-1 these still resolve to `/images/…` instead of `/retro-fit-landing/images/…`, causing
all background images and videos to 404 in production.

## Files to Read
- `src/components/HeroSection.vue` (full file)
- `src/vite-env.d.ts` (confirm `import.meta.env.BASE_URL` is typed)

## Implementation Steps
1. In the `<script setup>` block, add:
   ```ts
   const baseUrl = import.meta.env.BASE_URL
   ```
   `import.meta.env.BASE_URL` is a `string` (typed by `/// <reference types="vite/client" />`).
   Vite replaces it at build time with the configured `base` value.

2. Fix the **before-image** static `style` attribute (currently line ~85) — convert from
   a static `style="background-image: url('/images/machine-before.jpg'); …"` attribute to
   a `:style` binding:
   ```html
   :style="{
     backgroundImage: `url('${baseUrl}images/machine-before.jpg')`,
     backgroundSize: 'cover',
     backgroundPosition: 'center center',
   }"
   ```
   Remove the old static `style="…"` attribute entirely.

3. Fix the **after-image** `:style` binding (currently line ~96) — update the existing
   `backgroundImage` value by prefixing with `baseUrl`:
   ```ts
   backgroundImage: `url('${baseUrl}images/machine-after.jpg')`,
   ```

4. Fix the **before-video** `<video src>` (currently line ~111) — change static `src` to
   `:src` binding:
   ```html
   :src="`${baseUrl}images/Video_Generation_With_Natural_Animations.mp4`"
   ```

5. Fix the **after-video** `<video src>` (currently line ~126) — same change:
   ```html
   :src="`${baseUrl}images/Video_Edit_Remove_Animals_Update_Machine.mp4`"
   ```

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0 (no TypeScript errors introduced)
- [ ] `npm run build` exits 0
- [ ] `const baseUrl = import.meta.env.BASE_URL` declared in `<script setup>` — type is `string`, no `any`
- [ ] Zero occurrences of `src="/images/` or `url('/images/` remaining in `HeroSection.vue`
- [ ] All 4 asset references now use template-literal with `baseUrl` prefix
- [ ] No global event listeners added without `onUnmounted` cleanup

## Anti-patterns to Avoid
- NEVER use `any` type — `import.meta.env.BASE_URL` is already `string`
- NEVER hardcode `'/retro-fit-landing/'` in the component — use `import.meta.env.BASE_URL`
- NEVER add window/document access outside `onMounted` (SSR safety)
- NEVER use Options API — component stays `<script setup lang="ts">`
