---
id: TASK-34
title: "index.html: fix SVG favicon link to use /rex-logo-sign.svg"
role: html
planId: PLAN-008
status: todo
dependencies: []
createdAt: 2026-03-19T12:00:00.000Z
---

## Context
`index.html` currently has two favicon link tags. The SVG one points to the external
wide wordmark. Replace it with the local sign SVG. Keep the `.ico` as a fallback for
legacy browsers.

## Change
```html
<!-- Before -->
<link rel="icon" type="image/svg+xml" href="https://rex-at.de/files/theme_R/img/logo/Logo-breit.svg">

<!-- After -->
<link rel="icon" type="image/svg+xml" href="/rex-logo-sign.svg">
```

## Acceptance Criteria
- [ ] SVG favicon points to local `/rex-logo-sign.svg`
- [ ] `.ico` fallback line untouched
