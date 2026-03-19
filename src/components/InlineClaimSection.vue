<script setup lang="ts">
import { ref } from 'vue'
import { t } from '@/i18n/de'
import ClaimCheckForm from './ClaimCheckForm.vue'
import ContaoFormPortal from './ContaoFormPortal.vue'

type InlineStep = 'input' | 'opened'

const step = ref<InlineStep>('input')
const formRef = ref<InstanceType<typeof ClaimCheckForm> | null>(null)
const isContaoMode = ref(false)

const externalFormUrl = 'https://rex-at.de/landingpage-retrofit.html'
</script>

<template>
  <section
    id="inline-claim"
    class="md:hidden py-12 safe-area-bottom"
    style="background-color: #f0ece8"
  >
    <div class="section-container">
      <div class="max-w-xl mx-auto">

        <!-- Section header -->
        <div class="text-center mb-6" data-aos="fade-up">
          <h2 class="text-2xl font-display font-bold" style="color: #313131">
            {{ t.inlineForm.title }}
          </h2>
          <p class="text-sm mt-2 leading-relaxed" style="color: #586569">
            {{ t.inlineForm.subtitle }}
          </p>
        </div>

        <!-- Success state -->
        <div v-if="step === 'opened'" class="text-center py-10 px-6 space-y-4" data-aos="fade-up">
          <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <svg class="w-12 h-12 text-green-600" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-xl font-display font-bold" style="color: #313131">
            {{ t.inlineForm.successTitle }}
          </h3>
          <p class="text-gray-600 text-sm leading-relaxed max-w-xs mx-auto">
            {{ t.inlineForm.successText }}
          </p>
          <p class="text-xs text-gray-500">
            {{ t.modal.openedFallback }}
            <a
              :href="externalFormUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="text-rex-orange font-semibold underline ml-1"
            >{{ t.modal.openedFallbackLink }}</a>
          </p>
        </div>

        <!-- Input form — no card wrapper, fields flow in page -->
        <template v-else>
          <div data-aos="fade-up" data-aos-delay="100">
            <ContaoFormPortal
              placeholder-id="inline-contao-form"
              @contao-mode-detected="isContaoMode = true"
              @success="step = 'opened'"
            >
              <template #fallback>
                <ClaimCheckForm ref="formRef" form-id="inline" @success="step = 'opened'" />
                <button type="button" class="w-full btn-primary py-4 text-base font-bold text-center mt-8"
                        @click="formRef?.submitForm()">
                  {{ t.modal.submit }}
                </button>
                <p class="text-xs text-gray-500 text-center mt-3">{{ t.modal.privacyNote }}</p>
              </template>
            </ContaoFormPortal>
          </div>
        </template>

      </div>
    </div>
  </section>
</template>
