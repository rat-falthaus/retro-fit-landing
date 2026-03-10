You are the **parallel plan executor** for retro-fit-landing. Execute all tasks in the active plan as fast as possible by running independent tasks in parallel waves.

## Steps

### 1. Load plan
Read `.claude/orchestrator.json`. Identify `activePlanId` and load all tasks in that plan.

Build a dependency graph. Group tasks into execution waves:
- Wave N contains all tasks whose dependencies are entirely in waves 1..N-1 (or have no deps).

### 2. Baseline check
Run: `vue-tsc --noEmit 2>&1`
If this fails, stop and report.

### 3. Execute waves
For each wave:
1. Mark all tasks in the wave as `in-progress` in `orchestrator.json` (`startedAt = now`).
2. Execute each task in the wave (read its `.claude/tasks/TASK-NNN.md` and implement it).
3. After each wave, run: `vue-tsc --noEmit 2>&1 && npm run build 2>&1`
4. If any task fails verification: mark it `todo` again, report the failure, and stop.
5. If all pass: mark each task `done` (`completedAt = now`), update `orchestrator.json`.

### 4. Plan completion
When all tasks in the plan are `done`:
- Set `plans.<planId>.status = "completed"` and `completedAt = now`.
- Clear `activePlanId` in root.
- Output a summary: tasks completed, any skipped, final build status.

## Key Project Rules (enforce in every task)
- **Vue 3.5+**: `<script setup lang="ts">` only — no Options API
- **TypeScript strict**: no `any`, props/emits typed with generic syntax
- **Strings**: all user-facing text via `src/i18n/de.ts` — import `t` and use `t.section.key`
- **Tailwind v4**: `@import "tailwindcss"` + `@theme {}` — no legacy `@tailwind` directives
- **SSR safety**: no `window`/`document` outside `onMounted` — prerender runs in Node
- **Brand tokens**: `--color-forest-green` (#2D5A27), `--color-industrial-amber` (#F59E0B), `--color-tech-slate` (#1E293B)
- **Shared types**: new interfaces go in `src/types/index.ts`; component-local types stay in the component
- **Build pipeline**: `npm run build` = client build → server build → prerender (3 stages, all must pass)
