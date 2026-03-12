---
id: TASK-8
title: "HeroSection mobile: dvh, responsive typography, gradient, reduced scroll height"
role: frontend
planId: PLAN-003
status: todo
dependencies: [TASK-7]
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
The hero section has multiple critical mobile issues: `h-screen` (100vh) breaks on mobile Safari, headline is too large (48px), gradient overlay is too dark, video `object-right` crops content on portrait, section is too tall (150vh), and corner labels overlap. All must be fixed without breaking the desktop experience.

## Files to Read
- `src/components/HeroSection.vue`
- `src/style.css` (for `.hero-viewport` class from TASK-7)

## Implementation Steps

1. **Replace `h-screen`** on the sticky viewport div with the `.hero-viewport` class (uses `100dvh`) from TASK-7.

2. **Responsive section height**: Replace fixed `height: 150vh` with responsive value:
   - Mobile: `120vh` (less scroll needed on small screens)
   - Desktop: `150vh` (keep current)
   - Use `:style` binding with a computed or use CSS `clamp()`:
     ```
     style="height: clamp(120vh, 100vh + 15vw, 150vh)"
     ```

3. **Responsive headline typography**: Change `text-5xl md:text-6xl xl:text-7xl` to `text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl`. Remove the `<br />` between headline parts — let text flow naturally on mobile, keep `<br class="hidden sm:inline" />` if needed for desktop.

4. **Responsive gradient overlay**: On mobile the left-side gradient is too opaque (88%). Use two divs or a CSS class with media query:
   - Desktop: `rgba(49,49,49,0.88)` → current
   - Mobile (<768px): `rgba(49,49,49,0.70)` — lighter so background image visible

5. **Responsive image/video positioning**: Change `backgroundPosition` and `object-right` to be center on mobile:
   - Before/after images: `backgroundPosition: 'center'` on mobile, `'right center'` on desktop
   - Video: `object-center sm:object-right` (Tailwind classes)
   - Use a computed `isMobile` ref (check viewport width in onMounted, SSR-safe)

6. **Corner labels**: Hide on very small screens (`hidden xs:inline` or `hidden sm:inline`), or reduce font size. Ensure they don't overlap on 320px.

7. **CTA buttons**: Already `flex-col sm:flex-row` — verify touch targets are 48px+ with `.btn-primary` improvements from TASK-7.

8. **Trust badges**: Already `flex-col sm:flex-row` — verify wrapping is clean. Reduce `mt-10` to `mt-6 sm:mt-10` on mobile.

9. **Stamp text**: `clamp(2.5rem, 8vw, 6rem)` is OK but verify it's not too large on narrow screens — reduce to `clamp(1.8rem, 7vw, 6rem)` if needed.

10. **Smooth scroll fallback**: Keep `behavior: 'smooth'` — modern iOS Safari supports it. The `requestAnimationFrame` polling fallback already handles edge cases.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] Hero looks correct on 375px viewport (simulated)
- [ ] Headline text fits on 320px width without overflow
- [ ] Sticky viewport uses `100dvh` not `100vh`
- [ ] Desktop design unchanged at 1280px+
