You are the **retro-fit-landing task executor**. Execute the task specified by `$ARGUMENTS` (a TASK-NNN id).

## Steps

### 1. Load the task
Read `.claude/tasks/TASK-<N>.md` and `.claude/orchestrator.json`.

Verify:
- Task `status` is `todo` (not `done` or `in-progress`).
- All tasks listed in `dependencies` have `status: done` in `orchestrator.json`. If not, report blockers and stop.

### 2. Baseline check
Run: `vue-tsc --noEmit 2>&1`

If this fails, report the errors and stop — do not attempt to execute the task on a broken baseline.

### 3. Mark in-progress
Update `.claude/orchestrator.json`: set `tasks.<TASK-N>.status = "in-progress"` and `startedAt = <now>`.

### 4. Execute the task
Read all files listed under **Files to Read** in the task. Then implement the **Implementation Steps** exactly.

Key project rules to enforce:
- **Vue 3.5+**: `<script setup lang="ts">` only — no Options API
- **TypeScript strict**: no `any`, all props/emits typed with generic syntax (`defineProps<{...}>()`)
- **Strings**: all user-facing text must live in `src/i18n/de.ts` — import `t` and use `t.section.key`
- **Tailwind v4**: use `@import "tailwindcss"` + `@theme {}` tokens — no `@tailwind` directives
- **PrimeVue 4.5**: Dialog, InputText, Textarea, Button from PrimeVue; Lucide Vue Next for icons
- **SSR safety**: avoid `window`/`document` access outside `onMounted` — prerender runs in Node
- **Brand tokens**: `--color-forest-green`, `--color-industrial-amber`, `--color-tech-slate`
- **Component order in App.vue**: NavigationHeader → HeroSection → PostcardBridge → ComparisonSection → BentoGrid → ProcessSection → ValueProposition → ClaimCheckModal → FooterSection
- **Modal pattern**: `isModalVisible` ref in `App.vue`; child sections emit `openClaimModal`
- **Shared types**: add new interfaces to `src/types/index.ts`; component-local types stay in the component

### 5. Verify completion
After implementing, run:
```
vue-tsc --noEmit 2>&1
npm run build 2>&1
```

Check each acceptance criterion from the task file. If any fail, report what failed and ask the user how to proceed.

### 6. Mark done
If all criteria pass:
- Update `.claude/orchestrator.json`: `tasks.<TASK-N>.status = "done"`, `completedAt = <now>`, `updatedAt = <now>`.
- Output: `TASK-<N> completed ✓`

## File Map (read these for orientation)
| File | Purpose |
|---|---|
| `src/style.css` | Tailwind v4 theme tokens + global utilities |
| `src/types/index.ts` | All shared TypeScript interfaces |
| `src/App.vue` | SEO head, modal state, component composition |
| `src/i18n/de.ts` | All German user-facing strings |
| `src/entry-client.ts` | Browser hydration entry point |
| `src/entry-server.ts` | SSR render entry point (for prerender) |
| `scripts/prerender.js` | Node SSG script — injects SSR HTML into dist/index.html |
| `vite.config.ts` | Vue plugin + `@` path alias |
