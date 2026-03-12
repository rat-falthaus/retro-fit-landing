---
id: TASK-4
title: Add gateway-modal i18n strings to de.ts
role: i18n
planId: PLAN-002
status: todo
dependencies: []
createdAt: 2026-03-12T10:00:00.000Z
---

## Context
The ClaimCheckModal is being reworked from a fake-submit form into a 3-field gateway that
opens rex-at.de in a new tab with URL prefill params. The current `t.modal.*` keys need
to be completely replaced with strings matching the new 2-state UI:
1. **Input state** — name, email, phone, CTA "Weiter zum Retrofit-Check"
2. **Open state** — confirmation that the full form opened in a new tab + manual fallback link

All current modal keys are obsolete (farmSize, farmSizePlaceholder, equipment,
equipmentPlaceholder, message, messagePlaceholder, submit, successTitle, successText,
successNote) and must be replaced with the keys listed below.

## Files to Read
- `src/i18n/de.ts` — full file to understand exact current structure
- `src/components/ClaimCheckModal.vue` — to understand which keys TASK-5 will expect

## Implementation Steps

1. Open `src/i18n/de.ts`.

2. Replace the entire `modal` object with the following (preserve the `as const` export):

```typescript
modal: {
  title: 'Jetzt Retrofit-Check starten',
  subtitle: '2.000 € Gutschein – Ohne Verpflichtung',

  // Step 1 — Gateway form
  name: 'Name Ansprechpartner',
  namePlaceholder: 'Max Mustermann',
  email: 'E-Mail-Adresse',
  emailPlaceholder: 'max@beispiel.de',
  phone: 'Telefonnummer',
  phonePlaceholder: '+49 36203 9591-0',
  submit: 'Weiter zum Retrofit-Check →',
  privacyNote:
    'Ihre Daten werden nur zur Vorbereitung des Retrofit-Checks verwendet. Keine Weitergabe an Dritte.',
  required: 'Pflichtfeld',

  // Step 2 — Redirected state
  openedTitle: 'Formular geöffnet!',
  openedText:
    'Das Retrofit-Formular wurde in einem neuen Tab geöffnet. Ihre Kontaktdaten sind bereits vorausgefüllt – bitte ergänzen Sie die Angaben zu Ihrer Anlage und senden Sie das Formular ab.',
  openedFallback: 'Falls kein Tab geöffnet wurde:',
  openedFallbackLink: 'Retrofit-Check direkt öffnen →',
  openedClose: 'Schließen',
},
```

3. Verify no references to the removed keys exist anywhere in `src/` by searching for:
   `farmSize`, `farmSizePlaceholder`, `equipment`, `equipmentPlaceholder`,
   `successTitle`, `successText`, `successNote`
   (they should only appear in `ClaimCheckModal.vue` which TASK-5 will fully rewrite — safe to proceed)

4. Run `npx vue-tsc --noEmit` — expected: zero errors (ClaimCheckModal.vue still uses old keys
   but TASK-5 will fix that; the type-check will error only after TASK-5 touches the component,
   so treat a clean pass here as success for TASK-4 alone).

## Acceptance Criteria
- [ ] All removed keys (`farmSize`, `equipment`, `message`, `successTitle`, etc.) are gone from `t.modal`
- [ ] All new keys listed above exist with exact German text
- [ ] `t` export is still `as const`
- [ ] `vue-tsc --noEmit` exits 0 before TASK-5 runs
