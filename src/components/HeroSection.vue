<template>
  <section id="home">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <div class="carousel-bg" :style="{ backgroundImage: bg1Loaded ? `url(${bg1Url})` : 'none' }" ref="bg1Ref"></div>
        </div>
        <div class="carousel-item" data-bs-interval="10000">
          <div class="carousel-bg" :style="{ backgroundImage: bg2Loaded ? `url(${bg2Url})` : 'none' }" ref="bg2Ref"></div>
        </div>
      </div>
    </div>
    <div class="container text-center hero-content">
      <div class="hero-avatar">
        <img v-lazy="avatarUrl" :alt="personalInfo.name" />
      </div>
      <h1 class="hero-title">{{ personalInfo.name }}</h1>
      <p class="hero-subtitle">
        <span class="typing-text">{{ typedText }}</span>
      </p>
      <div class="social-icons mt-4">
        <a :href="personalInfo.socials.linkedin" target="_blank" rel="noopener noreferrer"
          ><i class="bi bi-linkedin"></i
        ></a>
        <a :href="personalInfo.socials.github" target="_blank" rel="noopener noreferrer"
          ><i class="bi bi-github"></i
        ></a>
        <a :href="'mailto:' + personalInfo.email"
          ><i class="bi bi-envelope-fill"></i
        ></a>
      </div>
      <div class="mt-4">
        <RouterLink to="/book-meeting" class="btn btn-book-meeting rounded-pill px-4 py-2">
          <img v-lazy="calendarIconUrl" alt="Calendar" class="btn-calendar-icon me-2" />
          Book a meeting
        </RouterLink>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { RouterLink } from 'vue-router';

const personalInfo = ref({
  name: 'JI DUNG LO',
  email: 'chrislo5311@gmail.com',
  phone: '((408) 387-4040)',
  socials: {
    linkedin: 'https://www.linkedin.com/in/ji-dung-lo-b4b350189/',
    github: 'https://github.com/chrisluo5311'
  }
});

// Image URLs
const bg1Url = 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/index/bg1.jpg';
const bg2Url = 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/index/bg2.jpg';
const avatarUrl = 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/index/avatar.jpg';
const calendarIconUrl = 'https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/index/Google_Calendar_icon.svg.png';

// Background image loading states
const bg1Loaded = ref(false);
const bg2Loaded = ref(false);
const bg1Ref = ref(null);
const bg2Ref = ref(null);

const typedText = ref('');
const titlesToType = ['Backend Java Engineer', 'I love AI Agent', 'I work on interesting projects'];

function typeWriter(text, i, callback) {
  if (i < text.length) {
    typedText.value += text.charAt(i);
    setTimeout(() => typeWriter(text, i + 1, callback), 100);
  } else {
    setTimeout(callback, 2000);
  }
}

function deleteWriter(callback) {
  let text = typedText.value;
  if (text.length > 0) {
    typedText.value = text.substring(0, text.length - 1);
    setTimeout(() => deleteWriter(callback), 50);
  } else {
    setTimeout(callback, 500);
  }
}

function startTypingLoop(titleIndex = 0) {
  const currentTitle = titlesToType[titleIndex];
  typeWriter(currentTitle, 0, () => {
    deleteWriter(() => {
      startTypingLoop((titleIndex + 1) % titlesToType.length);
    });
  });
}

// Preload both background images immediately
function setupBackgroundLazyLoad() {
  // Preload both images simultaneously to ensure they're ready before carousel animation
  const img1 = new Image();
  const img2 = new Image();
  
  // Load first background image
  img1.onload = () => {
    bg1Loaded.value = true;
  };
  img1.onerror = () => {
    console.warn('Failed to load bg1 image');
  };
  img1.src = bg1Url;

  // Preload second background image immediately (not lazy load)
  // This ensures it's ready when carousel switches
  img2.onload = () => {
    bg2Loaded.value = true;
  };
  img2.onerror = () => {
    console.warn('Failed to load bg2 image');
  };
  img2.src = bg2Url;
}

onMounted(() => {
  startTypingLoop();
  setupBackgroundLazyLoad();
});

onBeforeUnmount(() => {
  // Cleanup is no longer needed since we removed IntersectionObserver
});
</script>
