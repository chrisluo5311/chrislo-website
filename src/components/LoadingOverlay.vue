<template>
  <Transition name="fade-out">
    <div v-if="showOverlay" class="page-loading-overlay">
      <div class="loading-percentage">
        {{ displayPercentage }}%
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true,
    default: true
  }
});

// Random start between 35-45%
const startPercentage = 35 + Math.floor(Math.random() * 11);
const displayPercentage = ref(startPercentage);
const showOverlay = ref(props.isLoading);
let intervalId = null;

// Disable scroll when overlay is shown
const disableScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.position = 'fixed';
  document.body.style.width = '100%';
};

// Enable scroll when overlay is hidden
const enableScroll = () => {
  document.body.style.overflow = '';
  document.body.style.position = '';
  document.body.style.width = '';
};

// Jump percentage counter with random increments
const startPercentageAnimation = () => {
  intervalId = setInterval(() => {
    if (displayPercentage.value >= 100) {
      clearInterval(intervalId);
      return;
    }
    
    // Random jump between 3-6%
    const jump = 3 + Math.floor(Math.random() * 4);
    displayPercentage.value = Math.min(displayPercentage.value + jump, 100);
  }, 80); // Update every 80ms for smooth but fast animation
};

// Watch isLoading changes
watch(() => props.isLoading, (newVal) => {
  if (!newVal) {
    // Stop the animation and ensure we're at 100%
    clearInterval(intervalId);
    displayPercentage.value = 100;
    
    // Wait 300ms to show 100%, then start reveal animation
    setTimeout(() => {
      showOverlay.value = false;
      enableScroll();
    }, 300);
  }
});

// Watch showOverlay to control scroll
watch(showOverlay, (newVal) => {
  if (newVal) {
    disableScroll();
  } else {
    enableScroll();
  }
}, { immediate: true });

onMounted(() => {
  // Only start animation if loading is active
  if (props.isLoading) {
    startPercentageAnimation();
  }
});

onBeforeUnmount(() => {
  // Clean up interval and restore scroll
  if (intervalId) {
    clearInterval(intervalId);
  }
  enableScroll();
});
</script>

