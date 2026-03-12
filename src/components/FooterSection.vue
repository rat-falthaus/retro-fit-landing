<script setup lang="ts">
import { t } from '@/i18n/de'
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="py-6 sm:pt-16 sm:pb-8" style="background-color: #313131; color: #f0ece8">
    <div class="section-container">

      <!-- ========== MOBILE FOOTER (sm:hidden) ========== -->
      <div class="sm:hidden space-y-5">

        <!-- Brand row -->
        <div class="flex items-center justify-center gap-2">
          <div class="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm" style="background-color: #EB6734">RF</div>
          <span class="font-display text-lg font-bold text-white">{{ t.footer.brandName }}</span>
        </div>

        <!-- Contact pills -->
        <div class="flex justify-center gap-3">
          <a
            :href="`tel:${t.footer.contact.phone}`"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
            style="background-color: rgba(235,103,52,0.15); color: #EB6734"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/></svg>
            {{ t.footer.contact.phone }}
          </a>
          <a
            :href="`mailto:${t.footer.contact.email}`"
            class="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors"
            style="background-color: rgba(235,103,52,0.15); color: #EB6734"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/></svg>
            {{ t.footer.contact.email }}
          </a>
        </div>

        <!-- Address -->
        <p class="text-xs text-center" style="color: #586569">
          {{ t.footer.contact.street }} · {{ t.footer.contact.city }}
        </p>

        <!-- Legal links — horizontal -->
        <div class="flex flex-wrap justify-center gap-x-3 gap-y-1">
          <template v-for="(link, i) in t.footer.links.legal" :key="link.label">
            <a :href="link.href" class="text-xs py-1 transition-colors hover:text-white" style="color: #c8baad">
              {{ link.label }}
            </a>
            <span v-if="i < t.footer.links.legal.length - 1" class="text-xs" style="color: #586569">·</span>
          </template>
        </div>

        <!-- Disclaimer — collapsible -->
        <details class="text-center">
          <summary class="text-xs cursor-pointer select-none" style="color: #586569">
            {{ t.footer.disclaimerToggle }}
          </summary>
          <p class="text-xs leading-relaxed mt-2 px-2" style="color: #586569">{{ t.footer.disclaimer }}</p>
        </details>

        <!-- Copyright -->
        <p class="text-xs text-center" style="color: #586569">{{ t.footer.copyright(currentYear) }}</p>
      </div>

      <!-- ========== DESKTOP FOOTER (hidden sm:block) ========== -->
      <div class="hidden sm:block">

        <!-- Brand + Contact -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 mb-10 sm:mb-12">
          <!-- Brand -->
          <div class="md:col-span-1">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white text-lg" style="background-color: #EB6734">RF</div>
              <span class="font-display text-xl font-bold text-white">{{ t.footer.brandName }}</span>
            </div>
            <p class="text-sm leading-relaxed mb-6" style="color: #c8baad">{{ t.footer.description }}</p>
            <address class="not-italic text-sm space-y-1" style="color: #c8baad">
              <p class="font-semibold text-white">{{ t.footer.contact.company }}</p>
              <p>{{ t.footer.contact.street }}</p>
              <p>{{ t.footer.contact.city }}</p>
              <p>
                <a :href="`tel:${t.footer.contact.phone}`" class="block py-2 transition-colors hover:text-white" style="color: #EB6734">
                  Tel: {{ t.footer.contact.phone }}
                </a>
              </p>
              <p>
                <a :href="`mailto:${t.footer.contact.email}`" class="block py-2 transition-colors hover:text-white" style="color: #EB6734">
                  {{ t.footer.contact.email }}
                </a>
              </p>
            </address>
          </div>

          <!-- Legal links -->
          <div>
            <h3 class="font-display font-bold text-base mb-4 uppercase tracking-wider" style="color: #EB6734">{{ t.footer.sections.legal }}</h3>
            <ul class="space-y-2">
              <li v-for="link in t.footer.links.legal" :key="link.label">
                <a :href="link.href" class="block py-2 text-sm transition-colors hover:text-white" style="color: #c8baad">
                  {{ link.label }}
                </a>
              </li>
            </ul>
          </div>

          <!-- Certs -->
          <div>
            <h3 class="font-display font-bold text-base mb-4 uppercase tracking-wider" style="color: #EB6734">{{ t.footer.certifiedTitle }}</h3>
            <ul class="space-y-2">
              <li
                v-for="cert in t.footer.certifications"
                :key="cert"
                class="flex items-center gap-2 text-sm"
                style="color: #c8baad"
              >
                <span class="w-1.5 h-1.5 rounded-full inline-block shrink-0" style="background-color: #EB6734" />
                {{ cert }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Disclaimer -->
        <div class="border-t pt-6 mb-6" style="border-color: rgba(200,186,173,0.2)">
          <p class="text-xs sm:text-sm text-center leading-relaxed" style="color: #586569">{{ t.footer.disclaimer }}</p>
        </div>

        <!-- Bottom bar -->
        <div class="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-3" style="border-color: rgba(200,186,173,0.2)">
          <p class="text-xs sm:text-sm" style="color: #586569">{{ t.footer.copyright(currentYear) }}</p>
          <p class="text-xs sm:text-sm" style="color: #586569">{{ t.footer.madeWith }}</p>
        </div>

      </div>

    </div>
  </footer>
</template>
