<template>
  <section id="home" v-reveal="{ animation: 'zoom-in', duration: 700 }">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <div class="carousel-bg" :style="{ backgroundImage: 'url(https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/index/bg1.jpg)' }"></div>
        </div>
        <div class="carousel-item" data-bs-interval="10000">
          <div class="carousel-bg" :style="{ backgroundImage: `url(https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/index/bg2.jpg)` }"></div>
        </div>
      </div>
    </div>
    <div class="container text-center hero-content">
      <div class="hero-avatar">
        <img src="https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicImg/index/avatar.jpg" :alt="personalInfo.name" />
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
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const personalInfo = ref({
  name: 'JI DUNG LO',
  email: 'chrislo5311@gmail.com',
  phone: '((408) 387-4040)',
  socials: {
    linkedin: 'https://www.linkedin.com/in/ji-dung-lo-b4b350189/',
    github: 'https://github.com/chrisluo5311'
  }
});

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

onMounted(() => {
  startTypingLoop();
});
</script>
