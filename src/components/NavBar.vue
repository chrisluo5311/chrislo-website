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
          <li class="nav-item dropdown">
            <a
              class="nav-link"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              @click.prevent
            >
              Projects <i :class="isDropdownOpen ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" style="font-size: 0.7rem; margin-left: 0.15rem;"></i>
            </a>
            <ul class="dropdown-menu">
              <li class="dropdown-header">Explore Highlights</li>
              <li>
                <button class="dropdown-item dropdown-item-rich" type="button" @click="handleNavigation('projects')">
                  <span class="dropdown-item-title">Projects Overview</span>
                  <small class="dropdown-item-subtitle">Back to Projects</small>
                </button>
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <router-link
                  class="dropdown-item dropdown-item-rich"
                  to="/projects/distributed-sharding-db"
                  exact-active-class="active"
                  @click="closeNavbar"
                >
                  <span class="dropdown-item-title">Distributed Database</span>
                  <small class="dropdown-item-subtitle">Distributed database design and optimization</small>
                </router-link>
              </li>
              <li>
                <router-link
                  class="dropdown-item dropdown-item-rich arxiv-copilot-item"
                  to="/projects/arxiv-copilot"
                  exact-active-class="active"
                  @click="closeNavbar"
                >
                  <span class="dropdown-item-title">arXiv Copilot</span>
                  <small class="dropdown-item-subtitle">RAG chatbot for research assistance</small>
                </router-link>
              </li>
            </ul>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" @click.prevent="handleNavigation('posts')">Posts</a>
          </li>
          <li class="nav-item">
            <a 
              class="nav-link" 
              href="#" 
              aria-label="Download Resume"
              @click.prevent="downloadResume"
            >
              Resume<i class="bi bi-download ms-1"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isDropdownOpen = ref(false);

const personalInfo = ref({
  name: 'JI DUNG LO',
  email: 'chrislo5311@gmail.com',
  phone: '((408) 387-4040)',
  socials: {
    linkedin: 'https://www.linkedin.com/in/ji-dung-lo-b4b350189/',
    github: 'https://github.com/chrisluo5311'
  }
});

const closeNavbar = () => {
  const navbarCollapse = document.getElementById('navbarNav');
  if (navbarCollapse?.classList.contains('show')) {
    navbarCollapse.classList.remove('show');
  }
};

const downloadResume = async () => {
  try {
    const resumeUrl = "https://jidunglo-resume-bucket.s3.us-east-2.amazonaws.com/PublicDocs/ChrisLo_Resume.pdf"
    const response = await fetch(resumeUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch resume: ${response.status}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ChrisLo_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Unable to download resume', error);
  }
};

const handleNavigation = async (section) => {
  // 如果點擊 Posts
  if (section === 'posts') {
    // 如果當前不在 posts 頁面,則導航到 posts 頁面
    if (route.name !== 'posts') {
      await router.push({ name: 'posts' });
    }
    // 如果已經在 posts 頁面,則不做任何事(留在原地)
    closeNavbar();
    return;
  }

  // 對於其他 section(home, about, education 等)
  // 如果當前不在 home 頁面,先導航回 home 頁面
  if (route.name !== 'home') {
    await router.push({ name: 'home' });
    // 等待路由切換完成後再滾動到對應的 section
    setTimeout(() => {
      scrollToSection(section);
      closeNavbar();
    }, 100);
  } else {
    // 如果已經在 home 頁面,直接滾動到對應的 section
    scrollToSection(section);
    closeNavbar();
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

// 監聽 Bootstrap dropdown 事件
onMounted(() => {
  const dropdownElement = document.querySelector('.nav-item.dropdown');
  if (dropdownElement) {
    dropdownElement.addEventListener('shown.bs.dropdown', () => {
      isDropdownOpen.value = true;
    });
    dropdownElement.addEventListener('hidden.bs.dropdown', () => {
      isDropdownOpen.value = false;
    });
  }
});
</script>
