# TASK-41 — Add dev-mock `#contao-form-source` to `index.html`

**Plan:** PLAN-009
**Role:** build
**Status:** done
**Dependencies:** —

---

## Goal

Add a hidden `#contao-form-source` div with a realistic mock Contao form to `index.html`.
This allows local `npm run dev` testing of Contao mode without a real Contao installation.

The mock is wrapped in an HTML comment making it easy to remove for standalone builds.
In production (when deployed inside Contao), Contao itself injects this div — the mock is
only needed locally.

---

## Change to `index.html`

Insert **after** `<body>` opening and **before** `<div id="app">`:

```html
<!-- DEV MOCK: In production Contao removes this and injects the real form.
     Delete this block when deploying standalone (non-Contao) builds. -->
<div id="contao-form-source" style="display:none;" aria-hidden="true">
  <form id="retrofit-survey" method="post" action="">
    <input type="hidden" name="REQUEST_TOKEN" value="MOCK_CSRF_TOKEN">
    <input type="hidden" name="FORM_SUBMIT" value="retrofit_check">
    <!-- Kontaktdaten -->
    <div class="formbody">
      <div class="widget widget-text">
        <label for="ctrl_name">Name *</label>
        <input type="text" name="Name_Ansprechpartner" id="ctrl_name" required>
      </div>
      <div class="widget widget-text">
        <label for="ctrl_email">E-Mail *</label>
        <input type="email" name="Email" id="ctrl_email" required>
      </div>
      <div class="widget widget-text">
        <label for="ctrl_phone">Telefon *</label>
        <input type="tel" name="Telefon" id="ctrl_phone" required>
      </div>
      <div class="widget widget-text">
        <label for="ctrl_machine">Anlage / Maschine *</label>
        <input type="text" name="Anlagename_Anlage_Typ" id="ctrl_machine" required>
      </div>
      <div class="widget widget-select">
        <label for="ctrl_age">Alter der Anlage *</label>
        <select name="Alter_Anlage" id="ctrl_age" required>
          <option value="">Bitte wählen</option>
          <option value="juenger als 10">jünger als 10 Jahre</option>
          <option value="10-20">10 – 20 Jahre</option>
          <option value="aelter als 20">älter als 20 Jahre</option>
        </select>
      </div>
      <div class="widget widget-radio">
        <legend>Service-/Support-Partner vorhanden? *</legend>
        <label><input type="radio" name="Service_Support_Partner" value="ja"> Ja</label>
        <label><input type="radio" name="Service_Support_Partner" value="nein"> Nein</label>
      </div>
      <div class="widget widget-radio">
        <legend>Ersatzteile lieferbar? *</legend>
        <label><input type="radio" name="Ersatzteile" value="ja"> Ja</label>
        <label><input type="radio" name="Ersatzteile" value="nein"> Nein</label>
        <label><input type="radio" name="Ersatzteile" value="unbekannt"> Unbekannt</label>
      </div>
      <div class="widget widget-radio">
        <legend>Störungen in den letzten 2 Jahren? *</legend>
        <label><input type="radio" name="Stoerungen_letzte_2_Jahre" value="ja"> Ja</label>
        <label><input type="radio" name="Stoerungen_letzte_2_Jahre" value="nein"> Nein</label>
      </div>
      <div class="widget widget-textarea">
        <label for="ctrl_notes">Zusätzliche Informationen</label>
        <textarea name="Zusatzinformationen" id="ctrl_notes" rows="4"></textarea>
      </div>
      <div class="widget widget-submit">
        <button type="submit">Retrofit-Check anfordern →</button>
      </div>
    </div>
  </form>
</div>
```

---

## Acceptance

- `#contao-form-source` div inserted right after `<body>` tag
- Contains a form with field names matching `rex-at-form-bridge.js` FIELD_MAP
- Wrapped in a clear DEV MOCK comment
- `npm run dev` → Contao mode activates in both modal and inline section
- `npm run build` still produces valid output (this div doesn't break SSG)

## Result

Added `#contao-form-source` hidden div with realistic full mock form (matching FIELD_MAP) immediately after `<body>` in `index.html`. Wrapped in `<!-- DEV MOCK -->` comment.
