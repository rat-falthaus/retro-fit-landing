# TASK-46 — Update Contao integration snippet

**Plan:** PLAN-010
**Role:** build
**Status:** done
**Dependencies:** —

---

## Goal

Update `.claude/contao-integration-snippet.md` to include `data-contao-live="true"` on
the `#contao-form-source` div in the copy-pasteable Contao HTML snippet.

---

## Change

In `.claude/contao-integration-snippet.md`, under "Contao Page Layout / Article HTML",
replace:
```html
<div id="contao-form-source" style="display:none;" aria-hidden="true">
```

With:
```html
<div id="contao-form-source" data-contao-live="true" style="display:none;" aria-hidden="true">
```

Also add a note explaining the attribute:

After the code block, add:
```
> **`data-contao-live="true"` is required.** Without it, the SPA treats the div as
> absent and falls back to the external redirect gateway. This attribute is the
> intentional signal that distinguishes a live Contao embed from a standalone build.
```

---

## Acceptance

- Snippet updated with `data-contao-live="true"` on the div
- Explanatory note added
- No other files changed

## Result

Updated Contao HTML snippet with `data-contao-live="true"` on the source div. Added warning blockquote explaining the attribute is required.
