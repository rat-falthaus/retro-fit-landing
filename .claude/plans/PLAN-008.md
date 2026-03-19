---
id: PLAN-008
title: "Replace RF placeholders + favicon with rex-logo-sign.svg"
status: in-progress
createdAt: 2026-03-19T12:00:00.000Z
taskIds: [TASK-34, TASK-35, TASK-36]
---

## Goal
The file `public/rex-logo-sign.svg` is now available (180×180 viewBox, transparent bg,
red #e11f26 + grey #999 X-mark paths). Replace every "RF" text placeholder and the
external SVG favicon link with this local asset.

## Instances Found

| Location | Current | Fix |
|---|---|---|
| `index.html` line 8 | `<link rel="icon" type="image/png" href="/favicon.ico">` | keep as `.ico` fallback |
| `index.html` line 9 | `<link rel="icon" type="image/svg+xml" href="https://rex-at.de/files/theme_R/img/logo/Logo-breit.svg">` | → `href="/rex-logo-sign.svg"` |
| `FooterSection.vue` line 15 | `<div …>RF</div>` (mobile, w-8 h-8, orange bg) | → `<img>` inside div |
| `FooterSection.vue` line 74 | `<div …>RF</div>` (desktop, w-10 h-10, orange bg) | → `<img>` inside div |

## Out of scope
`NavigationHeader.vue` uses the external **wide wordmark** `Logo-breit.svg` — this is intentional and is NOT an RF placeholder. Leave it.

## Tasks

| ID | Role | Depends on |
|---|---|---|
| TASK-34 | i18n/html | — |
| TASK-35 | implementation | — |
| TASK-36 | qa | TASK-34, TASK-35 |

TASK-34 and TASK-35 are independent and can run in parallel.
