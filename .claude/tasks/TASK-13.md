---
id: TASK-13
title: "PostcardBridge mobile: responsive padding, text, button sizing"
role: frontend
planId: PLAN-003
status: todo
dependencies: [TASK-7]
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
PostcardBridge has mostly functional mobile layout but needs spacing, typography, and button touch-target polish for small screens (<375px). The voucher CTA button text may overflow with `whitespace-nowrap`.

## Files to Read
- `src/components/PostcardBridge.vue`
- `src/style.css`

## Implementation Steps

1. **Section padding**: Change `py-16` or `py-20` to `py-10 sm:py-16 md:py-20` — less vertical padding on mobile.

2. **Postcard card padding**: `p-8` → `p-5 sm:p-8` — less padding on mobile to maximize content area.

3. **Heading size**: `text-2xl` → `text-xl sm:text-2xl` — slightly smaller on mobile.

4. **Icon size**: `w-10 h-10` → `w-8 h-8 sm:w-10 sm:h-10` — proportional.

5. **Bridge text**: `text-xl` → `text-base sm:text-lg md:text-xl` — readable on narrow screens. Add `px-2` for breathing room.

6. **Voucher banner**:
   - Padding: `p-8` → `p-5 sm:p-6 md:p-8`
   - Gap: `gap-6` → `gap-3 sm:gap-6`
   - CTA button: Remove `whitespace-nowrap` if present. Use `text-xs sm:text-sm` for button text. Ensure `w-full sm:w-auto` so button is full-width on mobile.

7. **Spacing between sections**: `mb-10 sm:mb-12` for postcard-to-banner gap.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] Voucher CTA button text doesn't overflow on 320px
- [ ] Card padding comfortable on small screens
- [ ] Desktop layout unchanged
