<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';

// Using runtime declaration for props to ensure maximum compatibility with build tools
const props = defineProps({
  oldImage: {
    type: String,
    required: true
  },
  newImage: {
    type: String,
    required: true
  },
  oldLabel: {
    type: String,
    default: 'Legacy Machine'
  },
  newLabel: {
    type: String,
    default: 'Smart Retrofit'
  }
});

const sliderPos = ref(50);
const isResizing = ref(false);
const container = ref<HTMLElement | null>(null);

// Handle the movement logic for both mouse and touch
const handleMove = (e: MouseEvent | TouchEvent) => {
  if (!isResizing.value || !container.value) return;

  const rect = container.value.getBoundingClientRect();
  const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
  const relativeX = x - rect.left;
  const percentage = Math.max(0, Math.min(100, (relativeX / rect.width) * 100));
  
  sliderPos.value = percentage;
};

const startResizing = () => {
  isResizing.value = true;
};

const stopResizing = () => {
  isResizing.value = false;
};

// Computed style for the clip-path to handle reactivity smoothly
const clipStyle = computed(() => {
  return { clipPath: `inset(0 ${100 - sliderPos.value}% 0 0)` };
});

onMounted(() => {
  window.addEventListener('mousemove', handleMove);
  window.addEventListener('touchmove', handleMove);
  window.addEventListener('mouseup', stopResizing);
  window.addEventListener('touchend', stopResizing);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMove);
  window.removeEventListener('touchmove', handleMove);
  window.removeEventListener('mouseup', stopResizing);
  window.removeEventListener('touchend', stopResizing);
});
</script>

<template>
  <div 
    ref="container"
    class="relative w-full aspect-[16/9] overflow-hidden rounded-2xl border-4 border-slate-800 shadow-2xl cursor-col-resize select-none"
    @mousedown.prevent="startResizing"
    @touchstart.prevent="startResizing"
  >
    <!-- New Image (Background / The Result) -->
    <img 
      :src="newImage" 
      class="absolute inset-0 w-full h-full object-cover"
      alt="Retrofitted machine"
    />
    <div class="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg z-20">
      {{ newLabel }}
    </div>

    <!-- Old Image (Foreground Overlay / The Source) -->
    <div 
      class="absolute inset-0 w-full h-full overflow-hidden z-10"
      :style="clipStyle"
    >
      <img 
        :src="oldImage" 
        class="absolute inset-0 w-full h-full object-cover grayscale-[40%]"
        alt="Original machine"
      />
      <div class="absolute top-4 left-4 bg-slate-700 text-white px-3 py-1 rounded-full text-xs md:text-sm font-bold uppercase tracking-wider shadow-lg">
        {{ oldLabel }}
      </div>
    </div>

    <!-- Slider Handle Bar and Icon -->
    <div 
      class="absolute inset-y-0 w-1 bg-white shadow-[0_0_15px_rgba(0,0,0,0.3)] z-30"
      :style="{ left: `${sliderPos}%` }"
    >
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-amber-500 rounded-full border-4 border-white shadow-xl flex items-center justify-center transition-transform hover:scale-110">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
          <path d="m9 18-6-6 6-6M15 6l6 6-6 6"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Prevent default browser image dragging which interferes with the slider */
img {
  user-select: none;
  -webkit-user-drag: none;
}

/* Smooth cursor behavior */
.cursor-col-resize {
  cursor: col-resize;
}
</style>