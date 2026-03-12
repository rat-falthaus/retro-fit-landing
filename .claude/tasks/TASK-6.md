---
id: TASK-6
title: Create rex-at.de Contao URL-prefill bridge script
role: build
planId: PLAN-002
status: todo
dependencies: []
createdAt: 2026-03-12T10:00:00.000Z
---

## Context
The rex-at.de landing page uses a Contao CMS POST form. `X-Frame-Options: SAMEORIGIN`
blocks embedding. After landing on the page via a URL with query parameters
(`?Name_Ansprechpartner=...&Email=...&Telefon=...`), the Contao form fields won't
auto-fill unless a small JavaScript snippet reads those params and injects the values.

This task produces:
1. `scripts/rex-at-form-bridge.js` — the standalone script to be pasted into rex-at.de
2. An update to `IMPLEMENTATION.md` documenting the full integration approach, field
   name mapping, and copy-paste instructions for the CMS administrator.

## Files to Read
- `IMPLEMENTATION.md` — existing document to append to, not replace

## Implementation Steps

### Step 1 — Create `scripts/rex-at-form-bridge.js`

This script must:
- Be pure vanilla JS (zero dependencies)
- Work in Contao's page context (DOMContentLoaded or defer attribute)
- Read query params: `Name_Ansprechpartner`, `Email`, `Telefon`
- Set `value` on corresponding `<input>` elements within `#retrofit-survey`
- Trigger a native `input` event on each filled field (for any Contao JS listeners)
- Scroll the `#retrofit-survey` form into view after filling
- Be idempotent (safe to leave on the page even when params are absent)
- NOT break the page if the form element doesn't exist (guard with `?.`)

```javascript
/**
 * rex-at-form-bridge.js
 *
 * Reads URL query parameters sent by the SmartHarvest / Retrofit-Thüringen
 * landing page and prefills the matching fields in the Contao #retrofit-survey
 * form. Paste this script into the Contao page layout's <head> (with defer)
 * or include it via the custom JavaScript section of the Contao page settings.
 *
 * Parameters consumed:
 *   ?Name_Ansprechpartner=...&Email=...&Telefon=...
 *
 * No external dependencies. Safe to run even when params are absent.
 */
;(function () {
  'use strict'

  var FIELD_MAP = [
    ['Name_Ansprechpartner', 'Name_Ansprechpartner'],
    ['Email', 'Email'],
    ['Telefon', 'Telefon'],
  ]

  function prefillForm() {
    var params = new URLSearchParams(window.location.search)
    var form = document.getElementById('retrofit-survey')
    if (!form) return

    var filled = false

    FIELD_MAP.forEach(function (pair) {
      var paramKey = pair[0]
      var fieldName = pair[1]
      var value = params.get(paramKey)
      if (!value) return

      var el = form.querySelector('[name="' + fieldName + '"]')
      if (!el) return

      el.value = value
      el.dispatchEvent(new Event('input', { bubbles: true }))
      el.dispatchEvent(new Event('change', { bubbles: true }))
      filled = true
    })

    if (filled) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prefillForm)
  } else {
    prefillForm()
  }
})()
```

### Step 2 — Append integration section to `IMPLEMENTATION.md`

Append the following section at the end of `IMPLEMENTATION.md`:

---

## Form Integration: Gateway Modal → rex-at.de (PLAN-002)

### Problem
`rex-at.de/landingpage-retrofit.html` uses:
- `X-Frame-Options: SAMEORIGIN` → iframe embedding blocked
- Contao CMS POST form with CSRF token → URL GET params don't prefill natively

### Solution: URL-Param Bridge

**Flow:**
1. User clicks CTA → `ClaimCheckModal` opens (3-field gateway: Name, E-Mail, Telefon)
2. User fills fields → clicks "Weiter zum Retrofit-Check →"
3. Landing page builds URL: `https://rex-at.de/landingpage-retrofit.html?Name_Ansprechpartner=...&Email=...&Telefon=...`
4. `window.open(url, '_blank', 'noopener,noreferrer')` opens rex-at.de in a new tab
5. Modal switches to "opened" state with fallback link
6. On rex-at.de: **`scripts/rex-at-form-bridge.js`** reads params and fills Contao fields

### Contao Field Mapping

| URL param             | Contao input `name`    | Label              |
|-----------------------|------------------------|--------------------|
| `Name_Ansprechpartner`| `Name_Ansprechpartner` | Name Ansprechpartner |
| `Email`               | `Email`                | E-Mail             |
| `Telefon`             | `Telefon`              | Telefon            |

### Installing the Bridge Script on rex-at.de

1. Copy the contents of `scripts/rex-at-form-bridge.js`
2. In the **Contao backend**: open *Layouts* → select the layout used by `landingpage-retrofit.html`
3. Paste the script into the **"Custom JavaScript"** / `<head>` section, wrapped in `<script defer>...</script>`
4. Alternatively: upload `rex-at-form-bridge.js` to `files/` and include via the `<head>` tag with `defer`
5. Test by visiting: `https://rex-at.de/landingpage-retrofit.html?Name_Ansprechpartner=Test+User&Email=test%40test.de&Telefon=01234567890`
   → Name, E-Mail, Telefon fields should be prefilled and page should scroll to the form

### Files Changed
| File | Change |
|---|---|
| `src/i18n/de.ts` | `t.modal` keys replaced for gateway flow |
| `src/components/ClaimCheckModal.vue` | Rewritten: 3-field gateway + new-tab redirect |
| `scripts/rex-at-form-bridge.js` | **New** — copy to rex-at.de CMS |
| `IMPLEMENTATION.md` | This section added |

---

## Acceptance Criteria
- [ ] `scripts/rex-at-form-bridge.js` exists and is syntactically valid JS (no syntax errors)
- [ ] Script handles missing form gracefully (no uncaught errors if `#retrofit-survey` absent)
- [ ] `IMPLEMENTATION.md` contains the integration section with field mapping table
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
