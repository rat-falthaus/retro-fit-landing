# TASK-42 — Contao HTML integration snippet

**Plan:** PLAN-009
**Role:** build
**Status:** done
**Dependencies:** —

---

## Goal

Create `.claude/contao-integration-snippet.md` — a ready-to-paste reference for the Contao
CMS editor that explains exactly how to structure the Contao page to embed this SPA.

---

## File to create

`.claude/contao-integration-snippet.md`

Content: full Contao layout/article HTML structure, Contao insert-tags usage, notes on:
- Where to place `#contao-form-source`
- Where to place `#app` / SPA script tag
- How to load the compiled JS bundle
- How Contao success message (`confirmation` class) is detected
- Tips: disable Contao's default redirect-after-submit; use "display confirmation message" instead

---

## Acceptance

- File exists at `.claude/contao-integration-snippet.md`
- Contains copy-pasteable HTML for Contao custom HTML article
- Explains `{{insert_content::FORM_ID}}` placement
- Documents the full flow: page load → SPA mount → portal → submit → .confirmation

## Result

Created `.claude/contao-integration-snippet.md` with copy-pasteable Contao HTML, field name mapping table, CSRF note, post-submit flow diagram, and dev mock instructions.
