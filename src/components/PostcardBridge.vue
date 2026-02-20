<script setup lang="ts">
const postcardHooks = [
  "Your hay baler called. It's feeling a bit... 1995.",
  "Is your tractor smarter than a fifth grader? Let's fix that.",
  "Teach an old dog new tricks. Teach an old harvester new tech."
]
</script>

<template>
  <section class="py-16 bg-industrial-amber/10">
    <div class="section-container">
      <div 
        class="max-w-4xl mx-auto text-center"
        data-aos="fade-up"
      >
        <!-- Postcard Visual -->
        <div class="inline-block mb-8 transform -rotate-2 hover:rotate-0 transition-transform duration-300">
          <div class="bg-white p-8 rounded-2xl shadow-2xl border-4 border-industrial-amber">
            <div class="flex items-center gap-4 mb-4">
              <svg class="w-12 h-12 text-industrial-amber" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <h3 class="font-display text-2xl font-bold text-forest-green">
                You received our postcard!
              </h3>
            </div>
            
            <p class="text-lg text-tech-slate font-medium italic">
              "{{ postcardHooks[0] }}"
            </p>
          </div>
        </div>

        <!-- Bridge Text -->
        <p class="text-xl text-tech-slate max-w-2xl mx-auto leading-relaxed">
          We weren't joking. Your equipment is <strong class="text-forest-green">battle-tested and reliable</strong>—it just needs 
          a <strong class="text-industrial-amber">modern brain</strong> to unlock precision farming, fuel savings, and predictive maintenance.
        </p>
      </div>
    </div>
  </section>
</template>
