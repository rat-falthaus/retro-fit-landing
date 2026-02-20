<script setup lang="ts">
import type { MachineType } from '@/types'

const machines: MachineType[] = [
  {
    id: 'hay',
    name: 'Hay Balers & Presses',
    icon: '🌾',
    description: 'Transform your baler into a smart machine with yield tracking and density optimization.',
    retrofitCapabilities: [
      'Real-time bale counting',
      'Moisture sensors',
      'GPS field mapping',
      'Predictive maintenance alerts'
    ]
  },
  {
    id: 'harvest',
    name: 'Combine Harvesters',
    icon: '🚜',
    description: 'Upgrade to precision harvesting with yield mapping and automated header control.',
    retrofitCapabilities: [
      'Yield monitoring systems',
      'Auto-steer integration',
      'Grain loss detection',
      'Variable rate technology'
    ]
  },
  {
    id: 'soil',
    name: 'Tillage Equipment',
    icon: '⚙️',
    description: 'Add depth control and soil mapping to your existing tillage machinery.',
    retrofitCapabilities: [
      'Automatic depth control',
      'Soil compaction mapping',
      'Section control',
      'Fuel consumption tracking'
    ]
  },
  {
    id: 'spray',
    name: 'Sprayers & Spreaders',
    icon: '💧',
    description: 'Achieve precision application with variable rate control systems.',
    retrofitCapabilities: [
      'Variable rate application',
      'Boom height control',
      'Wind speed monitoring',
      'Application mapping'
    ]
  }
]
</script>

<template>
  <section id="how-it-works" class="py-20 bg-gradient-to-b from-white to-forest-green/5">
    <div class="section-container">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-display font-bold text-forest-green mb-4">
          What Can We Retro-fit?
        </h2>
        <p class="text-xl text-tech-slate max-w-2xl mx-auto">
          From balers to harvesters, we bring modern precision to your trusted equipment.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          v-for="(machine, index) in machines"
          :key="machine.id"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 100"
          class="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-industrial-amber"
        >
          <!-- Icon -->
          <div class="text-6xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
            {{ machine.icon }}
          </div>

          <!-- Title -->
          <h3 class="text-xl font-display font-bold text-forest-green mb-3">
            {{ machine.name }}
          </h3>

          <!-- Description -->
          <p class="text-tech-slate mb-4 text-sm leading-relaxed">
            {{ machine.description }}
          </p>

          <!-- Capabilities -->
          <ul class="space-y-2">
            <li 
              v-for="capability in machine.retrofitCapabilities" 
              :key="capability"
              class="flex items-start gap-2 text-sm text-tech-slate"
            >
              <svg class="w-5 h-5 text-industrial-amber flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
              <span>{{ capability }}</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="mt-12 text-center" data-aos="fade-up" data-aos-delay="400">
        <p class="text-lg text-tech-slate mb-4">
          <strong class="text-forest-green">90% of farm equipment</strong> built after 2005 can be retrofitted to Stage V standards.
        </p>
        <a href="#claim-check" class="btn-primary inline-block">
          Check My Equipment Compatibility
        </a>
      </div>
    </div>
  </section>
</template>
