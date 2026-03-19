<script setup lang="ts">
import { ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { t } from '@/i18n/de'
import ClaimCheckForm from './ClaimCheckForm.vue'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  (e: 'update:visible', value: boolean): void
}>()

type ModalStep = 'input' | 'opened'

const step = ref<ModalStep>('input')
const dialogStep = ref<1 | 2>(1)
const formRef = ref<InstanceType<typeof ClaimCheckForm> | null>(null)

const externalFormUrl = 'https://rex-at.de/landingpage-retrofit.html'

const goNext = () => {
  if (formRef.value?.validateStep1()) {
    dialogStep.value = 2
  }
}
const goBack = () => { dialogStep.value = 1 }

const closeDialog = () => {
  emit('update:visible', false)
  setTimeout(() => {
    formRef.value?.reset()
    step.value = 'input'
    dialogStep.value = 1
  }, 300)
}
</script>

<template>
  <Dialog
    :visible="props.visible"
    @update:visible="closeDialog"
    modal
    :closable="true"
    :style="{ width: '95vw', maxWidth: '640px', maxHeight: '90vh' }"
    :pt="{
      root: 'rounded-2xl overflow-hidden flex flex-col',
      header: 'bg-rex-dark text-white p-5 shrink-0',
      content: 'p-6 overflow-y-auto bg-white flex-1 min-h-0',
      footer: 'px-6 py-4 bg-white border-t border-gray-200 shrink-0',
    }"
  >
    <template #header>
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 bg-industrial-amber rounded-lg flex items-center justify-center shrink-0">
          <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
        </div>
        <div>
          <h2 class="text-2xl font-display font-bold">{{ t.modal.title }}</h2>
          <p class="text-white/90 text-sm">{{ t.modal.subtitle }}</p>
        </div>
      </div>
      <!-- Step indicator -->
      <div v-if="step === 'input'" class="flex items-center gap-3 mt-4 ml-1">
        <template v-for="n in [1, 2]" :key="n">
          <div class="flex items-center gap-2">
            <div
              class="w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors duration-200"
              :class="dialogStep >= n ? 'bg-industrial-amber text-white' : 'bg-white/20 text-white/60'"
            >{{ n }}</div>
            <span
              class="text-xs font-medium transition-colors duration-200"
              :class="dialogStep >= n ? 'text-white' : 'text-white/50'"
            >{{ n === 1 ? t.modal.dialogStep1Label : t.modal.dialogStep2Label }}</span>
          </div>
          <div v-if="n === 1" class="w-8 h-px" :class="dialogStep === 2 ? 'bg-industrial-amber' : 'bg-white/20'" />
        </template>
      </div>
    </template>

    <!-- Step: opened (success / redirect confirmation) -->
    <div v-if="step === 'opened'" class="text-center py-8 space-y-4">
      <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
      </div>
      <h3 class="text-2xl font-display font-bold text-forest-green">{{ t.modal.openedTitle }}</h3>
      <p class="text-gray-600 text-sm leading-relaxed max-w-sm mx-auto">{{ t.modal.openedText }}</p>
      <p class="text-xs text-gray-500">
        {{ t.modal.openedFallback }}
        <a
          :href="externalFormUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-rex-orange font-semibold underline hover:text-rex-orange-dark ml-1"
        >{{ t.modal.openedFallbackLink }}</a>
      </p>
      <Button
        :label="t.modal.openedClose"
        class="btn-primary mt-2"
        @click="closeDialog"
      />
    </div>

    <!-- Step: input — shared ClaimCheckForm component -->
    <ClaimCheckForm
      v-else
      ref="formRef"
      form-id="modal"
      :form-step="dialogStep"
      @success="step = 'opened'"
    />

    <template v-if="step === 'input'" #footer>
      <!-- Step 1: Next only -->
      <template v-if="dialogStep === 1">
        <Button
          type="button"
          :label="t.modal.dialogStepNext + ' →'"
          class="w-full btn-primary py-4 text-base font-bold"
          @click="goNext"
        />
      </template>
      <!-- Step 2: Back + Submit -->
      <template v-else>
        <div class="flex gap-3">
          <Button
            type="button"
            :label="'← ' + t.modal.dialogStepBack"
            class="btn-secondary py-4 px-6 text-base font-semibold"
            @click="goBack"
          />
          <Button
            type="button"
            :label="t.modal.submit"
            class="flex-1 btn-primary py-4 text-base font-bold"
            @click="formRef?.submitForm()"
          />
        </div>
      </template>
      <p class="text-xs text-gray-500 text-center mt-3">{{ t.modal.privacyNote }}</p>
    </template>
  </Dialog>
</template>
