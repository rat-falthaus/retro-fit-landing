# PLAN-010 — Fix GitHub Pages 405 / Contao-mode gate

**Goal:** Standalone GitHub Pages deployment must fall back to the `ClaimCheckForm` gateway
(opens `https://rex-at.de/landingpage-retrofit.html` in new tab). Contao-embedded deployment
must keep using the form portal. Both modes must coexist in the same codebase.

**Branch:** `asSPA`
**Status:** in-progress

---

## Root Cause

`index.html` contains a `#contao-form-source` dev-mock div (added for local testing in
PLAN-009). This div is present in all builds including the one deployed to GitHub Pages.
`useContaoFormBridge` detects it, activates Contao mode, and portals a form with
`action=""` → POST to the current GitHub Pages URL → **405 Not Allowed** (static host).

## Fix: `data-contao-live` attribute gate

The composable only activates Contao mode when `#contao-form-source` carries
`data-contao-live="true"`. Without that attribute it is treated as absent → fallback
to `ClaimCheckForm` gateway.

| Context | `#contao-form-source` | `data-contao-live` | Behaviour |
|---|---|---|---|
| GitHub Pages (standalone) | present (mock) | absent | fallback → opens rex-at.de |
| Contao CMS (live) | present (real) | `"true"` | portal activated |
| Local dev (preview Contao) | present (mock) | add manually | portal activated |

---

## Tasks

| ID       | Title                                              | Role      | Deps    |
|----------|----------------------------------------------------|-----------|---------|
| TASK-44  | Add data-contao-live gate to useContaoFormBridge   | frontend  | —       |
| TASK-45  | Update index.html mock comment                     | build     | —       |
| TASK-46  | Update contao-integration-snippet.md               | build     | —       |
| TASK-47  | TypeScript + build validation                      | qa        | TASK-44 |

---

## Success Criteria

- GitHub Pages: form submit opens `rex-at.de/landingpage-retrofit.html` in new tab, no 405
- Contao embed: adding `data-contao-live="true"` activates portal as before
- `vue-tsc --noEmit` exits 0
