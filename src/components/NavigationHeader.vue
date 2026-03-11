<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { t } from '@/i18n/de'

const isScrolled = ref(false);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => window.addEventListener('scroll', handleScroll, { passive: true }));
onUnmounted(() => window.removeEventListener('scroll', handleScroll));
</script>

<template>
  <header
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled
        ? 'bg-white/20 shadow-lg py-3'
        : 'bg-white/10 backdrop-blur-sm py-4',
    ]"
  >
    <nav class="h-10 w-lg">
        <!-- Logo -->
        <a
          :href="t.nav.homeUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="block h-full w-full"
          :aria-label="t.footer.contact.company"
          style="
            background-image: url(https://rex-at.de/files/theme_R/img/logo/Logo-breit.svg);
            background-repeat: no-repeat;
            background-position: center;
            background-size: contain;
          "
        />
      
    </nav>
  </header>
</template>
