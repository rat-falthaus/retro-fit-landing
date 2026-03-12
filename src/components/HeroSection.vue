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

  // First manual scroll triggers a cinematic glide to the full retrofit frame.
  if (
    scrollProgress.value > 0.015 &&
    scrollProgress.value < 0.98 &&
    !ctaFlowInFlight.value &&
    !revealFlowInFlight.value &&
    !manualRevealTriggered.value
  ) {
    manualRevealTriggered.value = true
    void runRevealOnlyFlow()
  }
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// 0 % at top → 100 % at bottom of the tall section
const sliderPosition = computed(() => scrollProgress.value * 100)

// SSR-safe mobile detection
const isMobileHero = ref(false)
onMounted(() => {
  isMobileHero.value = window.innerWidth < 640
})

// Text: fades faster on mobile (10%) vs desktop (20%)
const textOpacity = computed(() => {
  const rate = isMobileHero.value ? 0.10 : 0.20
  return Math.max(0, 1 - scrollProgress.value / rate)
})

// Mobile radial clip reveal (circle expanding from center)
const mobileRevealRadius = computed(() =>
  Math.min(150, scrollProgress.value * 150)
)

// ── "RETO FITTED" stamp ───────────────────────────────────────────────────
// Fades + scales in from scrollProgress 0.80 → 0.95
const stampProgress = computed(() =>
  Math.max(0, Math.min(1, (scrollProgress.value - 0.80) / 0.15))
)
// Stamp blur (sharp at full progress)
const stampBlur = computed(() =>
  Math.max(0, (1 - stampProgress.value) * 6)
)
// One-shot stamp pulse
const stampPulsed = ref(false)
watch(stampProgress, (v) => {
  if (v >= 1 && !stampPulsed.value) stampPulsed.value = true
})

// ── Intro video crossfade: brokenPopcornMachine fades into static JPG ──
const introVideoRef = ref<HTMLVideoElement | null>(null)

// Opacity: fully visible until 5 % scroll, fully gone by 20 %
const videoIntroOpacity = computed(() => {
  if (scrollProgress.value <= 0.5) return 1
  if (scrollProgress.value >= 0.9) return 0
  return 1 - (scrollProgress.value - 0.5) / 0.4
})

// Gradual blur adds a dreamy crossfade feel (0 → 8 px)
const videoIntroBlur = computed(() => {
  if (scrollProgress.value <= 0.5) return 0
  if (scrollProgress.value >= 0.9) return 8
  return ((scrollProgress.value - 0.5) / 0.4) * 8
})

// Pause video once fully faded to save resources
watch(videoIntroOpacity, (opacity) => {
  const video = introVideoRef.value
  if (!video) return
  if (opacity <= 0 && !video.paused) video.pause()
  else if (opacity > 0 && video.paused) video.play().catch(() => {})
})

// CTA/scroll choreography state
const ctaFlowInFlight = ref(false)
const revealFlowInFlight = ref(false)
const manualRevealTriggered = ref(false)
const userInterrupted = ref(false)

// Attach listeners for user-initiated scroll gestures; returns a cleanup fn.
// touchmove = mobile swipe, wheel = desktop scroll — both are unambiguously human.
const startInterruptListening = (): (() => void) => {
  userInterrupted.value = false
  const handler = () => { userInterrupted.value = true }
  window.addEventListener('touchmove', handler, { passive: true })
  window.addEventListener('wheel', handler, { passive: true })
  return () => {
    window.removeEventListener('touchmove', handler)
    window.removeEventListener('wheel', handler)
  }
}

