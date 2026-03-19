# TASK-44 — Add `data-contao-live` gate to `useContaoFormBridge`

**Plan:** PLAN-010
**Role:** frontend
**Status:** done
**Dependencies:** —

---

## Goal

Add a single guard at the top of the `onMounted` block in
`src/composables/useContaoFormBridge.ts`:

```typescript
// Only activate when the source div explicitly opts in.
// Without data-contao-live="true" the composable is inert → ClaimCheckForm
// gateway is used (standalone / GitHub Pages mode).
if (source.dataset['contaoLive'] !== 'true') return
```

This means:
- GitHub Pages: mock div has no `data-contao-live` → guard returns → `isContaoMode`
  stays `false` → `ContaoFormPortal` renders the `#fallback` slot → `ClaimCheckForm`
  gateway fires → `rex-at.de` opens in new tab ✅
- Contao embed: real div has `data-contao-live="true"` → guard passes → portal activates ✅

---

## Exact diff location

In `src/composables/useContaoFormBridge.ts`, inside `onMounted`, after:
```typescript
    if (!source || !target) return
```

Insert:
```typescript
    // Guard: only activate for explicitly opted-in Contao deployments.
    // Standalone / GitHub Pages builds have the dev-mock div without this attribute.
    if (source.dataset['contaoLive'] !== 'true') return
```

---

## Acceptance

- `useContaoFormBridge` exits early when `data-contao-live` is missing or not `"true"`
- `isContaoMode` remains `false` in that case
- Module-level `_formOwner` is never set in that case
- No TypeScript errors

## Result

Added `if (source.dataset['contaoLive'] !== 'true') return` guard after the null check in `onMounted`. GitHub Pages mock (no attribute) → composable is inert → ClaimCheckForm gateway. Contao embed (attribute present) → portal activates.
