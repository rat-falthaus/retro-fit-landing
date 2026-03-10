# Tasks

Task files are created here by `/orchestrator` and `/new-task` commands.
Each file is named `TASK-NNN.md` and executed with `/execute-task TASK-NNN`.

## Commands

| Command | Usage | Description |
|---------|-------|-------------|
| `/orchestrator <goal>` | `/orchestrator "Add BentoGrid section"` | Decompose a goal into a plan of ordered tasks |
| `/new-task <description>` | `/new-task "Add missing i18n key for footer CTA"` | Create a single focused task |
| `/execute-task TASK-NNN` | `/execute-task TASK-001` | Implement one task, verify build, mark done |
| `/execute-plan PLAN-NNN` | `/execute-plan PLAN-001` | Execute all tasks in a plan in parallel waves |
| `/archive-plan PLAN-NNN` | `/archive-plan PLAN-001` | Seal a completed plan into `.claude/plans/PLAN-NNN.md` |

## Workflow

```
/orchestrator "my big goal"
  → creates PLAN-001 + TASK-001, TASK-002, ... in orchestrator.json
  → writes .claude/tasks/TASK-NNN.md files

# Option A — sequential execution
/execute-task TASK-001
  → implements TASK-001, verifies vue-tsc + npm run build, marks done

/execute-task TASK-002
  → implements TASK-002 (only if TASK-001 is done), marks done

# Option B — parallel execution (faster)
/execute-plan PLAN-001
  → builds dependency graph
  → runs Wave 0 tasks in parallel, then Wave 1, etc.
  → marks all tasks done

# When plan is complete
/archive-plan PLAN-001
  → writes .claude/plans/PLAN-001.md (permanent archive)
  → removes PLAN-001 and its tasks from orchestrator.json (keeps it slim)
```

## State

All active plan/task state is persisted in `.claude/orchestrator.json`.
Completed plans are archived to `.claude/plans/PLAN-NNN.md`.

## Roles

| Role       | Covers                                                                 |
|------------|-----------------------------------------------------------------------|
| `frontend` | Vue components, Composition API, props/emits, PrimeVue, Lucide icons |
| `i18n`     | German strings in `src/i18n/de.ts`, copy changes                     |
| `styling`  | Tailwind v4 tokens in `src/style.css`, utility classes, brand tokens  |
| `seo`      | SSR head tags via `useHead()`, prerender placeholders, meta           |
| `build`    | Vite config, 3-stage SSG pipeline, `scripts/prerender.js`            |
| `qa`       | Type-checking, build verification, accessibility review               |
| `planning` | Task decomposition, JSON updates, status reviews                      |

## Verification Commands

```bash
vue-tsc --noEmit          # Fast type-check (use as baseline check)
npm run build             # Full 3-stage SSG build (client + server + prerender)
npm run dev               # Dev server at http://localhost:5173
npm run preview           # Preview built output
```


```json
{
  "version": "2",
  "counters": { "nextTaskId": 93, "nextPlanId": 18 },
  "activePlanId": null,
  "notes": "...",
  "plans": { "PLAN-NNN": { ... } },
  "tasks": { "TASK-NNN": { ..., "role": "cli" } }
}
```

Key v2 improvements over v1:
- `counters.nextTaskId` / `counters.nextPlanId` — no scanning required
- `role:` field on every task — drives agent persona selection
- `/execute-plan` — wave-based parallel execution
- `/archive-plan` — keeps orchestrator.json slim after plan completion

