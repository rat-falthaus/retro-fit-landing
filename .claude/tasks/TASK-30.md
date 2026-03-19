---
id: TASK-30
title: "i18n: add dialog wizard step labels + navigation strings"
role: i18n
planId: PLAN-007
status: done
dependencies: []
createdAt: 2026-03-19T11:00:00.000Z
completedAt: 2026-03-19T11:15:00.000Z
---

## Result
Added 4 keys to `de.ts` modal block: `dialogStep1Label`, `dialogStep2Label`, `dialogStepNext`, `dialogStepBack`.

## Context
The 2-step dialog wizard needs labels for its step indicator and navigation buttons. All strings must live in `src/i18n/de.ts`.

## Files to Edit
- `src/i18n/de.ts` — add inside `modal:` object

## Implementation Steps

Add after `validationToastDetail` key in `modal`:

```ts
// Wizard step labels
dialogStep1Label: 'Ihre Anlage',
dialogStep2Label: 'Kontakt & Details',
dialogStepNext: 'Weiter',
dialogStepBack: 'Zurück',
```

## Acceptance Criteria
- [ ] 4 new keys exist in `t.modal`
- [ ] No TypeScript errors