// Sleep that resolves at `ms` OR as soon as the user scrolls — whichever first.
const sleepOrInterrupt = (ms: number): Promise<void> =>
  new Promise((resolve) => {
    const end = performance.now() + ms
    const tick = () => {
      if (userInterrupted.value || performance.now() >= end) resolve()
      else requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  })

const getRevealTop = (): number => {
  if (!sectionRef.value) return window.scrollY
  const rawTarget = sectionRef.value.offsetTop + sectionRef.value.offsetHeight - window.innerHeight
  const maxScrollable = document.documentElement.scrollHeight - window.innerHeight
  return Math.max(0, Math.min(rawTarget, maxScrollable))
}

const getContentTop = (): number => {
  if (!sectionRef.value) return window.scrollY
  const rawTarget = sectionRef.value.offsetTop + sectionRef.value.offsetHeight
  const maxScrollable = document.documentElement.scrollHeight - window.innerHeight
  return Math.max(0, Math.min(rawTarget, maxScrollable))
}

const scrollToTarget = (targetTop: number, maxWaitMs = 2400): Promise<void> =>
  new Promise((resolve) => {
    window.scrollTo({ top: targetTop, behavior: 'smooth' })

    const startedAt = performance.now()

    const check = () => {
      const closeEnough = Math.abs(window.scrollY - targetTop) < 24
      const timedOut = performance.now() - startedAt >= maxWaitMs
      if (closeEnough || timedOut || userInterrupted.value) {
        resolve()
        return
      }
      requestAnimationFrame(check)
    }

    requestAnimationFrame(check)
  })

const runRevealOnlyFlow = async () => {
  if (revealFlowInFlight.value || ctaFlowInFlight.value) return
  revealFlowInFlight.value = true
  await scrollToTarget(getRevealTop())
  revealFlowInFlight.value = false
}

const handleCtaClick = () => {
  if (ctaFlowInFlight.value) return

  void (async () => {
    ctaFlowInFlight.value = true
    manualRevealTriggered.value = true
    const stopListening = startInterruptListening()

    try {
      // Step 1: Cinematic reveal of the retrofitted machine.
      await scrollToTarget(getRevealTop())
      if (userInterrupted.value) return
      await sleepOrInterrupt(700)
      if (userInterrupted.value) return

      // Step 2: Glide down to the postcard bridge section.
      await scrollToTarget(getContentTop())
      if (userInterrupted.value) return

      // Step 3: Dwell on the postcard so mobile users can read it (~3.5 s).
      // Desktop skips — the modal opens immediately after scroll lands.
      if (isMobileHero.value) {
        await sleepOrInterrupt(3400)
        if (userInterrupted.value) return
      }

      // Step 4: Open the claim form.
      emit('openClaimModal')
    } finally {
      stopListening()
      ctaFlowInFlight.value = false
    }
  })()
}
</script>

<template>
  <!-- 150 vh tall so scroll drives the reveal. The inner viewport is sticky. -->
  <section ref="sectionRef" class="relative select-none" style="height: 150vh">

    <!-- ── Sticky viewport: stays in view while scrolling through 300vh ── -->
    <div class="sticky top-0 hero-viewport overflow-hidden">

      <!-- ── STATIC BEFORE / AFTER IMAGES (always visible, slider-driven) ── -->
      <div
        class="absolute inset-0 z-0 bg-cover sm:bg-right"
        :style="{ backgroundImage: `url('${baseUrl}images/machine-before.jpg')`, backgroundPosition: isMobileHero ? '80% center' : undefined }"
        role="img"
        :aria-label="t.hero.imageAltBefore"
      />
      <div
        class="absolute inset-0 z-20 bg-cover sm:bg-right will-change-[clip-path]"
        :style="{
          backgroundImage: `url('${baseUrl}images/machine-after.jpg')`,
          backgroundPosition: isMobileHero ? '80% center' : undefined,
          clipPath: isMobileHero
            ? `circle(${mobileRevealRadius}% at 50% 50%)`
            : `inset(0 ${100 - sliderPosition}% 0 0)`,
        }"
        role="img"
        :aria-label="t.hero.imageAltAfter"
      />

      <!-- ── INTRO VIDEO: plays on load, crossfades to static JPG on scroll ── -->
      <video
        ref="introVideoRef"
        class="absolute inset-0 z-10 w-full h-full object-cover sm:object-right will-change-[opacity,filter]"
        :style="{
          opacity: videoIntroOpacity,
          filter: `blur(${videoIntroBlur}px)`,
          transition: 'opacity 0.8s ease, filter 0.8s ease',
          objectPosition: isMobileHero ? '80% center' : undefined,
        }"
        :src="`${baseUrl}images/popcorn-machine.mp4`"
        autoplay
        loop
        muted
        playsinline
        preload="auto"
        :aria-label="t.hero.imageAltBefore"
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
        class="hidden sm:block absolute z-20 bg-black/40 text-white/80 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none transition-opacity duration-500"
        style="bottom: 18%; left: 1.5rem"
        :style="{ opacity: scrollProgress > 0.02 ? 1 : 0 }"
      >
        {{ t.hero.sliderBefore }}
      </span>
      <span
        class="hidden sm:block absolute z-20 bg-black/40 text-white/80 text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm pointer-events-none transition-opacity duration-500"
        style="bottom: 18%; right: 1.5rem"
        :style="{ opacity: scrollProgress > 0.02 ? 1 : 0 }"
      >
        {{ t.hero.sliderAfter }}
      </span><

      <!-- Gradient overlay – Rex-AT dark charcoal from left, transparent right -->
      <div
        class="absolute inset-0 z-10 pointer-events-none hero-gradient-overlay"
      />

      <!-- Text content — fades out as user scrolls into the reveal zone -->
      <div
        class="absolute inset-0 z-20 flex items-end sm:items-center pointer-events-none transition-opacity duration-200"
        :style="{ opacity: textOpacity }"
      >
        <div class="section-container w-full pb-24 sm:pb-0">
          <div class="max-w-2xl">

            <!-- Mobile headline — short, bottom-anchored -->
            <h1
              class="sm:hidden text-4xl font-display font-bold text-white mb-3 leading-tight"
              data-aos="fade-up"
            >
              {{ t.hero.mobileHeadline }}<br />
              <span class="text-industrial-amber">{{ t.hero.mobileHeadlineAccent }}</span>
            </h1>
            <p
              class="sm:hidden text-sm text-white/70 mb-5"
              data-aos="fade-up"
              data-aos-delay="50"
            >
              {{ t.hero.mobileSubline }}
            </p>

            <!-- Desktop headline — full -->
            <h1
              class="hidden sm:block mt-8 text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 leading-tight"
              data-aos="fade-up"
            >
              {{ t.hero.headline }}<br />
              <span class="text-industrial-amber">{{ t.hero.headlineAccent }}</span>
            </h1>

            <p
              class="hidden sm:block text-lg md:text-xl text-white/90 mb-8 max-w-xl leading-relaxed"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              {{ t.hero.subheadline }}
            </p>

            <!-- CTAs -->
            <div
              class="flex flex-col sm:flex-row gap-3 sm:gap-4 pointer-events-auto"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <button
                @click="handleCtaClick"
                class="btn-primary text-sm sm:text-base py-3 sm:py-4 text-center"
              >
                {{ t.hero.ctaPrimary }}
              </button>
              <a
                :href="t.hero.referenceUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-primary text-sm sm:text-base py-3 sm:py-4 text-center"
              >
                {{ t.hero.ctaSecondary }}
              </a>
            </div>

            <!-- Trust badges — desktop only -->
            <ul
              class="hidden sm:flex mt-10 flex-row flex-wrap gap-4 text-white/85"
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
        :class="{ 'stamp-pulse': stampPulsed }"
        :style="{
          opacity: stampProgress,
          transform: `scale(${0.65 + 0.35 * stampProgress}) rotate(-5deg)`,
          filter: `blur(${stampBlur}px)`,
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

      <!-- Scroll cue — desktop: arrow only, mobile: arrow + text label -->
      <div
        class="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none transition-opacity duration-500 flex flex-col items-center gap-1"
        :style="{ opacity: scrollProgress < 0.03 ? 0.7 : 0 }"
      >
        <span class="sm:hidden text-[11px] text-white/60 font-medium tracking-wide uppercase">{{ t.hero.scrollHint }}</span>
        <div class="animate-bounce">
          <svg class="w-5 h-5 sm:w-6 sm:h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

    </div>
    <slot></slot>
  </section>
</template>

<style scoped>
/* Desktop: left-to-right gradient (text on left, machine revealed on right) */
.hero-gradient-overlay {
  background: linear-gradient(
    to right,
    rgba(49,49,49,0.88) 0%,
    rgba(49,49,49,0.65) 35%,
    rgba(49,49,49,0.15) 65%,
    rgba(49,49,49,0) 100%
  );
}

/* Mobile: bottom-to-top gradient — headline lives at bottom, machine fills top */
@media (max-width: 639px) {
  .hero-gradient-overlay {
    background: linear-gradient(
      to top,
      rgba(49,49,49,0.92) 0%,
      rgba(49,49,49,0.55) 35%,
      rgba(49,49,49,0.0) 60%
    );
  }
}

/* Stamp pulse: one-shot scale bump when fully revealed */
.stamp-pulse {
  animation: stamp-hit 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards;
}
@keyframes stamp-hit {
  0%   { transform: scale(1) rotate(-5deg); }
  50%  { transform: scale(1.06) rotate(-5deg); }
  100% { transform: scale(1) rotate(-5deg); }
}
</style>
