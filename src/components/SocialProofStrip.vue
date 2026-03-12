<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { t } from '@/i18n/de'

interface StatItem {
  value: string
  numericTarget: number
  suffix: string
  label: string
}

const stats: StatItem[] = [
  { value: t.stats.yearsValue, numericTarget: 35, suffix: '+', label: t.stats.yearsLabel },
  { value: t.stats.projectsValue, numericTarget: 500, suffix: '+', label: t.stats.projectsLabel },
  { value: t.stats.savingsValue, numericTarget: 40, suffix: '%', label: t.stats.savingsLabel },
  { value: t.stats.uptimeValue, numericTarget: 99.2, suffix: '%', label: t.stats.uptimeLabel },
]

const displayed = ref<string[]>(stats.map(() => '0'))
const hasAnimated = ref(false)
const stripRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4)

const animateCounters = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true
  const duration = 1500
  const start = performance.now()

  const tick = (now: number) => {
    const elapsed = Math.min((now - start) / duration, 1)
    const eased = easeOutQuart(elapsed)

    displayed.value = stats.map((s) => {
      const current = eased * s.numericTarget
      const formatted = s.numericTarget % 1 !== 0
        ? current.toFixed(1).replace('.', ',')
        : Math.round(current).toString()
      return formatted + s.suffix
    })

    if (elapsed < 1) requestAnimationFrame(tick)
  }

  requestAnimationFrame(tick)
}

onMounted(() => {
  if (!stripRef.value) return
  observer = new IntersectionObserver(
    ([entry]) => { if (entry.isIntersecting) animateCounters() },
    { threshold: 0.3 }
  )
  observer.observe(stripRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<template>
  <section
    ref="stripRef"
    class="md:hidden py-6 overflow-hidden"
    style="background-color: #313131"
    data-aos="fade-up"
  >
    <div class="flex overflow-x-auto snap-x snap-mandatory gap-3 px-4 scrollbar-hide">
      <div
        v-for="(stat, i) in stats"
        :key="i"
        class="snap-center shrink-0 min-w-[130px] bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
      >
        <span class="block text-3xl font-display font-black text-rex-orange">
          {{ displayed[i] }}
        </span>
        <span class="block text-[11px] text-white/70 font-medium uppercase tracking-wider mt-1">
          {{ stat.label }}
        </span>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
</style>
