<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useHead } from '@vueuse/head';
import { t } from '@/i18n/de';
import Toast from 'primevue/toast';
import HeroSection from './components/HeroSection.vue';
import PostcardBridge from './components/PostcardBridge.vue';
import ClaimCheckModal from './components/ClaimCheckModal.vue';
import InlineClaimSection from './components/InlineClaimSection.vue';
import FooterSection from './components/FooterSection.vue';
import NavigationHeader from './components/NavigationHeader.vue';

// SEO Meta Tags – all strings from src/i18n/de.ts
useHead({
  title: t.seo.title,
  htmlAttrs: { lang: 'de' },
  meta: [
    { name: 'description', content: t.seo.description },
    { name: 'keywords', content: t.seo.keywords },
    { name: 'author', content: 'Rex AutomatierungsTechnik GmbH' },
    { name: 'robots', content: 'index, follow' },
    { name: 'geo.region', content: 'DE-TH' },
    { name: 'geo.placename', content: 'Erfurt' },
    { property: 'og:title', content: t.seo.ogTitle },
    { property: 'og:description', content: t.seo.ogDescription },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: t.seo.canonical },
    { property: 'og:site_name', content: 'Rex AutomatierungsTechnik GmbH' },
    { property: 'og:locale', content: 'de_DE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t.seo.twitterTitle },
    { name: 'twitter:description', content: t.seo.twitterDescription },
  ],
  link: [{ rel: 'canonical', href: t.seo.canonical }],
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: 'Rex AutomatierungsTechnik GmbH',
        description: t.seo.description,
        url: 'https://www.rex-at.de',
        telephone: '+49-36208-666-0',
        email: 'info@rex-at.de',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Fichtenweg 26',
          addressLocality: 'Erfurt',
          addressRegion: 'Thüringen',
          postalCode: '99098',
          addressCountry: 'DE',
        },
        areaServed: {
          '@type': 'State',
          name: 'Thüringen',
        },
        offers: {
          '@type': 'Offer',
          name: 'Retrofit-Check Gutschein',
          price: '0',
          priceCurrency: 'EUR',
          description: 'Kostenloser Retrofit-Check im Wert von 2.000 €',
          validThrough: '2026-04-30',
        },
      }),
    },
  ],
});

const isModalVisible = ref(false);
const isMobile = ref(false);

const openClaimModal = () => {
  if (isMobile.value) {
    document.getElementById('inline-claim')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } else {
    isModalVisible.value = true;
  }
};

const updateMobile = () => {
  isMobile.value = window.innerWidth < 768;
};

onMounted(() => {
  // Smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  updateMobile();
  window.addEventListener('resize', updateMobile, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('resize', updateMobile);
});
</script>

<template>
  <div class="app">
    <NavigationHeader @open-claim-modal="openClaimModal" />
    <!-- Main Content -->
    <main>
      <!-- Hero Section (300vh sticky scroll reveal) -->
      <HeroSection @open-claim-modal="openClaimModal" />

      <!-- Postcard / Bridge section -->
      <PostcardBridge />

      <!-- Mobile inline form (md:hidden — desktop uses ClaimCheckModal Dialog) -->
      <InlineClaimSection />

      <!-- Footer -->
      <FooterSection />
    </main>

    <!-- Claim Check Modal -->
    <ClaimCheckModal
      v-model:visible="isModalVisible"
    />

    <!-- Global Toast -->
    <Toast position="top-center" />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #ffffff;
}
</style>
