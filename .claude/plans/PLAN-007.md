---
id: PLAN-007
title: "Dialog 2-step wizard + machineDocs vertical layout"
status: in-progress
createdAt: 2026-03-19T11:00:00.000Z
taskIds: [TASK-30, TASK-31, TASK-32, TASK-33]
---

## Goal
Turn `ClaimCheckModal.vue` (desktop dialog) into a 2-step wizard — no more scroll in the dialog.
Fix `machineDocs` Checkbox group to stack vertically (one item per row).
`InlineClaimSection.vue` is **not changed** — it still renders all fields in one continuous flow.

## UX Step Order — Psychology Rationale
**Step 1: "Ihre Anlage"** — Machine fields only (machineType, machineAge, servicePartner, spareParts, recentIssues, machineDocs)
**Step 2: "Kontakt & Details"** — Contact + Optional fields (name, email, phone, companyName, companyAddress, notes)

Rationale (Cialdini commitment+consistency):
- Farmers are proud of their machines → step 1 is low-friction, no personal data → low barrier to start
- After answering 5+ machine questions the user is mentally invested → they willingly provide contact details in step 2
- This maximises completion rate vs. showing contact fields first

## Architecture Decision
Add a `formStep?: 1 | 2 | 'all'` prop to `ClaimCheckForm.vue` (defaults `'all'`).
- `'all'` → renders every section (inline mobile unchanged)
- `1` → renders only the Machine fieldset
- `2` → renders only the Contact + Optional fieldsets

Expose `validateStep1()` from `ClaimCheckForm` so the modal can gate navigation.
`ClaimCheckModal.vue` owns the wizard state (`dialogStep: 1 | 2`), calls `validateStep1()` before advancing, and only calls `submitForm()` on step 2.

## Problems Fixed
1. Dialog scroll — step 1 machine fields fit within 90vh without scroll
2. Dialog scroll — step 2 contact + optional also fit without scroll
3. machineDocs checkbox items stacked vertically (flex-col)

## Tasks

| ID | Role | Description | Depends on |
|---|---|---|---|
| TASK-30 | i18n | Add step labels + Next/Back button strings to `de.ts` | — |
| TASK-31 | implementation | `ClaimCheckForm.vue`: `formStep` prop + `validateStep1()` + machineDocs vertical layout | TASK-30 |
| TASK-32 | implementation | `ClaimCheckModal.vue`: 2-step wizard UI (step indicator, Next/Back/Submit footer) | TASK-31 |
| TASK-33 | qa | `vue-tsc --noEmit` + `npm run build` | TASK-32 |

## Acceptance Criteria
- Dialog step 1 shows Machine section only — no scroll on standard 1080p display
- Dialog step 2 shows Contact + Optional — no scroll
- Step indicator (1/2 dots or numbered pills) in dialog header area
- Validate step 1 fields before allowing Next; show shake + toast on error
- machineDocs checkboxes stacked one per row (flex-col)
- `InlineClaimSection.vue` untouched — still renders all fields
- `vue-tsc --noEmit` exits 0
- `npm run build` exits 0
