# PLAN-009 — Contao Form Portal Bridge

**Goal:** Embed native Contao form directly inside the Vue SPA when served from Contao CMS.
The SPA must detect a hidden `#contao-form-source` div (placed by Contao layout), portal its
`<form>` DOM nodes into the correct Vue component, and handle the post-submit success state
(`.confirmation` class). Fall back cleanly to the existing `ClaimCheckForm` gateway when
no Contao source is present (standalone usage).

**Branch:** `asSPA`

**Status:** in-progress

---

## Background

Current approach: `ClaimCheckForm.vue` acts as a gateway — collects data, builds a prefill URL,
then opens `rex-at.de/landingpage-retrofit.html` in a new tab.

New approach (Contao-embedded): Contao renders its own form generator output into a hidden
`#contao-form-source` div. The SPA "portals" the real `<form>` (with CSRF token intact) into
`ClaimCheckModal` and `InlineClaimSection`. A `MutationObserver` watches for Contao's
`.confirmation` div after submit to trigger the success UI.

---

## Architecture

```
index.html (Contao-generated or dev mock)
  └─ #contao-form-source [style="display:none"]   ← Contao injects real form here
       └─ <form id="...">...</form>               ← Real Contao form with CSRF

  └─ #app                                         ← Vue SPA mounts here
       └─ App.vue
            ├─ ClaimCheckModal.vue
            │    └─ ContaoFormPortal.vue           ← portals form from #contao-form-source
            │         fallback: ClaimCheckForm     ← used when no Contao source
            └─ InlineClaimSection.vue
                 └─ ContaoFormPortal.vue           ← same portal, separate instance
                      fallback: ClaimCheckForm
```

---

## Tasks

| ID       | Title                                              | Role      | Deps        |
|----------|----------------------------------------------------|-----------|-------------|
| TASK-37  | Create useContaoFormBridge composable              | frontend  | —           |
| TASK-38  | Create ContaoFormPortal.vue component              | frontend  | TASK-37     |
| TASK-39  | Integrate portal into ClaimCheckModal.vue          | frontend  | TASK-38     |
| TASK-40  | Integrate portal into InlineClaimSection.vue       | frontend  | TASK-38     |
| TASK-41  | Add dev-mock #contao-form-source to index.html     | build     | —           |
| TASK-42  | Create Contao HTML integration snippet doc         | build     | —           |
| TASK-43  | TypeScript validation (vue-tsc --noEmit)           | qa        | TASK-39,40  |

---

## Success Criteria

- `vue-tsc --noEmit` passes with zero errors
- Standalone mode (no `#contao-form-source`): existing ClaimCheckForm renders unmodified
- Contao mode (`#contao-form-source` present): Contao form appears inside modal / inline section
- Post-submit `.confirmation` detection: success UI shown, form hidden
- No global event listeners leaked; MutationObserver disconnected on component unmount
