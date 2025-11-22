<template>
  <Transition name="fade-out">
    <div v-if="showOverlay" class="page-loading-overlay">
      <div ref="canvasContainer" class="three-canvas-container"></div>
      <div class="loading-percentage">
        {{ displayPercentage }}%
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue';
import * as THREE from 'three';

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
const canvasContainer = ref(null);

let intervalId = null;
let animationId = null;
let scene = null;
let camera = null;
let renderer = null;
let sphere = null;
let particleSystem = null;

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

// Initialize Three.js scene
const initThreeJS = () => {
  if (!canvasContainer.value) return;

  // Scene setup - transparent background to show texture
  scene = new THREE.Scene();
  scene.background = null;

  // Camera setup
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  camera.position.z = 5;

  // Renderer setup
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(window.devicePixelRatio);
  canvasContainer.value.appendChild(renderer.domElement);

  // Color palette - soft pastel colors for minimal style
  const colorPalette = [
    0xa5b4fc, // Soft purple
    0xc4b5fd, // Light purple
    0xddd6fe, // Very light purple
    0x93c5fd, // Soft blue
    0xbfdbfe, // Light blue
    0xdbeafe, // Very light blue
    0xf0abfc, // Soft pink
    0xf9a8d4, // Light pink
    0xfce7f3, // Very light pink
  ];

  // Helper function to interpolate between colors
  const lerpColor = (color1, color2, t) => {
    const r1 = ((color1 >> 16) & 255) / 255;
    const g1 = ((color1 >> 8) & 255) / 255;
    const b1 = (color1 & 255) / 255;
    const r2 = ((color2 >> 16) & 255) / 255;
    const g2 = ((color2 >> 8) & 255) / 255;
    const b2 = (color2 & 255) / 255;
    
    const r = r1 + (r2 - r1) * t;
    const g = g1 + (g2 - g1) * t;
    const b = b1 + (b2 - b1) * t;
    
    return new THREE.Color(r, g, b);
  };

  // Create sphere (main 3D object) with soft gradient colors
  const geometry = new THREE.SphereGeometry(1, 32, 32);
  const material = new THREE.MeshStandardMaterial({
    color: colorPalette[0],
    metalness: 0.1,
    roughness: 0.8,
    transparent: true,
    opacity: 0.7,
    emissive: colorPalette[0],
    emissiveIntensity: 0.2
  });
  sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  // Add soft lights for minimal style
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambientLight);

  // Soft directional lights with pastel colors
  const directionalLight1 = new THREE.DirectionalLight(colorPalette[3], 0.6);
  directionalLight1.position.set(5, 5, 5);
  scene.add(directionalLight1);

  const directionalLight2 = new THREE.DirectionalLight(colorPalette[0], 0.4);
  directionalLight2.position.set(-5, -5, -5);
  scene.add(directionalLight2);

  // Create minimal particle system with soft colors
  const particleCount = 100; // Reduced for minimal style
  const particleGeometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    // Random positions in a larger sphere
    const radius = 2.5 + Math.random() * 1.5;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);
    
    positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = radius * Math.cos(phi);

    // Soft pastel colors from palette
    const randomColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    const r = ((randomColor >> 16) & 255) / 255;
    const g = ((randomColor >> 8) & 255) / 255;
    const b = (randomColor & 255) / 255;
    
    colors[i3] = r;
    colors[i3 + 1] = g;
    colors[i3 + 2] = b;
  }

  particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleMaterial = new THREE.PointsMaterial({
    size: 0.1,
    vertexColors: true,
    transparent: true,
    opacity: 0.5,
    blending: THREE.NormalBlending // Changed from AdditiveBlending for softer look
  });

  particleSystem = new THREE.Points(particleGeometry, particleMaterial);
  scene.add(particleSystem);

  // Handle window resize
  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  };
  window.addEventListener('resize', handleResize);

  // Animation loop - slow and gentle for minimal style
  const animate = () => {
    animationId = requestAnimationFrame(animate);

    if (sphere) {
      // Slow, gentle rotation
      sphere.rotation.x += 0.005;
      sphere.rotation.y += 0.008;
      
      // Subtle pulsing effect based on percentage
      const scale = 1 + (displayPercentage.value / 100) * 0.15; // Reduced scale for subtlety
      sphere.scale.set(scale, scale, scale);
      
      // Gentle color animation based on time and percentage
      const time = Date.now() * 0.0005; // Slower color change
      const colorIndex1 = Math.floor(time * 0.3) % colorPalette.length;
      const colorIndex2 = (colorIndex1 + 1) % colorPalette.length;
      const t = (time * 0.3) % 1;
      
      const currentColor = lerpColor(colorPalette[colorIndex1], colorPalette[colorIndex2], t);
      
      // Blend with percentage-based color for smooth transition
      const percentageColorIndex = Math.floor((displayPercentage.value / 100) * (colorPalette.length - 1));
      const percentageBlend = (displayPercentage.value / 100) * (colorPalette.length - 1) - percentageColorIndex;
      const percentageColor = lerpColor(
        colorPalette[percentageColorIndex],
        colorPalette[(percentageColorIndex + 1) % colorPalette.length],
        percentageBlend
      );
      
      // Mix time-based and percentage-based colors (gentle blend)
      currentColor.lerp(percentageColor, 0.2); // Reduced blend for softer transition
      sphere.material.color.copy(currentColor);
      sphere.material.emissive.copy(currentColor);
    }

    if (particleSystem) {
      // Very slow particle rotation for minimal style
      particleSystem.rotation.y += 0.001;
      
      // Gentle particle floating animation
      const positions = particleSystem.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(Date.now() * 0.0005 + i) * 0.0003; // Slower, gentler movement
      }
      particleSystem.geometry.attributes.position.needsUpdate = true;
    }

    renderer.render(scene, camera);
  };

  animate();
};

// Clean up Three.js resources
const cleanupThreeJS = () => {
  if (animationId) {
    cancelAnimationFrame(animationId);
    animationId = null;
  }

  if (renderer && canvasContainer.value) {
    canvasContainer.value.removeChild(renderer.domElement);
    renderer.dispose();
  }

  if (sphere) {
    sphere.geometry.dispose();
    sphere.material.dispose();
  }

  if (particleSystem) {
    particleSystem.geometry.dispose();
    particleSystem.material.dispose();
  }

  scene = null;
  camera = null;
  renderer = null;
  sphere = null;
  particleSystem = null;
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
    // Initialize Three.js after DOM is ready
    setTimeout(() => {
      initThreeJS();
    }, 50);
  }
});

onBeforeUnmount(() => {
  // Clean up interval and restore scroll
  if (intervalId) {
    clearInterval(intervalId);
  }
  cleanupThreeJS();
  enableScroll();
});
</script>

