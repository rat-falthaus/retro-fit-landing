# TASK-45 — Update `index.html` mock comment

**Plan:** PLAN-010
**Role:** build
**Status:** done
**Dependencies:** —

---

## Goal

Update the `<!-- DEV MOCK -->` comment in `index.html` to explain the new
`data-contao-live` gate and how to enable portal mode locally.

---

## Change

Replace the comment block opening:
```html
    <!-- DEV MOCK: In production Contao renders the real form here via {{insert_content::ID}}.
         Remove this block for standalone (non-Contao) builds. -->
    <div id="contao-form-source" style="display:none;" aria-hidden="true">
```

With:
```html
    <!-- DEV MOCK: In production Contao renders the real form here via {{insert_content::ID}}.
         The `data-contao-live` attribute is intentionally ABSENT here so GitHub Pages
         (standalone) treats this as no Contao source → falls back to the ClaimCheckForm
         gateway that opens rex-at.de/landingpage-retrofit.html in a new tab.
         To test Contao-portal mode locally, add  data-contao-live="true"  to this div. -->
    <div id="contao-form-source" style="display:none;" aria-hidden="true">
```

---

## Acceptance

- Comment updated, no other changes to `index.html`
- `data-contao-live` attribute NOT added to the mock div

## Result

Updated comment in `index.html` explaining the gate and how to enable portal mode locally for testing.
