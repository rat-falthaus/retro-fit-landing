<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from '@vueuse/head'
import NavigationHeader from './components/NavigationHeader.vue'
import HeroSection from './components/HeroSection.vue'
import PostcardBridge from './components/PostcardBridge.vue'
import ComparisonSection from './components/ComparisonSection.vue'
import BentoGrid from './components/BentoGrid.vue'
import ProcessSection from './components/ProcessSection.vue'
import ValueProposition from './components/ValueProposition.vue'
import ClaimCheckModal from './components/ClaimCheckModal.vue'
import FooterSection from './components/FooterSection.vue'

// SEO Meta Tags for Static Site Generation
useHead({
  title: 'SmartHarvest - Upgrade the Iron. Keep the Legacy.',
  meta: [
    {
      name: 'description',
      content: "Don't spend €250k on a new machine when yours just needs a brain transplant. Retro-fit your fleet to modern precision standards. Get a FREE €2,000 compatibility check."
    },
    {
      name: 'keywords',
      content: 'agricultural equipment, retro-fit, precision farming, GPS farming, farm equipment upgrade, sustainable agriculture, ISO Stage V'
    },
    {
      property: 'og:title',
      content: 'SmartHarvest - Upgrade the Iron. Keep the Legacy.'
    },
    {
      property: 'og:description',
      content: "Transform your legacy agricultural equipment with modern precision technology. Save €150k+ vs buying new."
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: 'SmartHarvest - Retro-fit Your Farm Equipment'
    },
    {
      name: 'twitter:description',
      content: 'FREE €2,000 equipment compatibility check. Transform legacy machines with modern precision farming technology.'
    }
  ],
  link: [
    {
      rel: 'canonical',
      href: 'https://smartharvest.example.com'
    }
  ]
})

const isModalVisible = ref(false)

const openClaimModal = () => {
  isModalVisible.value = true
}

const handleFormSubmit = (formData: any) => {
  console.log('Form submitted:', formData)
  // Here you would typically send the data to your backend
  // For now, we'll just log it
}

onMounted(() => {
  // Smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth'
})
</script>

<template>
  <div class="app">
    <!-- Navigation -->
    <NavigationHeader />

    <!-- Main Content -->
    <main>
      <!-- Hero Section -->
      <HeroSection @claim-check="openClaimModal" />

      <!-- Postcard Bridge -->
      <PostcardBridge />

      <!-- Comparison Section -->
      <ComparisonSection />

      <!-- Bento Grid - What Can We Retrofit -->
      <BentoGrid />

      <!-- Process Section - How It Works -->
      <ProcessSection />

      <!-- Value Proposition - Free Check -->
      <ValueProposition @claim-check="openClaimModal" />

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
