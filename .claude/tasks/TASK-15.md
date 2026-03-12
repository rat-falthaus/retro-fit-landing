---
id: TASK-15
title: "i18n: add mobile nav and inline form section strings"
role: i18n
planId: PLAN-003
status: todo
dependencies: []
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
The mobile hamburger menu (TASK-9) and inline claim section (TASK-11) need additional German strings in de.ts: aria labels, menu item text, inline section header copy.

## Files to Read
- `src/i18n/de.ts`

## Implementation Steps

1. **Add `nav` section** (if not present) to `de.ts`:
   ```typescript
   nav: {
     menuToggle: 'Menü öffnen',
     menuClose: 'Menü schließen',
     retrofitCheck: 'Retrofit-Check starten',
     about: 'Über uns',
     contact: 'Kontakt',
     homeUrl: 'https://www.rex-at.de',
   },
   ```

2. **Add `inlineForm` section** for the mobile inline claim form wrapper:
   ```typescript
   inlineForm: {
     title: 'Jetzt Retrofit-Check starten',
     subtitle: 'Füllen Sie das Formular aus – wir melden uns bei Ihnen.',
     successTitle: 'Formular wird übermittelt!',
     successText: 'Ihre Daten werden an Rex-AT übertragen. Vielen Dank!',
   },
   ```

3. **Ensure no duplicate keys** with existing `modal` section — the inline title may differ from modal title.

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] `t.nav.*` keys available for NavigationHeader
- [ ] `t.inlineForm.*` keys available for InlineClaimSection
- [ ] No duplicate keys or broken references
