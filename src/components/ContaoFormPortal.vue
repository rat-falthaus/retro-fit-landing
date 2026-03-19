<script setup lang="ts">
import { watch } from 'vue'
import { useContaoFormBridge } from '@/composables/useContaoFormBridge'

const props = defineProps<{
  /** Must be unique per page — used as the portal target element ID */
  placeholderId: string
}>()

const emit = defineEmits<{
  (e: 'contao-mode-detected'): void
  (e: 'success'): void
}>()

const { isContaoMode, isSuccess } = useContaoFormBridge(props.placeholderId)

watch(isContaoMode, (val) => { if (val) emit('contao-mode-detected') })
watch(isSuccess,    (val) => { if (val) emit('success') })
</script>

<template>
  <!--
    Portal target: always in DOM (v-show, not v-if) so onMounted in the composable
    can find it immediately via getElementById. Hidden until Contao form is detected.
  -->
  <div
    :id="props.placeholderId"
    class="contao-form-portal"
    v-show="isContaoMode && !isSuccess"
  />

  <!--
    Fallback slot: shown when no Contao source is present.
    Hosts <ClaimCheckForm> in both modal and inline contexts.
  -->
  <slot v-if="!isContaoMode" name="fallback" />
</template>
