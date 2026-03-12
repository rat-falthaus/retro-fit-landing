# PLAN-003: 100% mobile-perfect UI

**Status:** Completed
**Completed:** 2026-07-09

## Tasks

| ID | Title | Role | Completed |
|----|-------|------|-----------|
| TASK-7 | Global mobile foundations: style.css + index.html + Tailwind config | styling | 2026-07-09 |
| TASK-8 | HeroSection mobile: dvh, responsive typography, gradient, reduced scroll height | frontend | 2026-07-09 |
| TASK-9 | NavigationHeader mobile: hamburger menu + responsive sizing | frontend | 2026-07-09 |
| TASK-10 | Extract ClaimCheckForm.vue reusable form component | frontend | 2026-07-09 |
| TASK-11 | ClaimCheckModal desktop-only + new InlineClaimSection for mobile | frontend | 2026-07-09 |
| TASK-12 | App.vue responsive modal routing: dialog on md+, inline on mobile | frontend | 2026-07-09 |
| TASK-13 | PostcardBridge mobile: responsive padding, text, button sizing | frontend | 2026-07-09 |
| TASK-14 | FooterSection mobile: stacking, touch targets, text readability | frontend | 2026-07-09 |
| TASK-15 | i18n: add mobile nav and inline form section strings | i18n | 2026-07-09 |
| TASK-16 | QA: full mobile build + type-check + visual audit | qa | 2026-07-09 |

## Summary

Full mobile-first overhaul of the SmartHarvest landing page. Key deliverables:

**New components:**
- `ClaimCheckForm.vue` — extracted shared form with `defineExpose({ submitForm, reset })`, `formId` prop to disambiguate DOM IDs, emits `success`. Used by both modal and inline paths.
- `InlineClaimSection.vue` — mobile-only (`md:hidden`) page-flow form section at `#inline-claim`. Replaces the dialog on small screens. Sticky submit footer with `safe-area-bottom`.

**Refactored components:**
- `ClaimCheckModal.vue` — stripped inline form logic entirely; now delegates to `<ClaimCheckForm ref="formRef" />`, footer calls `formRef?.submitForm()`. Desktop-only concern.
- `NavigationHeader.vue` — full rewrite with hamburger toggle (`isMobileMenuOpen`), `touch-target` class on controls, emits `openClaimModal`.
- `HeroSection.vue` — `hero-viewport` with `100dvh`, responsive text scales, gradient lighter on mobile via `@media (max-width: 639px)`.
- `PostcardBridge.vue` — responsive padding/margins/text, CTA button full-width on mobile.
- `FooterSection.vue` — stacked layout on mobile, `block py-2` touch targets on links, responsive text sizes.
- `App.vue` — added `isMobile` ref with resize listener; `openClaimModal` routes to `scrollIntoView('#inline-claim')` on mobile vs dialog on md+.

**Global styling (TASK-7):**
- `style.css`: `.hero-viewport` with `100dvh` / `100svh` fallback, `.touch-target` (`min-h-12 min-w-12`), `.safe-area-bottom` (`env(safe-area-inset-bottom)`), responsive `.btn-primary`/`.btn-secondary`.
- `index.html`: `viewport-fit=cover`, `apple-mobile-web-app-capable`, `theme-color` meta tags.

**i18n (TASK-15):**
- Added `t.inlineForm` namespace (title, subtitle, successTitle, successText).
- Added `t.nav.menuToggle`, `t.nav.menuClose`, `t.nav.retrofitCheck`, `t.nav.about`, `t.nav.contact`.

**Build:** All 3 stages pass — `vite build` (client), `vite build --ssr` (server), `node scripts/prerender.js` (SSG). TypeScript strict mode — no errors.
