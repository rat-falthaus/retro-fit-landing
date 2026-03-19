---
id: TASK-27
title: "i18n: add machineDocs label + options to de.ts"
role: i18n
planId: PLAN-006
status: done
dependencies: []
createdAt: 2026-03-19T10:00:00.000Z
completedAt: 2026-03-19T10:15:00.000Z
---

## Result
Added `machineDocs` (label string) and `machineDocsOptions` (4-item readonly array with `as const`) to `src/i18n/de.ts` inside the `modal` object, after `recentIssuesOptions`.

## Context
`machineDocsOptions` is currently a local array in `ClaimCheckForm.vue`. Per project rules, all user-facing strings must live in `src/i18n/de.ts`. This task migrates those labels and adds a field label key.

## Files to Edit
- `src/i18n/de.ts` — add inside `modal:` object, after `recentIssuesOptions` block

## Implementation Steps

Add the following keys to the `modal` object in `src/i18n/de.ts`, after `recentIssuesOptions`:

```ts
machineDocs: 'Vorhandene Unterlagen (optional)',
machineDocsOptions: [
  { label: 'Betriebsanleitung', value: 'manual' },
  { label: 'Schaltplan', value: 'circuit' },
  { label: 'Softwarebeschreibung', value: 'software_desc' },
  { label: 'Softwarequellen', value: 'software_src' },
] as const,
```

## Acceptance Criteria
- [ ] `t.modal.machineDocs` exists and is a German string
- [ ] `t.modal.machineDocsOptions` is a readonly array of `{ label, value }` tuples
- [ ] No hardcoded strings remain in component for these options
