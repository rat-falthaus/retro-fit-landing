<script setup lang="ts">
// Move the existing ImageConversionComponent to a proper location
// This component provides the before/after comparison

const oldMachineFeatures = [
  'Manual tracking',
  'Fuel waste',
  'Unpredictable downtime',
  '"Hope it doesn\'t break"'
]

const newMachineFeatures = [
  'GPS Precision',
  '15% Fuel Savings',
  'Predictive Maintenance',
  'Data-driven harvesting'
]
</script>

<template>
  <section id="success-stories" class="py-20 bg-white">
    <div class="section-container">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-display font-bold text-forest-green mb-4">
          The <span class="text-industrial-amber">Smart Transformation</span>
        </h2>
        <p class="text-xl text-tech-slate max-w-2xl mx-auto">
          See the difference between legacy and retrofitted equipment. Same machine, revolutionary performance.
        </p>
      </div>

      <!-- Comparison Grid -->
      <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <!-- Old Machine -->
        <div data-aos="fade-right">
          <div class="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 border-4 border-gray-300">
            <div class="mb-6">
              <span class="inline-block bg-gray-400 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                LEGACY MACHINE
              </span>
              <h3 class="text-3xl font-display font-bold text-gray-700 mb-2">
                1995 Technology
              </h3>
              <p class="text-gray-600">Still running, but showing its age...</p>
            </div>
            
            <div class="space-y-3">
              <div 
                v-for="feature in oldMachineFeatures" 
                :key="feature"
                class="flex items-start gap-3 bg-white/70 rounded-lg p-4"
              >
                <svg class="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
                <span class="text-gray-700 font-medium">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Arrow/VS -->
        <div class="hidden lg:block absolute left-1/2 transform -translate-x-1/2 z-10">
          <div class="bg-industrial-amber text-white w-20 h-20 rounded-full flex items-center justify-center shadow-2xl">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </div>

        <!-- New Machine -->
        <div data-aos="fade-left">
          <div class="bg-gradient-to-br from-forest-green to-green-700 rounded-2xl p-8 border-4 border-industrial-amber shadow-2xl">
            <div class="mb-6">
              <span class="inline-block bg-industrial-amber text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                SMART RETROFIT
              </span>
              <h3 class="text-3xl font-display font-bold text-white mb-2">
                2026 Intelligence
              </h3>
              <p class="text-white/90">Same iron, revolutionary brain.</p>
            </div>
            
            <div class="space-y-3">
              <div 
                v-for="feature in newMachineFeatures" 
                :key="feature"
                class="flex items-start gap-3 bg-white/20 backdrop-blur-sm rounded-lg p-4 border border-white/30"
              >
                <svg class="w-6 h-6 text-industrial-amber flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                <span class="text-white font-medium">{{ feature }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Stats -->
      <div class="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="200">
        <div class="text-center">
          <div class="text-4xl font-display font-bold text-industrial-amber mb-2">€150k+</div>
          <div class="text-tech-slate font-medium">Average Savings</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-display font-bold text-industrial-amber mb-2">15-20%</div>
          <div class="text-tech-slate font-medium">Fuel Reduction</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-display font-bold text-industrial-amber mb-2">2-3 Days</div>
          <div class="text-tech-slate font-medium">Installation Time</div>
        </div>
        <div class="text-center">
          <div class="text-4xl font-display font-bold text-industrial-amber mb-2">10+ Years</div>
          <div class="text-tech-slate font-medium">Extended Lifespan</div>
        </div>
      </div>
    </div>
  </section>
</template>
