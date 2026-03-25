/**
 * rex-at-form-bridge.js
 *
 * Reads URL query parameters sent by the SmartHarvest / Retrofit-Thüringen
 * landing page and prefills the matching fields in the Contao #retrofit-survey
 * form. Paste this script into the Contao page layout's <head> (with defer)
 * or include it via the custom JavaScript section of the Contao page settings.
 *
 * Parameters consumed (short keys from landing page → Contao field names):
 *   ?name=...            → Name_Ansprechpartner  (text, required)
 *   &email=...           → Email                 (email, required)
 *   &tel=...             → Telefon               (tel, required)
 *   &machine=...         → Anlagename_Anlage_Typ (text, required)
 *   &age=...             → Alter_Anlage          (select, required)
 *   &service=...         → Service_Support_Partner (radio, required)
 *   &parts=...           → Ersatzteile           (radio, required)
 *   &issues=...          → Stoerungen_letzte_2_Jahre (radio, required)
 *   &company=...         → Name_Firma            (text, optional)
 *   &notes=...           → Zusatzinformationen   (textarea, optional)
 *
 * If ALL required fields are present, the form is auto-submitted after a
 * short delay (1.5s) to give the user time to see what happened. A banner
 * is shown above the form to inform the user.
 *
 * No external dependencies. Safe to run even when params are absent.
 *
 * HOWTO:
 * Add this file to your Contao installation, e.g. in /assets/js/rex-at-form-bridge.js
 * 1. In Contao backend → Layouts → layout for landingpage-retrofit.html
 *
 * 2. Paste into "Custom JavaScript" / <head> section:
 *    <script defer>
 *      TODO: paste rex-at-form-bridge.js contents here
 *    </script>
 *
 * 3. Test: https://rex-at.de/landingpage-retrofit.html?name=Test+User&email=test%40test.de&tel=01234567890&machine=Testanlage&age=10-20&service=ja&parts=nein&issues=ja
 *    → All fields prefilled, page scrolls to form, auto-submits after 1.5s
 */
;(function () {
  'use strict'

  // Maps: [URL param key, Contao field name, field type]
  // Types: 'text' | 'select' | 'radio' | 'textarea'
  var FIELD_MAP = [
    ['name',    'Name_Ansprechpartner',      'text'],
    ['email',   'Email',                     'text'],
    ['tel',     'Telefon',                   'text'],
    ['machine', 'Anlagename_Anlage_Typ',     'text'],
    ['age',     'Alter_Anlage',              'select'],
    ['service', 'Service_Support_Partner',   'radio'],
    ['parts',   'Ersatzteile',              'radio'],
    ['issues',  'Stoerungen_letzte_2_Jahre', 'radio'],
    ['company', 'Name_Firma',                'text'],
    ['notes',   'Zusatzinformationen',       'textarea'],
  ]

  var REQUIRED_PARAMS = ['name', 'email', 'tel', 'machine', 'age', 'service', 'parts', 'issues']

  function prefillForm() {
    var params = new URLSearchParams(window.location.search)
    var form = document.getElementById('retrofit-survey')
    if (!form) return

    // Check if any of our params are present at all
    var hasAnyParam = false
    for (var i = 0; i < FIELD_MAP.length; i++) {
      if (params.has(FIELD_MAP[i][0])) { hasAnyParam = true; break }
    }
    if (!hasAnyParam) return

    var filledCount = 0
    var requiredFilled = 0

    FIELD_MAP.forEach(function (entry) {
      var paramKey  = entry[0]
      var fieldName = entry[1]
      var fieldType = entry[2]
      var value = params.get(paramKey)
      if (!value) return

      var isRequired = REQUIRED_PARAMS.indexOf(paramKey) !== -1

      if (fieldType === 'text' || fieldType === 'textarea') {
        var el = form.querySelector('[name="' + fieldName + '"]')
        if (!el) return
        el.value = value
        el.dispatchEvent(new Event('input',  { bubbles: true }))
        el.dispatchEvent(new Event('change', { bubbles: true }))
        filledCount++
        if (isRequired) requiredFilled++

      } else if (fieldType === 'select') {
        var sel = form.querySelector('select[name="' + fieldName + '"]')
        if (!sel) return
        sel.value = value
        sel.dispatchEvent(new Event('change', { bubbles: true }))
        filledCount++
        if (isRequired) requiredFilled++

      } else if (fieldType === 'radio') {
        var radios = form.querySelectorAll('input[name="' + fieldName + '"]')
        for (var r = 0; r < radios.length; r++) {
          if (radios[r].value === value) {
            radios[r].checked = true
            radios[r].dispatchEvent(new Event('change', { bubbles: true }))
            filledCount++
            if (isRequired) requiredFilled++
            break
          }
        }
      }
    })

    if (filledCount > 0) {
      form.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Auto-submit if ALL required fields were prefilled
    var allRequiredFilled = (requiredFilled === REQUIRED_PARAMS.length)
    if (allRequiredFilled) {
      // Show a brief banner so the user knows what's happening
      var banner = document.createElement('div')
      banner.style.cssText =
        'background:#2D5A27;color:#fff;padding:12px 20px;text-align:center;' +
        'font-size:15px;border-radius:8px;margin-bottom:16px;'
      banner.textContent =
        'Ihre Daten aus dem Retrofit-Gutschein wurden übertragen – ' +
        'Formular wird automatisch abgesendet …'
      form.parentNode.insertBefore(banner, form)

      // Submit after 1.5s so user can see the prefilled data
      setTimeout(function () {
        var submitBtn = form.querySelector('button[type="submit"]')
        if (submitBtn) {
          submitBtn.click()
        } else {
          form.submit()
        }
      }, 1500)
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', prefillForm)
  } else {
    prefillForm()
  }
})()
