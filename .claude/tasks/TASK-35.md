---
id: TASK-35
title: "FooterSection: replace 2× RF text placeholder with rex-logo-sign.svg img"
role: implementation
planId: PLAN-008
status: todo
dependencies: []
createdAt: 2026-03-19T12:00:00.000Z
---

## Context
Two `<div>RF</div>` orange-bg boxes exist in `FooterSection.vue`:
- Mobile brand row (w-8 h-8, text-sm)
- Desktop brand block (w-10 h-10, text-lg)

Replace the inner "RF" text with `<img src="/rex-logo-sign.svg">`. Keep the orange
container div (it frames the icon). The SVG has a transparent background so the orange
shows through; the red+grey paths render on top.

## Change pattern (both instances)
Remove text `RF`, insert:
```html
<img src="/rex-logo-sign.svg" class="w-full h-full object-contain" alt="Rex-AT" aria-hidden="true" />
```
Also remove font-bold / text-white / text-sm|lg classes from the container div since
they only applied to text — keep sizing, rounded-lg, flex centering, and bg color.

## Acceptance Criteria
- [ ] Mobile logo div: RF text gone, img tag present
- [ ] Desktop logo div: RF text gone, img tag present
- [ ] No TypeScript errors
