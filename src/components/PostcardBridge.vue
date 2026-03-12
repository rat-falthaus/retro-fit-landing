<script setup lang="ts">
import { t } from '@/i18n/de'
</script>

<template>
  <section class="py-10 sm:py-20" style="background-color: #f0ece8">
    <div class="section-container">
      <div
        class="max-w-4xl mx-auto text-center"
        data-aos="fade-up"
      >
        <!-- Postcard card -->
        <div class="inline-block mb-10 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
          <div class="bg-white p-5 sm:p-8 rounded-2xl shadow-2xl" style="border: 3px solid #EB6734">
            <div class="flex items-center gap-4 mb-4">
              <svg class="w-10 h-10" style="color: #EB6734" fill="currentColor" viewBox="0 0 20 20">
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

        <!-- Bridge text -->
        <p
          class="text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-12 px-1"
          style="color: #313131"
          v-html="t.postcard.bridgeText"
        />

        <!-- Voucher Banner -->
        <div
          class="rounded-2xl p-5 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 shadow-lg"
          style="background-color: #313131"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          <div class="text-center sm:text-left">
            <p class="font-display font-bold text-2xl mb-1" style="color: #EB6734">
              {{ t.footer.voucherAmount }} Reto-Fit-Gutschein
            </p>
            <p class="text-sm" style="color: #c8baad">{{ t.footer.voucherExpiry }}</p>
          </div>
          <a
            :href="t.footer.surveyUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="btn-primary text-sm w-full sm:w-auto text-center"
          >
            {{ t.footer.voucherCta }}
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
