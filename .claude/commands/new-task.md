You are a task-definition writer for the **retro-fit-landing** Vue 3 / TypeScript / Vite SSG project. Given the description below, produce one precise, self-contained task file and register it in `.claude/orchestrator.json`.

## Input

`$ARGUMENTS` — a plain-English description of the work to be done.

## Steps

### 1. Gather context
- Read `.claude/orchestrator.json` to get `counters.nextTaskId` and `activePlanId`.
- Identify which layer is affected:
  - If component changes → read the relevant file(s) in `src/components/`.
  - If string/copy changes → read `src/i18n/de.ts`.
  - If shared types change → read `src/types/index.ts`.
  - If styling/theme changes → read `src/style.css` and `tailwind.config.js`.
  - If SEO/head changes → read `src/App.vue` (useHead section) and `src/entry-server.ts`.
  - If build/prerender changes → read `vite.config.ts` and `scripts/prerender.js`.
  - If hero slider changes → read `src/components/HeroSection.vue`.
  - If modal changes → read `src/components/ClaimCheckModal.vue`.
- Run `vue-tsc --noEmit 2>&1` to confirm the type-check baseline is passing before creating the task.

### 2. Determine role
Choose the single most appropriate role:

| Role       | Covers                                                                 |
|------------|-----------------------------------------------------------------------|
| `frontend` | Vue components, Composition API, props/emits, PrimeVue, Lucide icons |
| `i18n`     | German strings in `src/i18n/de.ts`, copy changes                     |
| `styling`  | Tailwind v4 tokens in `src/style.css`, utility classes, brand tokens  |
| `seo`      | SSR head tags via `useHead()`, prerender placeholders, meta           |
| `build`    | Vite config, 3-stage SSG pipeline, `scripts/prerender.js`            |
| `qa`       | Type-checking, build verification, accessibility review               |
| `planning` | Task decomposition, JSON updates, status reviews                      |

### 3. Write the task file
Create `.claude/tasks/TASK-<nextTaskId>.md` with this exact structure:

````
---
id: TASK-<N>
title: <concise action phrase>
role: <role>
planId: <activePlanId>
status: todo
dependencies: [<comma-separated TASK IDs, or empty>]
createdAt: <ISO 8601 timestamp>
---

## Context
<1-3 sentences explaining WHY this task is needed and what problem it solves>

## Files to Read
<list of file paths the executor must read before starting>

## Implementation Steps
<numbered list of concrete steps — specific enough that no follow-up questions are needed>

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0 (all 3 stages: client, server, generate)
- [ ] No hardcoded user-facing strings in templates (all text via `src/i18n/de.ts`)
- [ ] <task-specific criterion 1>
- [ ] <task-specific criterion 2>

## Anti-patterns to Avoid
- NEVER use Options API — all components use `<script setup lang="ts">`
- NEVER hardcode user-facing strings in templates — import from `src/i18n/de.ts`
- NEVER use `any` type — strict TypeScript required
- NEVER add global event listeners without cleanup in `onUnmounted`
- NEVER use `@tailwind base/components/utilities` — use `@import "tailwindcss"` + `@theme {}`
- NEVER define runtime `PropType` validators — use TypeScript generic syntax for props/emits
````

### 4. Register in orchestrator.json
Update `.claude/orchestrator.json`:
- Increment `counters.nextTaskId`
- Add the new task entry under `tasks` with `status: "todo"`
- If a `planId` exists, append the new task ID to `plans.<planId>.taskIds`
- Update `updatedAt` to now

### 5. Confirm
Output a one-line summary: `Created TASK-<N>: <title> (role: <role>)`

## Constraints
- NEVER write more than one task per invocation.
- NEVER modify any Go source files.
- All acceptance criteria MUST include the three standard build/test checks.
- NEVER use `npm`, `npx`, or any Node.js tooling — this is a pure Go project.
