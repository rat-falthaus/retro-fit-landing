<script setup lang="ts">
import type { ProcessStep } from '@/types'
import { QrCode, Users, Wrench } from 'lucide-vue-next'

const steps: ProcessStep[] = [
  {
    step: 1,
    title: 'Scan QR Code',
    description: 'Use your smartphone to scan the QR code from your postcard or this page to start your free compatibility check.',
    icon: 'qr'
  },
  {
    step: 2,
    title: 'Site Visit & Audit',
    description: 'Our technical team visits your farm to inspect your equipment and provide a comprehensive retro-fit assessment report.',
    icon: 'users'
  },
  {
    step: 3,
    title: 'Professional Upgrade',
    description: 'We install cutting-edge sensors, GPS systems, and control units—transforming your machines without replacing them.',
    icon: 'wrench'
  }
]
</script>

<template>
  <section class="py-20 bg-tech-slate text-white">
    <div class="section-container">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-up">
        <h2 class="text-4xl md:text-5xl font-display font-bold mb-4">
          Three Simple Steps to <span class="text-industrial-amber">Smarter Farming</span>
        </h2>
        <p class="text-xl text-white/90 max-w-2xl mx-auto">
          From first contact to fully upgraded fleet in weeks, not months.
        </p>
      </div>

      <!-- Process Steps -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div
          v-for="(step, index) in steps"
          :key="step.step"
          :data-aos="'fade-up'"
          :data-aos-delay="index * 150"
          class="relative"
        >
          <!-- Connector Line (hidden on mobile, shown on md+) -->
          <div 
            v-if="index < steps.length - 1"
            class="hidden md:block absolute top-16 left-1/2 w-full h-1 bg-industrial-amber/30"
            style="transform: translateX(50%)"
          >
            <div class="absolute right-0 top-1/2 transform -translate-y-1/2">
              <svg class="w-6 h-6 text-industrial-amber" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </div>
          </div>

          <!-- Step Card -->
          <div class="relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 border border-white/20">
            <!-- Step Number -->
            <div class="absolute -top-6 left-8 w-12 h-12 bg-industrial-amber rounded-full flex items-center justify-center shadow-lg">
              <span class="text-2xl font-display font-bold text-white">{{ step.step }}</span>
            </div>

            <!-- Icon -->
            <div class="mt-6 mb-6 flex justify-center">
              <component 
                :is="step.icon === 'qr' ? QrCode : step.icon === 'users' ? Users : Wrench"
                :size="64"
                class="text-industrial-amber"
                :stroke-width="1.5"
              />
            </div>

            <!-- Content -->
            <h3 class="text-2xl font-display font-bold mb-4 text-center">
              {{ step.title }}
            </h3>
            <p class="text-white/90 leading-relaxed text-center">
              {{ step.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- Bottom Feature -->
      <div class="mt-16 text-center" data-aos="fade-up" data-aos-delay="450">
        <div class="inline-block bg-industrial-amber/20 border-2 border-industrial-amber rounded-2xl px-8 py-6">
          <p class="text-2xl font-display font-bold text-industrial-amber mb-2">
            Average Installation Time: 2-3 Days
          </p>
          <p class="text-white/90">
            Minimal downtime. Maximum upgrade.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
