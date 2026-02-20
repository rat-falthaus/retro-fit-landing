<script setup lang="ts">
const features = [
  {
    title: '€2,000 Value',
    description: 'Comprehensive technical assessment of your entire fleet',
    icon: 'euro'
  },
  {
    title: 'Zero Obligation',
    description: 'No strings attached. Just expert insights into your upgrade potential.',
    icon: 'check'
  },
  {
    title: 'Expert Engineers',
    description: 'Our certified team has retrofitted over 1,200 machines across Europe',
    icon: 'users'
  },
  {
    title: 'Full Report',
    description: 'Detailed compatibility analysis, cost estimates, and ROI projections',
    icon: 'document'
  }
]

const benefits = [
  'Save €150k+ vs. buying new equipment',
  'Reduce fuel consumption by 15-20%',
  'Increase operational efficiency by 25%',
  'Extend machine lifespan by 10+ years',
  'Meet ISO Stage V emission standards',
  'Qualify for EU green farming subsidies'
]

const emit = defineEmits<{
  (e: 'claim-check'): void
}>()
</script>

<template>
  <section id="claim-check" class="py-20 bg-gradient-to-br from-forest-green to-forest-green/80 text-white relative overflow-hidden">
    <!-- Background Pattern -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute inset-0" style="background-image: repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.1) 35px, rgba(255,255,255,.1) 70px);"></div>
    </div>

    <div class="section-container relative z-10">
      <!-- Main Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <div class="inline-block bg-industrial-amber text-white px-6 py-2 rounded-full font-bold mb-6">
          LIMITED TIME OFFER
        </div>
        <h2 class="text-4xl md:text-6xl font-display font-bold mb-6">
          FREE Retro-fit Compatibility Check
        </h2>
        <p class="text-3xl md:text-4xl font-display text-industrial-amber mb-4">
          Worth €2,000 — Absolutely Free
        </p>
        <p class="text-xl text-white/90 max-w-3xl mx-auto">
          We'll visit your farm, audit your machinery, and provide a comprehensive retro-fit assessment. 
          No commitment required.
        </p>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
          class="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
        >
          <div class="w-12 h-12 bg-industrial-amber rounded-lg flex items-center justify-center mb-4">
            <svg v-if="feature.icon === 'euro'" class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14.121 15.536c-1.171 1.952-3.07 1.952-4.242 0-1.172-1.953-1.172-5.119 0-7.072 1.171-1.952 3.07-1.952 4.242 0M8 10.5h4m-4 3h4m9-1.5a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <svg v-else-if="feature.icon === 'check'" class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <svg v-else-if="feature.icon === 'users'" class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
            </svg>
            <svg v-else class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd" />
            </svg>
          </div>
          <h3 class="text-lg font-display font-bold mb-2">{{ feature.title }}</h3>
          <p class="text-white/90 text-sm">{{ feature.description }}</p>
        </div>
      </div>

      <!-- Benefits Two-Column -->
      <div class="max-w-4xl mx-auto mb-16" data-aos="fade-up">
        <h3 class="text-2xl font-display font-bold text-center mb-8 text-industrial-amber">
          What You'll Gain From Retro-fitting
        </h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="benefit in benefits"
            :key="benefit"
            class="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4"
          >
            <svg class="w-6 h-6 text-industrial-amber flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium">{{ benefit }}</span>
          </div>
        </div>
      </div>

      <!-- Main CTA -->
      <div class="text-center" data-aos="zoom-in" data-aos-delay="200">
        <button 
          @click="emit('claim-check')"
          class="bg-industrial-amber hover:bg-amber-600 text-white font-display font-bold text-2xl px-12 py-6 rounded-2xl shadow-2xl hover:shadow-industrial-amber/50 transform hover:scale-105 transition-all duration-300 inline-block"
        >
          Claim Your FREE €2,000 Check Now
        </button>
        <p class="mt-6 text-white/80 text-sm">
          🔒 No payment information required • 100% free assessment • Limited availability
        </p>
      </div>
    </div>
  </section>
</template>
