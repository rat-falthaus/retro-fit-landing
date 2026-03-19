---
id: PLAN-006
title: "PrimeVue form upgrade: SelectButton for radios + Checkbox multi-select for machineDocs"
status: in-progress
createdAt: 2026-03-19T10:00:00.000Z
taskIds: [TASK-27, TASK-28, TASK-29]
---

## Goal
Replace all native `<input type="radio">` elements in `ClaimCheckForm.vue` with PrimeVue `SelectButton`.
Activate the previously unused `machineDocsOptions` multi-select using PrimeVue `Checkbox` components.
Move `machineDocsOptions` labels to `src/i18n/de.ts`.
Wire `companyAddress` and `machineDocs` into `buildPrefillUrl`.

## Problems Identified

1. **3× native radio inputs** — `servicePartner`, `spareParts`, `recentIssues` all use bare `<input type="radio">` with `accent-rex-orange`. These must become PrimeVue `SelectButton` for consistent design-system styling.

2. **`machineDocsOptions` dead code** — defined as a local array but never rendered. User wants it active as a multi-select (Checkbox group). `machineDocs` field type is wrong (`string` → `string[]`).

3. **`companyAddress` missing from `buildPrefillUrl`** — field collected but never appended to the redirect URL.

4. **`machineDocsOptions` strings in component** — labels must live in `src/i18n/de.ts` per project rules (no hardcoded strings in components).

## Tasks

| ID | Role | Description | Depends on |
|---|---|---|---|
| TASK-27 | i18n | Add `machineDocs` + `machineDocsOptions` keys to `de.ts` | — |
| TASK-28 | implementation | Upgrade `ClaimCheckForm.vue` — SelectButton, Checkbox, types, buildPrefillUrl | TASK-27 |
| TASK-29 | qa | vue-tsc + npm run build verification | TASK-28 |

## Acceptance Criteria
- All radio groups replaced by `<SelectButton>` with correct `optionLabel`/`optionValue`
- `machineDocs` field is `string[]`, multi-select via `<Checkbox>` group, optional
- `companyAddress` and `machineDocs` appended to prefill URL
- All strings in `de.ts`, none hardcoded in template
- `vue-tsc --noEmit` exits 0
- `npm run build` exits 0
