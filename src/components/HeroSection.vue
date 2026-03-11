<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { t } from '@/i18n/de'

const emit = defineEmits<{ (e: 'openClaimModal'): void }>()

// Base URL for public/ assets — Vite replaces this at build time with the configured base
// (e.g. '/retro-fit-landing/' on GitHub Pages, '/' in dev)
const baseUrl: string = import.meta.env.BASE_URL

// ── Scroll-driven reveal ───────────────────────────────────────────────────
const sectionRef     = ref<HTMLElement | null>(null)
const scrollProgress = ref(0) // 0 → 1

const onScroll = () => {
  if (!sectionRef.value) return
  const scrolled   = -sectionRef.value.getBoundingClientRect().top
  const scrollable = sectionRef.value.offsetHeight - window.innerHeight
  scrollProgress.value = Math.max(0, Math.min(1, scrolled / scrollable))
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// 0 % at top → 100 % at bottom of the tall section
const sliderPosition = computed(() => scrollProgress.value * 100)

// Text overlay: fully visible at top, fades out over first 20 % of scroll
const textOpacity = computed(() =>
  Math.max(0, 1 - scrollProgress.value / 0.2)
)

// ── "RETO FITTED" stamp ───────────────────────────────────────────────────
// Fades + scales in from scrollProgress 0.80 → 0.95
const stampProgress = computed(() =>
  Math.max(0, Math.min(1, (scrollProgress.value - 0.80) / 0.15))
)

// ── Video layer ──────────────────────────────────────────────────────────
const beforeVideoRef = ref<HTMLVideoElement | null>(null)
const afterVideoRef  = ref<HTMLVideoElement | null>(null)
const videosReady    = ref(false) // true once any video fires canplay

// FOR VIDEO SET TO TRUE IN NEXT LINE TO SHOW VIDEO INSTEAD OF IMAGE BACKGROUND
// videosReady.value = true
const onVideoCanPlay = () => { videosReady.value = true }

// Control playback: loop while scrolling, pause + seek-to-last-frame at end
watch(scrollProgress, (val) => {
  const before = beforeVideoRef.value
  const after  = afterVideoRef.value

  if (val >= 0.99) {
    if (after) {
      after.pause()
      // Seek to very last frame so the finished state is visible
      if (isFinite(after.duration) && after.duration > 0) {
        after.currentTime = after.duration - 0.001
      }
    }
    if (before) before.pause()
  } else {
    // Resume looping while user is scrolling
    if (before && before.paused) before.play().catch(() => {})
    if (after  && after.paused)  after.play().catch(() => {})
  }
})

// Scroll past the entire hero section to the content below
const scrollToContent = () => {
  if (!sectionRef.value) return
  window.scrollTo({
    top: sectionRef.value.offsetTop + sectionRef.value.offsetHeight,
    behavior: 'smooth',
  })
}
</script>

<template>
  <!-- 150 vh tall so scroll drives the reveal. The inner viewport is sticky. -->
  <section ref="sectionRef" class="relative select-none" style="height: 150vh">

    <!-- ── Sticky viewport: stays in view while scrolling through 300vh ── -->
    <div class="sticky top-0 h-screen overflow-hidden">

      <!-- ── IMAGE FALLBACK (visible until video canplay fires) ─────────── -->
      <div
        class="absolute inset-0 transition-opacity duration-700"
        :class="videosReady ? 'opacity-0' : 'opacity-100'"
        :style="{
          backgroundImage: `url('${baseUrl}images/machine-before.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }"
        role="img"
        :aria-label="t.hero.imageAltBefore"
      />
      <div
        class="absolute inset-0 transition-opacity duration-700"
        :class="videosReady ? 'opacity-0' : 'opacity-100'"
        :style="{
          backgroundImage: `url('${baseUrl}images/machine-after.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }"
        role="img"
        :aria-label="t.hero.imageAltAfter"
      />

      <!-- ── VIDEO LAYER ────────────────────────────────────────────────── -->
      <!-- BEFORE video: loops in the background while scrolling -->
      <video
        ref="beforeVideoRef"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        :class="videosReady ? 'opacity-100' : 'opacity-0'"
        :src="`${baseUrl}images/Video_Generation_With_Natural_Animations.mp4`"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        :aria-label="t.hero.imageAltBefore"
        @canplay="onVideoCanPlay"
      />

      <!-- AFTER video: clip-path reveals left→right; paused at last frame at scroll end -->
      <video
        ref="afterVideoRef"
        class="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
        :class="videosReady ? 'opacity-100' : 'opacity-0'"
        :src="`${baseUrl}images/Video_Edit_Remove_Animals_Update_Machine.mp4`"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        :aria-label="t.hero.imageAltAfter"
        :style="{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }"
      />

      <!-- Subtle divider: 1 px, low opacity, no shadow -->
      <div
        class="absolute top-0 bottom-0 w-px bg-white/30 pointer-events-none z-20"
        :style="{ left: `${sliderPosition}%` }"
      />

      <!-- Minimal handle near the bottom of the viewport -->
      <div
        class="absolute z-30 pointer-events-none -translate-x-1/2"
        :style="{ left: `${sliderPosition}%`, bottom: '18%' }"
      >
        <!-- Two small chevron arrows in a pill shape -->
        <div class="flex items-center gap-1 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full px-2 py-1">
          <svg class="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
          <div class="w-px h-3 bg-white/40" />
          <svg class="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          </svg>
        </div>
      </div>

      <!-- Corner labels — fade in after scroll starts -->
      <span
        class="absolute z-20 bg-black/40 text-white/80 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none transition-opacity duration-500"
        style="bottom: 18%; left: 1.5rem"
        :style="{ opacity: scrollProgress > 0.02 ? 1 : 0 }"
      >
        {{ t.hero.sliderBefore }}
      </span>
      <span
        class="absolute z-20 bg-black/40 text-white/80 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none transition-opacity duration-500"
        style="bottom: 18%; right: 1.5rem"
        :style="{ opacity: scrollProgress > 0.02 ? 1 : 0 }"
      >
        {{ t.hero.sliderAfter }}
      </span>

      <!-- Gradient overlay – Rex-AT dark charcoal from left, transparent right -->
      <div
        class="absolute inset-0 z-10 pointer-events-none"
        style="background: linear-gradient(to right, rgba(49,49,49,0.88) 0%, rgba(49,49,49,0.65) 35%, rgba(49,49,49,0.15) 65%, rgba(49,49,49,0) 100%)"
      />

      <!-- Text content — fades out as user scrolls into the reveal zone -->
      <div
        class="absolute inset-0 z-20 flex items-center pointer-events-none transition-opacity duration-200"
        :style="{ opacity: textOpacity }"
      >
        <div class="section-container w-full">
          <div class="max-w-2xl">

            <h1
              class="text-5xl md:text-6xl xl:text-7xl font-display font-bold text-white mb-6 leading-tight"
              data-aos="fade-up"
            >
              {{ t.hero.headline }}<br />
              <span class="text-industrial-amber">{{ t.hero.headlineAccent }}</span>
            </h1>

            <p
              class="text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {{ t.hero.subheadline }}
            </p>

            <!-- CTAs -->
            <div
              class="flex flex-col sm:flex-row gap-4 pointer-events-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <button
                @click="emit('openClaimModal')"
                class="btn-primary text-base text-center"
              >
                {{ t.hero.ctaPrimary }}
              </button>
              <a
                :href="t.hero.referenceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-secondary text-base text-center"
              >
                {{ t.hero.ctaSecondary }}
              </a>
            </div>

            <!-- Trust badges -->
            <ul
              class="mt-10 flex flex-col sm:flex-row flex-wrap gap-4 text-white/85"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <li
                v-for="item in t.hero.trustItems"
                :key="item"
                class="flex items-center gap-2 text-sm font-medium"
              >
                <svg class="w-5 h-5 shrink-0 text-industrial-amber" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
                {{ item }}
              </li>
            </ul>

          </div>
        </div>
      </div>

      <!-- ── "RETO FITTED" stamp (fades in near end of scroll) ─────────── -->
      <div
        class="absolute inset-0 z-30 flex items-center justify-center pointer-events-none"
        :style="{
          opacity: stampProgress,
          transform: `scale(${0.65 + 0.35 * stampProgress}) rotate(-5deg)`,
        }"
      >
        <div
          class="relative px-10 py-5 rounded-sm"
          style="
            border: 5px solid #EB6734;
            box-shadow: 0 0 0 2px rgba(235,103,52,0.20), inset 0 0 40px rgba(235,103,52,0.07);
          "
        >
          <!-- Radial vignette for stamp texture -->
          <div
            class="absolute inset-0 rounded-sm pointer-events-none"
            style="background: radial-gradient(ellipse at center, transparent 40%, rgba(235,103,52,0.06) 100%)"
          />
          <span
            class="font-display font-black tracking-[0.25em] uppercase relative"
            style="
              font-size: clamp(2.5rem, 8vw, 6rem);
              color: #EB6734;
              text-shadow: 0 0 30px rgba(235,103,52,0.35);
            "
          >
            {{ t.hero.stampLabel }}
          </span>
        </div>
      </div>

      <!-- Scroll cue arrow (top screen, fades once scroll starts) -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-500"
        :style="{ opacity: scrollProgress < 0.03 ? 0.6 : 0 }"
      >
        <div class="animate-bounce">
          <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

    </div>
    <slot></slot>
  </section>
</template>
