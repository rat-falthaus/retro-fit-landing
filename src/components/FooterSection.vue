<script setup lang="ts">
import { t } from '@/i18n/de'
const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="pt-16 pb-8" style="background-color: #313131; color: #f0ece8">
    <div class="section-container">

      <!-- Brand + Contact -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
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
              <a :href="`tel:${t.footer.contact.phone}`" class="transition-colors hover:text-white" style="color: #EB6734">
                Tel: {{ t.footer.contact.phone }}
              </a>
            </p>
            <p>
              <a :href="`mailto:${t.footer.contact.email}`" class="transition-colors hover:text-white" style="color: #EB6734">
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
              <a :href="link.href" class="text-sm transition-colors hover:text-white" style="color: #c8baad">
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
              <span class="w-1.5 h-1.5 rounded-full inline-block flex-shrink-0" style="background-color: #EB6734" />
              {{ cert }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Disclaimer -->
      <div class="border-t pt-6 mb-6" style="border-color: rgba(200,186,173,0.2)">
        <p class="text-xs text-center leading-relaxed" style="color: #586569">{{ t.footer.disclaimer }}</p>
      </div>

      <!-- Bottom bar -->
      <div class="border-t pt-6 flex flex-col md:flex-row justify-between items-center gap-3" style="border-color: rgba(200,186,173,0.2)">
        <p class="text-xs" style="color: #586569">{{ t.footer.copyright(currentYear) }}</p>
        <p class="text-xs" style="color: #586569">{{ t.footer.madeWith }}</p>
      </div>

    </div>
  </footer>
</template>
