# Contao CMS Integration — SmartHarvest SPA Form Portal

## How it works

1. Contao renders the Form Generator output into a hidden `#contao-form-source` div
2. The Vue SPA mounts to `#app` — on mount, `useContaoFormBridge` detects the hidden form
3. The form DOM nodes (including CSRF `REQUEST_TOKEN`) are moved into the SPA component
4. A `MutationObserver` watches for Contao's `.confirmation` class → triggers success UI

---

## Contao Page Layout / Article HTML

Add a **HTML Content Element** or modify your **Page Layout** to include:

```html
<!-- Step 1: Form source container (hidden — SPA will move the form DOM from here) -->
<div id="contao-form-source" style="display:none;" aria-hidden="true">
  {{insert_content::FORM_CONTENT_ELEMENT_ID}}
</div>

<!-- Step 2: SPA mount point -->
<div id="app"></div>

<!-- Step 3: Load the compiled SPA bundle (adjust path to your Contao assets) -->
<script type="module" src="/files/retro-fit-landing/assets/entry-client.js"></script>
```

Replace `FORM_CONTENT_ELEMENT_ID` with the numeric ID of your Contao Form Content Element
(visible in the article content list, e.g. `{{insert_content::42}}`).

> **No extra attributes needed on the Contao div.** Real Contao output is activated automatically. Only the dev-mock block in `index.html` carries `data-dev-mock="true"` which tells the composable to skip it (prevents 405 errors on GitHub Pages / standalone builds).

---

## Contao Form Generator Settings

| Setting | Value |
|---|---|
| Form field names | Must match `scripts/rex-at-form-bridge.js` FIELD_MAP (see below) |
| Target page | Same page as the SPA (no redirect) |
| After submission | **"Display a confirmation message"** — NOT "Redirect to another page" |
| Confirmation CSS class | Contao adds `.confirmation` to the confirmation div — do not change |

### Required field names (Contao "Field name" or variable name):

| Contao Field Name | Maps from SPA |
|---|---|
| `Name_Ansprechpartner` | name |
| `Email` | email |
| `Telefon` | phone (tel) |
| `Anlagename_Anlage_Typ` | machine |
| `Alter_Anlage` | age (select) |
| `Service_Support_Partner` | service (radio: ja/nein) |
| `Ersatzteile` | parts (radio: ja/nein/unbekannt) |
| `Stoerungen_letzte_2_Jahre` | issues (radio: ja/nein) |
| `Name_Firma` | company (optional) |
| `Zusatzinformationen` | notes (textarea, optional) |

---

## Post-Submit Success Flow

```
User clicks "Submit" in Contao form
  → Contao does a full page reload (default POST → redirect or in-page confirmation)
  → Page reloads; Contao renders .confirmation div inside #contao-form-source
  → Vue SPA mounts → useContaoFormBridge detects .confirmation (not <form>)
  → .confirmation DOM node is moved into the portal target
  → isSuccess = true → parent component shows success UI
```

**Important:** Set Contao form "Nach dem Absenden" to **"Bestätigungsmeldung anzeigen"**
(show confirmation message). Do NOT use redirect mode, as the SPA needs the confirmation
HTML to remain on the same page URL to detect success.

---

## CSRF Token

The `REQUEST_TOKEN` hidden input is automatically included when the `<form>` DOM node is
moved by `useContaoFormBridge`. No additional handling needed — it submits correctly
because the actual form element (not a clone) is moved via `appendChild`.

---

## Local Development Mock

`index.html` (on the `asSPA` branch) contains a `<!-- DEV MOCK -->` block with a
realistic Contao form. Remove this block before deploying as standalone.

When `#contao-form-source` is NOT present in the DOM, the SPA falls back to the existing
`ClaimCheckForm` gateway (builds prefill URL → opens `rex-at.de/landingpage-retrofit.html`).
