---
id: TASK-14
title: "FooterSection mobile: stacking, touch targets, text readability"
role: frontend
planId: PLAN-003
status: todo
dependencies: [TASK-7]
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
FooterSection has grid column stacking issues, text that's too small (12px disclaimer/copyright), and contact links that lack adequate touch targets on mobile.

## Files to Read
- `src/components/FooterSection.vue`
- `src/style.css`

## Implementation Steps

1. **Grid gap**: `gap-10` → `gap-6 sm:gap-8 md:gap-10` — tighter on mobile.

2. **Section padding**: `pt-20 pb-10` → `pt-12 pb-8 sm:pt-16 md:pt-20 sm:pb-10`.

3. **Brand logo + text**: `gap-3` → `gap-2 sm:gap-3`, brand name: `text-xl` → `text-lg sm:text-xl`.

4. **Description text**: `text-xs` → `text-sm` (14px minimum for readability).

5. **Contact links (phone/email)**: Wrap in `py-2` or increase to `py-1.5` for 44px+ touch targets. Ensure the link extends full width of its container on mobile for easy tapping.

6. **Footer section headings**: `text-sm` is fine, but ensure `uppercase tracking-wider` doesn't make text illegible on mobile — verify.

7. **Legal links**: `text-xs` → `text-xs sm:text-sm`. Add `py-1` for touch targets.

8. **Disclaimer text**: `text-xs` → `text-xs sm:text-sm` with `leading-relaxed` (already present).

9. **Copyright/made-with bar**: `text-xs` → `text-xs sm:text-sm`. Flex gap: `gap-3` → `gap-2 sm:gap-4`. Center text on mobile, left/right justified on desktop (`text-center sm:text-left`).

10. **Certifications list**: `space-y-2` → `space-y-2.5 sm:space-y-2` — slightly more vertical spacing on mobile.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] Phone/email links have ≥44px touch targets
- [ ] All text ≥14px (text-sm) on mobile
- [ ] Footer stacks cleanly on 320px
- [ ] Desktop layout unchanged
