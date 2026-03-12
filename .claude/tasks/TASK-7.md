---
id: TASK-7
title: "Global mobile foundations: style.css + index.html + Tailwind config"
role: styling
planId: PLAN-003
status: todo
dependencies: []
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
Before touching any component, we need global mobile-first utilities with correct viewport handling, safe-area insets for notched phones, responsive button variants, and touch-target minimums. This is the foundation all other mobile tasks depend on.

## Files to Read
- `src/style.css`
- `tailwind.config.js`
- `index.html`

## Implementation Steps

1. **index.html** — Update viewport meta tag to support notched devices:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
   ```
   Add theme-color meta tag:
   ```html
   <meta name="theme-color" content="#EB6734" />
   ```

2. **style.css** — Add mobile-first utilities in `@layer components`:
   - `.hero-viewport` class: `height: 100dvh` with `100vh` fallback for older browsers
   - Make `.btn-primary` responsive: change `px-8 py-4` → `px-5 py-3 text-sm sm:px-8 sm:py-4 sm:text-base` (mobile-first)
   - Same for `.btn-secondary`
   - Add `.touch-target` utility: `min-height: 48px; min-width: 48px;`
   - Add safe-area padding utility if viewport-fit=cover:
     ```css
     .safe-area-bottom { padding-bottom: env(safe-area-inset-bottom, 0px); }
     ```

3. **tailwind.config.js** — No breaking changes. Optionally note that default Tailwind breakpoints (sm:640, md:768, lg:1024) are used.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages)
- [ ] `.btn-primary` renders smaller on mobile, desktop unchanged
- [ ] `100dvh` class available for hero viewport
- [ ] meta viewport includes `viewport-fit=cover`
