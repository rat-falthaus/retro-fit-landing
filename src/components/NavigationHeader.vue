<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { t } from '@/i18n/de'

const emit = defineEmits<{
  (e: 'openClaimModal'): void
}>()

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMenu = () => {
  isMobileMenuOpen.value = false
}

const openModal = () => {
  closeMenu()
  emit('openClaimModal')
}

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white/20 shadow-lg' : 'bg-white/10 backdrop-blur-sm',
    ]"
  >
    <!-- Main bar -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between py-2 sm:py-3">

      <!-- Logo -->
      <a
        :href="t.nav.homeUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="block h-10 w-36 sm:w-44 shrink-0"
        :aria-label="t.footer.contact.company"
        style="
          background-image: url(https://rex-at.de/files/theme_R/img/logo/Logo-breit.svg);
          background-repeat: no-repeat;
          background-position: left center;
          background-size: contain;
        "
      />

      <!-- Desktop CTA (hidden on mobile) -->
      <button
        class="hidden md:block btn-primary text-sm"
        @click="openModal"
      >
        {{ t.nav.retrofitCheck }}
      </button>

      <!-- Mobile hamburger (hidden on md+) -->
      <button
        class="md:hidden touch-target text-white focus:outline-none"
        :aria-label="isMobileMenuOpen ? t.nav.menuClose : t.nav.menuToggle"
        :aria-expanded="isMobileMenuOpen"
        @click="toggleMenu"
      >
        <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Mobile dropdown menu -->
    <nav
      v-if="isMobileMenuOpen"
      class="md:hidden border-t"
      :class="isScrolled ? 'bg-white/95 border-gray-200' : 'bg-rex-dark/95 border-white/10'"
      aria-label="Hauptnavigation"
    >
      <ul class="px-4 py-3 space-y-1">
        <li>
          <a
            :href="t.nav.homeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="block py-3 px-3 rounded-lg text-sm font-semibold transition-colors"
            :class="isScrolled ? 'text-rex-dark hover:bg-gray-100' : 'text-white hover:bg-white/10'"
            @click="closeMenu"
          >
            {{ t.nav.about }}
          </a>
        </li>
        <li>
          <a
            :href="`mailto:${t.footer.contact.email}`"
            class="block py-3 px-3 rounded-lg text-sm font-semibold transition-colors"
            :class="isScrolled ? 'text-rex-dark hover:bg-gray-100' : 'text-white hover:bg-white/10'"
            @click="closeMenu"
          >
            {{ t.nav.contact }}
          </a>
        </li>
        <li class="pt-2 pb-1">
          <button
            class="w-full btn-primary text-sm text-center"
            @click="openModal"
          >
            {{ t.nav.retrofitCheck }}
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>
