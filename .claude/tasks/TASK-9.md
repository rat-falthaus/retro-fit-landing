---
id: TASK-9
title: "NavigationHeader mobile: hamburger menu + responsive sizing"
role: frontend
planId: PLAN-003
status: todo
dependencies: [TASK-7, TASK-15]
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
The current NavigationHeader has NO mobile navigation — no hamburger, no collapsible menu. It uses `w-lg` (a possibly undefined class) and logo may be illegible at 40px height on mobile. This is a critical UX gap.

## Files to Read
- `src/components/NavigationHeader.vue`
- `src/i18n/de.ts` (nav strings from TASK-15)
- `src/style.css`

## Implementation Steps

1. **Read current NavigationHeader** structure thoroughly — it may be minimal (just logo + maybe CTA).

2. **Logo responsive sizing**: Use `h-10 sm:h-8 md:h-10` or appropriate size. Ensure minimum width for legibility. Logo should be a tappable link (48px touch target).

3. **Header padding**: Use `py-3 px-4 sm:px-6 lg:px-8` — mobile-first padding.

4. **Nav width**: Replace `w-lg` (if present) with `w-full`. Header should span full viewport.

5. **Add hamburger menu for mobile** (`md:hidden`):
   - `isMobileMenuOpen` ref
   - Hamburger button (3 lines → X toggle), 48px tap target
   - Animated slide-down menu panel below header
   - Menu contains: CTA button ("Retrofit-Check starten"), maybe "Über uns" link
   - Close on link click, close on outside tap
   - Use Tailwind transitions: `transition-all duration-300`

6. **Desktop nav** (`hidden md:flex`): Keep current desktop links/CTA unchanged.

7. **Fixed header mobile Safari**: The header uses `fixed top-0`. On mobile Safari, fixed positioning can be janky during scroll. Use `will-change-transform` or `-webkit-sticky` if issues arise.

8. **Use i18n strings** from TASK-15 for any new nav labels (hamburger aria-label, menu item labels).

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] Hamburger visible on < 768px, hidden on md+
- [ ] Menu panel opens/closes with animation
- [ ] Desktop nav unchanged
- [ ] All touch targets ≥ 48px
