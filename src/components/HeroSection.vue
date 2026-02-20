<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{
  (e: 'claim-check'): void
}>()

const backgroundImage = ref('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2070')

const handleClaimCheck = () => {
  emit('claim-check')
}
</script>

<template>
  <section class="relative h-screen flex items-center justify-center overflow-hidden">
    <!-- Background Image with Overlay -->
    <div class="absolute inset-0 z-0">
      <img 
        :src="backgroundImage" 
        alt="Modern Agriculture Machinery" 
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-forest-green/90 via-forest-green/75 to-transparent"></div>
    </div>

    <!-- Hero Content -->
    <div class="relative z-10 section-container">
      <div class="max-w-4xl">
        <!-- Main Headline -->
        <h1 
          class="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight"
          data-aos="fade-up"
        >
          Upgrade the Iron.<br />
          <span class="text-industrial-amber">Keep the Legacy.</span>
        </h1>

        <!-- Sub-headline -->
        <p 
          class="text-xl md:text-2xl text-white/95 mb-8 max-w-2xl leading-relaxed"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Don't spend €250k on a new machine when yours just needs a brain transplant. 
          Retro-fit your fleet to modern precision standards.
        </p>

        <!-- CTA Buttons -->
        <div 
          class="flex flex-col sm:flex-row gap-4"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <button 
            @click="handleClaimCheck"
            class="btn-primary text-lg"
          >
            Claim My €2,000 Tech Check
          </button>
          
          <a 
            href="#how-it-works"
            class="btn-secondary text-lg text-center"
          >
            Learn How It Works
          </a>
        </div>

        <!-- Trust Indicators -->
        <div 
          class="mt-12 flex flex-wrap gap-8 text-white/90"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-industrial-amber" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span class="font-semibold">ISO Stage V Compliant</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-industrial-amber" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-semibold">15% Fuel Savings</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-6 h-6 text-industrial-amber" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
            </svg>
            <span class="font-semibold">GPS Precision Ready</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll Indicator -->
    <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
      <div class="animate-bounce">
        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  </section>
</template>
