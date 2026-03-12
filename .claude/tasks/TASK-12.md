---
id: TASK-12
title: "App.vue responsive modal routing: dialog on md+, inline on mobile"
role: frontend
planId: PLAN-003
status: todo
dependencies: [TASK-11]
createdAt: "2026-03-12T18:00:00.000Z"
---

## Context
App.vue must now orchestrate two presentation modes: on desktop (md+), open ClaimCheckModal as a dialog overlay; on mobile (<md), show InlineClaimSection in the page flow and scroll to it. The hero CTA and other "open claim modal" emitters must route to the correct mode.

## Files to Read
- `src/App.vue`
- `src/components/InlineClaimSection.vue` (from TASK-11)
- `src/components/ClaimCheckModal.vue` (refactored in TASK-11)

## Implementation Steps

1. **Import InlineClaimSection** in App.vue alongside ClaimCheckModal.

2. **Add reactive viewport tracking** (SSR-safe):
   ```typescript
   const isMobile = ref(false)
   onMounted(() => {
     const mql = window.matchMedia('(max-width: 767px)')
     isMobile.value = mql.matches
     mql.addEventListener('change', (e) => { isMobile.value = e.matches })
   })
   ```

3. **Add inline form visibility state**:
   ```typescript
   const isInlineFormVisible = ref(false)
   ```

4. **Update `openClaimModal`**:
   ```typescript
   const openClaimModal = () => {
     if (isMobile.value) {
       isInlineFormVisible.value = true
       // InlineClaimSection handles its own scrollIntoView
     } else {
       isModalVisible.value = true
     }
   }
   ```

5. **Update template**: Place `InlineClaimSection` after `HeroSection` (or after `PostcardBridge`) in the page flow:
   ```vue
   <HeroSection @open-claim-modal="openClaimModal" />
   <InlineClaimSection
     :visible="isInlineFormVisible"
     @submitted="isInlineFormVisible = false"
   />
   <PostcardBridge />
   ```

6. **Keep ClaimCheckModal** in template — it self-hides on mobile via `hidden md:block` from TASK-11.

7. **Hero CTA flow on mobile**: The hero `handleCtaClick` still emits `openClaimModal`. On mobile, instead of scrolling past hero then opening a dialog, App.vue sets inline form visible. The InlineClaimSection auto-scrolls into view. Adjust the hero's CTA flow so on mobile it just emits immediately (no two-phase scroll needed for inline form).

## Acceptance Criteria
- [ ] `vue-tsc --noEmit` exits 0
- [ ] `npm run build` exits 0
- [ ] CTA on desktop opens Dialog modal (unchanged)
- [ ] CTA on mobile shows inline form section and scrolls to it
- [ ] Inline form hidden by default, visible only when triggered
- [ ] Resizing browser from mobile to desktop switches mode correctly
