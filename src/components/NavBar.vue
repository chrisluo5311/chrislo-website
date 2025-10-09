<template>
  <nav id="navbar-main" class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#" @click.prevent="handleNavigation('home')">{{ personalInfo.name }}</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-center">
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleNavigation('home')">Home</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleNavigation('about')">About</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleNavigation('education')">Education</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleNavigation('experience')">Experience</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleNavigation('skills')">Skills</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleNavigation('projects')">Projects</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleNavigation('posts')">Posts</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const personalInfo = ref({
  name: 'JI DUNG LO',
  email: 'chrislo5311@gmail.com',
  phone: '((408) 387-4040)',
  socials: {
    linkedin: 'https://www.linkedin.com/in/ji-dung-lo-b4b350189/',
    github: 'https://github.com/chrisluo5311'
  }
});

const handleNavigation = async (section) => {
  // 如果點擊 Posts
  if (section === 'posts') {
    // 如果當前不在 posts 頁面，則導航到 posts 頁面
    if (route.name !== 'posts') {
      await router.push({ name: 'posts' });
    }
    // 如果已經在 posts 頁面，則不做任何事（留在原地）
    return;
  }

  // 對於其他 section（home, about, education 等）
  // 如果當前在 posts 頁面，先導航回 home 頁面
  if (route.name === 'posts') {
    await router.push({ name: 'home' });
    // 等待路由切換完成後再滾動到對應的 section
    setTimeout(() => {
      scrollToSection(section);
    }, 100);
  } else {
    // 如果已經在 home 頁面，直接滾動到對應的 section
    scrollToSection(section);
  }
};

const scrollToSection = (section) => {
  const element = document.getElementById(section);
  if (element) {
    const navbarHeight = document.getElementById('navbar-main')?.offsetHeight || 0;
    const targetPosition = element.offsetTop - navbarHeight;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
};
</script>
