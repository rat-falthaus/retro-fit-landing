<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useHead } from '@vueuse/head';
import { t } from '@/i18n/de';
import HeroSection from './components/HeroSection.vue';
import PostcardBridge from './components/PostcardBridge.vue';
import ClaimCheckModal from './components/ClaimCheckModal.vue';
import FooterSection from './components/FooterSection.vue';
import NavigationHeader from './components/NavigationHeader.vue';

// SEO Meta Tags – all strings from src/i18n/de.ts
useHead({
  title: t.seo.title,
  meta: [
    { name: 'description', content: t.seo.description },
    { name: 'keywords', content: t.seo.keywords },
    { property: 'og:title', content: t.seo.ogTitle },
    { property: 'og:description', content: t.seo.ogDescription },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: t.seo.twitterTitle },
    { name: 'twitter:description', content: t.seo.twitterDescription },
  ],
  link: [{ rel: 'canonical', href: t.seo.canonical }],
});

const isModalVisible = ref(false);

const openClaimModal = () => {
  isModalVisible.value = true;
};

const handleFormSubmit = (formData: unknown) => {
  // TODO: send formData to backend / email service
  console.info('Form submitted:', formData);
};

onMounted(() => {
  // Smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
});
</script>

<template>
  <div class="app">
    <NavigationHeader />
    <!-- Main Content -->
    <main>
      <!-- Hero Section (300vh sticky scroll reveal) -->
      <HeroSection @open-claim-modal="openClaimModal" />

      <!-- Postcard / Bridge section -->
      <PostcardBridge />

      <!-- Footer -->
      <FooterSection />
    </main>

    <!-- Claim Check Modal -->
    <ClaimCheckModal
      v-model:visible="isModalVisible"
      @submit="handleFormSubmit"
    />
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  background-color: #ffffff;
}
</style>
