<script setup lang="ts">
import { t } from '@/i18n/de'

const emit = defineEmits<{ (e: 'openClaimModal'): void }>()
</script>

<template>
  <!-- Mobile scroll-dwell wrapper: extra height keeps section sticky so user reads it -->
  <div class="postcard-dwell">
    <section class="sticky top-14 sm:static sm:top-auto py-8 sm:py-20" style="background-color: #f0ece8">
    <div class="section-container">
      <div
        class="max-w-4xl mx-auto text-center"
        data-aos="fade-up"
      >
        <!-- Postcard card -->
        <div class="inline-block mb-8 sm:mb-10 sm:-rotate-1 sm:hover:rotate-0 transition-transform duration-300">
          <div class="bg-white p-5 sm:p-8 rounded-2xl sm:shadow-2xl" style="border: 3px solid #EB6734">

            <!-- Mobile icon accent -->
            <div class="sm:hidden flex justify-center mb-3">
              <svg class="w-12 h-12" style="color: #EB6734" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75a4.5 4.5 0 01-4.884 4.484c-1.076-.091-2.264.071-2.95.904l-7.152 8.684a2.548 2.548 0 11-3.586-3.586l8.684-7.152c.833-.686.995-1.874.904-2.95a4.5 4.5 0 016.336-4.486l-3.276 3.276a3.004 3.004 0 002.25 2.25l3.276-3.276c.256.565.398 1.192.398 1.852z" />
              </svg>
            </div>

            <div class="flex items-center gap-4 mb-4 justify-center sm:justify-start">
              <svg class="hidden sm:block w-10 h-10 shrink-0" style="color: #EB6734" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <h3 class="font-display text-xl sm:text-2xl font-bold" style="color: #313131">
                {{ t.postcard.received }}
              </h3>
            </div>
            <p class="text-lg font-medium italic" style="color: #586569">
              „{{ t.postcard.hook }}“
            </p>
          </div>
        </div>

        <!-- Bridge text: short on mobile, full on desktop -->
        <p
          class="sm:hidden text-base font-medium leading-relaxed mb-6 px-2"
          style="color: #313131"
        >
          {{ t.postcard.mobileHighlight }}
        </p>
        <p
          class="hidden sm:block text-xl max-w-2xl mx-auto leading-relaxed mb-12 px-1"
          style="color: #313131"
          v-html="t.postcard.bridgeText"
        />

        <!-- Voucher Banner -->
        <div
          class="rounded-2xl p-5 sm:p-8 flex flex-col items-center sm:flex-row sm:justify-between gap-3 sm:gap-6 shadow-lg"
          style="background-color: #313131"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="text-center sm:text-left">
            <p class="font-display font-black text-4xl sm:text-2xl sm:font-bold mb-1" style="color: #EB6734">
              {{ t.footer.voucherAmount }}
            </p>
            <p class="hidden sm:inline font-display font-bold text-2xl" style="color: #EB6734">
              Reto-Fit-Gutschein
            </p>
            <p class="text-xs sm:text-sm mt-1" style="color: #c8baad">{{ t.footer.voucherExpiry }}</p>
          </div>
          <button
            type="button"
            class="btn-primary text-sm w-full sm:w-auto text-center group"
            @click="emit('openClaimModal')"
          >
            {{ t.footer.voucherCta }}
            <span class="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<style scoped>
/* Mobile: tall wrapper creates scroll-through dwell zone */
.postcard-dwell {
  background-color: #f0ece8;
}
@media (max-width: 639px) {
  .postcard-dwell {
    min-height: 150vh;
  }
}
</style>
