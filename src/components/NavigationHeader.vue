<script setup lang="ts">
import { ref } from 'vue'

interface NavigationItem {
  label: string
  href: string
}

const navigationItems: NavigationItem[] = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Success Stories', href: '#success-stories' },
  { label: 'Claim Check', href: '#claim-check' }
]

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const scrollToSection = (href: string) => {
  const element = document.querySelector(href)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

if (typeof window !== 'undefined') {
  window.addEventListener('scroll', handleScroll)
}
</script>

<template>
  <header 
    :class="[
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      isScrolled ? 'bg-white shadow-lg py-3' : 'bg-white/90 backdrop-blur-sm py-4'
    ]"
  >
    <nav class="section-container">
      <div class="flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <div class="w-10 h-10 bg-forest-green rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-xl">SH</span>
          </div>
          <span class="font-display text-xl font-bold text-forest-green">
            SmartHarvest
          </span>
        </div>

        <!-- Navigation Links -->
        <ul class="hidden md:flex items-center space-x-8">
          <li v-for="item in navigationItems" :key="item.label">
            <a 
              :href="item.href"
              @click.prevent="scrollToSection(item.href)"
              class="text-tech-slate hover:text-forest-green font-medium transition-colors duration-200"
            >
              {{ item.label }}
            </a>
          </li>
        </ul>

        <!-- CTA Button -->
        <button 
          @click="scrollToSection('#claim-check')"
          class="btn-primary text-sm md:text-base px-4 md:px-8 py-2 md:py-3"
        >
          Claim Your €2,000 Check
        </button>
      </div>
    </nav>
  </header>
</template>
