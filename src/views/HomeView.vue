<template>
  <nav id="navbar-main" class="navbar navbar-expand-lg fixed-top">
    <div class="container">
      <a class="navbar-brand" href="#home">{{ personalInfo.name }}</a>
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
          <li class="nav-item"><a class="nav-link" href="#home">Home</a></li>
          <li class="nav-item"><a class="nav-link" href="#about">About</a></li>
          <li class="nav-item">
            <a class="nav-link" href="#education">Education</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#experience">Experience</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#skills">Skills</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#projects">Projects</a>
          </li>
          <li class="nav-item"><a class="nav-link" href="#posts">Posts</a></li>
          <li class="nav-item ms-lg-3">
            <button
              @click="toggleTheme"
              id="theme-toggler"
              class="btn btn-outline-primary d-flex align-items-center p-2"
            >
              <i :class="themeIcon"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Home/Hero Section -->
  <section id="home">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <div class="carousel-bg" :style="{ backgroundImage: `url(${bg1})` }"></div>
        </div>
        <div class="carousel-item" data-bs-interval="10000">
          <div class="carousel-bg" :style="{ backgroundImage: `url(${bg2})` }"></div>
        </div>
      </div>
    </div>
    <div class="container text-center hero-content">
      <h1 class="hero-title">{{ personalInfo.name }}</h1>
      <p class="hero-subtitle">
        <span class="typing-text">{{ typedText }}</span>
      </p>
      <div class="social-icons mt-4">
        <a :href="personalInfo.socials.linkedin" target="_blank"
          ><i class="bi bi-linkedin"></i
        ></a>
        <a :href="personalInfo.socials.github" target="_blank"
          ><i class="bi bi-github"></i
        ></a>
        <a :href="'mailto:' + personalInfo.email"
          ><i class="bi bi-envelope-fill"></i
        ></a>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title">About Me</h2>
      <div class="row justify-content-center">
        <div class="col-md-8 text-center">
          <p class="lead">{{ introduction }}</p>
          <h4 class="mt-5">Career Objective</h4>
          <p>{{ careerObjective }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Education Section -->
  <section id="education" class="section bg-white">
    <div class="container">
      <h2 class="section-title">Education</h2>
      <div class="row">
        <div class="col-md-10 mx-auto">
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="timeline-item mb-5"
          >
            <h4 class="fw-bold">{{ edu.institution }}</h4>
            <p class="text-muted mb-1">{{ edu.degree }}</p>
            <p class="text-muted mb-2">
              <i class="bi bi-geo-alt-fill"></i> {{ edu.location }}
            </p>
            <span class="badge rounded-pill bg-primary date-badge">{{
              edu.date
            }}</span>
            <p v-if="edu.details" class="mt-3">{{ edu.details }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Work Experience Section -->
  <section id="experience" class="section">
    <div class="container">
      <h2 class="section-title">Work Experience</h2>
      <div class="row">
        <div class="col-md-10 mx-auto">
          <div
            v-for="(job, index) in workExperience"
            :key="index"
            class="timeline-item mb-5"
          >
            <h4 class="fw-bold">{{ job.title }} @ {{ job.company }}</h4>
            <p class="text-muted mb-2">
              <i class="bi bi-geo-alt-fill"></i> {{ job.location }}
            </p>
            <span class="badge rounded-pill bg-primary date-badge">{{
              job.date
            }}</span>
            <ul class="mt-3">
              <li v-for="desc in job.description" :key="desc">{{ desc }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="section bg-white">
    <div class="container">
      <h2 class="section-title">Skills</h2>
      <div v-for="(category, index) in skills" :key="index" class="mb-4">
        <h3 class="text-center mb-3">{{ category.title }}</h3>
        <div class="d-flex flex-wrap justify-content-center">
          <span
            v-for="skill in category.items"
            :key="skill"
            class="badge bg-secondary skill-badge"
            >{{ skill }}</span
          >
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="row g-4">
        <div
          v-for="(project, index) in projects"
          :key="index"
          class="col-lg-4 col-md-6"
        >
          <div class="card">
            <div class="card-body text-center d-flex flex-column">
              <h5 class="card-title fw-bold">{{ project.name }}</h5>
              <p class="card-subtitle mb-2 text-muted">{{ project.role }}</p>
              <p class="card-text flex-grow-1">{{ project.description }}</p>
              <div class="d-flex flex-wrap justify-content-center my-3">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="badge bg-info text-dark m-1"
                  >{{ tech }}</span
                >
              </div>
              <a
                :href="project.link"
                target="_blank"
                class="project-link mt-auto"
                title="View on GitHub"
                ><i class="bi bi-github"></i
              ></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Posts Section -->
  <section id="posts" class="section bg-white">
    <div class="container">
      <h2 class="section-title">Posts</h2>
      <div class="row g-4">
        <div
          v-for="(post, index) in posts"
          :key="index"
          class="col-md-6 col-lg-4"
        >
          <div class="card h-100">
            <img :src="post.image" class="card-img-top" :alt="post.title" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text flex-grow-1">{{ post.snippet }}</p>
              <p class="card-text">
                <small class="text-muted"
                  >最後更新：{{ post.lastUpdated }}</small
                >
              </p>
              <a
                :href="post.link"
                target="_blank"
                class="btn btn-primary mt-auto align-self-start"
                >閱讀更多</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer>
    <div class="container text-center">
      <div class="social-icons mb-3">
        <a :href="personalInfo.socials.linkedin" target="_blank"
          ><i class="bi bi-linkedin"></i
        ></a>
        <a :href="personalInfo.socials.github" target="_blank"
          ><i class="bi bi-github"></i
        ></a>
        <a :href="'mailto:' + personalInfo.email"
          ><i class="bi bi-envelope-fill"></i
        ></a>
      </div>
      <p>
        &copy; {{ new Date().getFullYear() }} {{ personalInfo.name }}. All
        Rights Reserved.
      </p>
    </div>
  </footer>

  <!-- Gemini AI Chat -->
  <div class="chat-fab" @click="toggleChat">✨</div>
  <div class="chat-modal" :class="{ active: isChatOpen }">
    <div class="chat-header">
      <span>AI 助理問答 ✨</span>
      <button type="button" class="btn-close" @click="toggleChat"></button>
    </div>
    <div class="chat-body" ref="chatBody">
      <div
        v-for="message in chatMessages"
        :key="message.id"
        class="chat-message"
        :class="message.sender"
      >
        <span v-html="message.text"></span>
      </div>
      <div v-if="isLoading" class="chat-message loading">
        <div class="spinner-dots">
          <div class="bounce1"></div>
          <div class="bounce2"></div>
          <div class="bounce3"></div>
        </div>
      </div>
    </div>
    <div class="chat-footer">
      <form @submit.prevent="sendMessage" class="d-flex">
        <input
          type="text"
          class="form-control"
          v-model="userMessage"
          placeholder="詢問關於履歷的問題..."
          :disabled="isLoading"
        />
        <button
          type="submit"
          class="btn btn-primary ms-2"
          :disabled="isLoading"
        >
          <i class="bi bi-send-fill"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, computed, nextTick } from 'vue';
import * as bootstrap from 'bootstrap'; // **FIX**: Import bootstrap JS module for programmatic API usage

// CAROUSEL IMAGES
const bg1 = require('@/assets/images/index/bg1.jpg');
const bg2 = require('@/assets/images/index/bg2.jpg');

// THEME STATE
const theme = ref('light');
const themeIcon = computed(() => theme.value === 'light' ? 'bi bi-moon-stars-fill' : 'bi bi-sun-fill');

function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme.value);
}

// TYPING ANIMATION STATE
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

// AI CHAT STATE
const isChatOpen = ref(false);
const userMessage = ref('');
const chatMessages = ref([]);
const isLoading = ref(false);
const chatBody = ref(null);

// ... (toggleChat and other functions remain the same)
function toggleChat() {
    isChatOpen.value = !isChatOpen.value;
    if (isChatOpen.value && chatMessages.value.length === 0) {
        chatMessages.value.push({
            id: Date.now(),
            sender: 'ai',
            text: '您好！我是 Ji Dung Lo 的 AI 履歷助理。您可以問我任何關於他履歷上的問題。'
        });
    }
}

async function sendMessage() {
    const messageText = userMessage.value.trim();
    if (messageText === '' || isLoading.value) return;

    chatMessages.value.push({ id: Date.now(), sender: 'user', text: messageText });
    userMessage.value = '';
    isLoading.value = true;
    await scrollToBottom();

    try {
        const aiResponse = await callGeminiAPI(messageText);
        chatMessages.value.push({ id: Date.now() + 1, sender: 'ai', text: aiResponse });
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        chatMessages.value.push({ id: Date.now() + 1, sender: 'ai', text: '抱歉，目前無法連接到 AI 服務，請稍後再試。' });
    } finally {
        isLoading.value = false;
        await scrollToBottom();
    }
}

async function callGeminiAPI(userQuery) {
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    // **FIX**: Access .value for ref objects when creating the payload
    const resumeData = { 
        personalInfo: personalInfo.value, 
        introduction: introduction.value, 
        careerObjective: careerObjective.value, 
        education: education.value, 
        workExperience: workExperience.value, 
        skills: skills.value, 
        projects: projects.value 
    };
    const systemPrompt = `You are a helpful and professional AI assistant for Ji Dung Lo's resume... Respond in Traditional Chinese.`;
    const payload = {
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts: [{ text: `Here is the resume data: ${JSON.stringify(resumeData)}` }, { text: `Now, please answer the following question: "${userQuery}"` }] }]
    };

    let response;
    for (let i = 0; i < 5; i++) {
        try {
            response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (response.ok) break;
        } catch (error) {
            if (i === 4) throw error;
            await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000));
        }
    }
    if (!response.ok) throw new Error(`API request failed with status ${response.status}`);
    const result = await response.json();
    const candidate = result.candidates?.[0];
    if (candidate && candidate.content?.parts?.[0]?.text) {
        let text = candidate.content.parts[0].text;
        text = text.replace(/\n/g, '<br>').replace(/\* (.*?)(<br>|$)/g, '<li>$1</li>').replace(/(<li>.*<\/li>)/g, '<ul>$1</ul>');
        return text;
    }
    return "抱歉，我無法生成回覆。";
}

async function scrollToBottom() {
    await nextTick();
    if (chatBody.value) {
        chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
}

// RESUME DATA (now as reactive constants)
const personalInfo = ref(
    { 
        name: 'JI DUNG LO', 
        email: 'chrislo5311@gmail.com', 
        phone: '((408) 387-4040)', 
        socials: 
        { 
            linkedin: '[https://www.linkedin.com/in/ji-dung-lo-b4b350189](https://www.linkedin.com/in/ji-dung-lo-b4b350189)', 
            github: '[https://github.com/your-github-username](https://github.com/chrisluo5311)' 
        } 
    }
);

const introduction = ref('Current Computer Science student at Santa Clara University with 1 year of working experience in Java backend development with Spring Boot.');

const careerObjective = ref('Seeking a full-time job as a AI engineer to apply my skills in building intelligent AI-driven applications.');

const education = ref([ 
    { 
        institution: 'Santa Clara University', 
        degree: 'MS in Computer Science and Engineering', 
        location: 'Santa Clara, CA', 
        date: 'Expected March 2026', 
        details: 'Concentration: LLM' 
    },
    { 
        institution: 'Soochow University', 
        degree: 'Bachelor of Arts in English Language and Literature & Business Administration', 
        location: 'Taipei, Taiwan', 
        date: 'Sep 2015 - Jan 2020', 
        details: 'GPA: 3.7 / 4.0' 
    },
    { 
        institution: 'Soochow University', 
        degree: 'Bachelor of Arts in English Language and Literature & Business Administration', 
        location: 'Taipei, Taiwan', 
        date: 'Sep 2015 - Jan 2020', 
        details: 'GPA: 3.7 / 4.0' 
    },
    { 
        institution: 'National Yang Ming Chiao Tung University', 
        degree: 'Semiconductor AI and ChatGPT Academy (108 hours)', 
        location: 'Taipei, Taiwan', 
        date: 'Aug 2023 - Nov 2023', 
        details: 'Learned Deep Learning, Machine Learning, TensorFlow, Keras, OpenCV' 
    },
    { 
        institution: 'Institute for Information Industry', 
        degree: 'Java Backend Engineering Training Program (576 hours)', 
        location: 'Taipei, Taiwan', 
        date: 'Dec 2020 - May 2021', 
        details: 'Learned Java, Spring Boot, MSSQL Server, RESTful API, JavaScript' 
    } 
]);

const workExperience = ref([ 
    { 
        company: 'JY Globe Company', 
        title: 'Java Backend Engineer', 
        location: 'Taipei, Taiwan', 
        date: 'Sep 2021 - Apr 2022', 
        description: [
            'Built a cryptocurrency trading application in a team of 2 with Spring Boot, featuring membership, order, and product systems.',
            'Utilized Spring Security, RESTful API, and unit testing, capable of supporting 10,000+ active users and processing 50,000+ orders daily.',
            'Improved MySQL database query performance by 150% to 200% through indexing and implemented sharding.',
            'Developed an ordering system capable of processing 100,000 orders per hour using RabbitMQ.'
        ]
    }
]);
const skills = ref([ 
    { 
        title: 'Programming', 
        items: ['Java', 'Python', 'SQL', 'JavaScript'] 
    },
    { 
        title: 'Database', 
        items: ['MSSQL Server', 'MySQL'] 
    },
    { 
        title: 'Frameworks/Tools', 
        items: ['Spring Boot', 'OpenCV', 'PyTorch', 'Linux', 'Docker', 'Git'] 
    } 
]);

const projects = ref([ 
    { 
        name: 'Gourmet Map', 
        role: 'Tech Lead', 
        description: 'A food map web application to search for the nearest restaurants, featuring a membership system and a secure e-commerce system.', 
        technologies: ['Spring Boot', 'MSSQL Server', 'jQuery', 'Bootstrap', 'Spring Security'], 
        link: 'https://github.com/your-username/gourmet-map' 
    },
    { 
        name: 'Brain Tumor Detection with CNN', 
        role: 'Team Leader', 
        description: 'Developed a model achieving 90.24% accuracy in brain tumor detection using a CNN, TensorFlow, and Keras.', 
        technologies: ['TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Python'], 
        link: 'https://github.com/your-username/brain-tumor-detection' 
    },
    { 
        name: 'Real-Time Trading Alert System', 
        role: 'Backend Developer', 
        description: 'Developed a microservice to send real-time cryptocurrency price alerts using WebSockets and RabbitMQ, containerized with Docker.', 
        technologies: ['Spring Boot', 'RabbitMQ', 'WebSocket', 'Docker', 'Java'], 
        link: 'https://github.com/your-username/trading-alert-system' 
    } 
]);

const posts = ref([ 
    { 
        image: 'https://placehold.co/600x400/4dabf7/ffffff?text=AI+Development',
        title: 'AI 專案開發心得',
        snippet: '分享我在開發腦瘤檢測模型時，從資料處理、模型訓練到結果評估的完整心路歷程與技術挑戰。',
        lastUpdated: '2025年9月26日',
        link: '#' 
    },
    { 
        image: 'https://placehold.co/600x400/6c757d/ffffff?text=Backend+System',
        title: '建構高併發後端系統的五個關鍵',
        snippet: '從我在 JY Globe Company 的經驗出發，探討如何使用 RabbitMQ 與資料庫分片技術來打造能處理大量訂單的後端服務。',
        lastUpdated: '2025年9月18日',
        link: '#' 
    },
    { 
        image: 'https://placehold.co/600x400/0d6efd/ffffff?text=Career+Path',
        title: '從語言系到軟體工程師的轉職之路',
        snippet: '這是一篇關於我如何從英文系背景，透過資策會的密集訓練，成功轉職為 Java 後端工程師的經驗分享。',
        lastUpdated: '2025年9月5日',
        link: '#' 
    } 
]);

// LIFECYCLE HOOK
onMounted(() => {
    document.documentElement.setAttribute('data-theme', theme.value);
    startTypingLoop();
    // **FIX**: Initialize ScrollSpy using the imported bootstrap object.
    new bootstrap.ScrollSpy(document.body, {
        target: '#navbar-main',
        offset: 100 // Add offset for better accuracy
    });
});
</script>

<style lang="scss">
/* SCSS-like structure for custom styling */
:root {
  --primary-color: #0d6efd;
  --secondary-color: #6c757d;
  --background-light: #f8f9fa;
  --background-dark: #212529;
  --text-light: #f8f9fa;
  --text-dark: #212529;
  --card-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  --hero-overlay-color: rgba(255, 255, 255, 0.9);
}

[data-theme="dark"] {
  --primary-color: #4dabf7;
  --secondary-color: #adb5bd;
  --background-light: #1a1d20;
  --background-dark: #212529;
  --text-light: #f8f9fa;
  --text-dark: #e9ecef;
  --card-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.4);
  --hero-overlay-color: rgba(33, 37, 41, 0.9);
}

body {
  font-family: "Poppins", sans-serif;
  background-color: var(--background-light);
  color: var(--text-dark);
  scroll-behavior: smooth;
  padding-top: 70px; /* Offset for fixed navbar */
  transition: background-color 0.3s ease, color 0.3s ease;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight: 600;
}

.section {
  padding: 80px 0;
}

.section-title {
  text-align: center;
  margin-bottom: 50px;
  font-weight: 700;
  color: var(--text-dark);
  position: relative;
  padding-bottom: 15px;
}

.section-title::after {
  content: "";
  position: absolute;
  display: block;
  width: 60px;
  height: 3px;
  background: var(--primary-color);
  bottom: 0;
  left: calc(50% - 30px);
}

/* Navbar Styling */
.navbar {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

[data-theme="light"] .navbar {
  background-color: #ffffff;
}

[data-theme="dark"] .navbar {
  background-color: var(--background-dark) !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
}

.navbar-brand {
  font-weight: 700;
}

[data-theme="dark"] .navbar-brand {
  color: var(--text-light);
}

.nav-link {
  font-weight: 600;
  color: var(--text-dark);
}

[data-theme="dark"] .nav-link {
  color: var(--text-dark);
}

.nav-link.active,
.nav-link:hover {
  color: var(--primary-color);
}

#theme-toggler {
  font-size: 1.1rem;
}

/* Hero Section */
#home {
  position: relative;
  color: var(--text-dark);
  height: calc(100vh - 70px);
  overflow: hidden;
}

#heroCarousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

#heroCarousel .carousel-inner,
#heroCarousel .carousel-item {
  height: 100%;
}

.carousel-bg {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.carousel-bg::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.3); /* 淡淡的白色遮罩 (30% 透明度) */
  z-index: 1;
}

[data-theme="dark"] .carousel-bg::before {
  background: rgba(33, 37, 41, 0.3); /* 深色主題用淡淡的深色遮罩 */
}

.hero-content {
  position: relative;
  z-index: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #edf8f3;
  font-weight: 600;
  height: 2.5rem; /* Reserve space for typing text to prevent layout shift */
}

.typing-text {
  border-right: 0.15em solid #ffffff;
  animation: blink-caret 0.75s step-end infinite;
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #ffffff;
  }
}

.social-icons a {
  font-size: 1.8rem;
  margin: 0 10px;
  transition: all 0.3s ease;
}

/* LinkedIn - 藍色 */
.social-icons a:has(.bi-linkedin) {
  color: #0077b5;
}

.social-icons a:has(.bi-linkedin):hover {
  color: #00a0dc;
  transform: translateY(-3px);
  filter: drop-shadow(0 4px 8px rgba(0, 119, 181, 0.4));
}

/* GitHub - 黑色 */
.social-icons a:has(.bi-github) {
  color: #333333;
}

.social-icons a:has(.bi-github):hover {
  color: #6e5494;
  transform: translateY(-3px);
  filter: drop-shadow(0 4px 8px rgba(51, 51, 51, 0.4));
}

/* Email - 紅色 */
.social-icons a:has(.bi-envelope-fill) {
  color: #ea4335;
}

.social-icons a:has(.bi-envelope-fill):hover {
  color: #ff6b6b;
  transform: translateY(-3px);
  filter: drop-shadow(0 4px 8px rgba(234, 67, 53, 0.4));
}

/* Card Styling */
.card {
  border: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); /* A more subtle shadow */
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s;
  border-radius: 16px; /* More rounded corners */
  height: 100%;
  background-color: #ffffff; /* Changed: Explicitly set to white for light theme */
}

[data-theme="light"] .bg-white .card {
  background-color: var(
    --background-light
  ); /* Use light gray for cards on white sections */
}

[data-theme="dark"] .card {
  background-color: #343a40; /* A lighter dark shade for better contrast */
  color: var(--text-dark);
  box-shadow: none; /* Use a border instead for dark mode */
  border: 1px solid #495057; /* Updated border for better visibility */
}

.card:hover {
  transform: translateY(-10px); /* A more noticeable lift effect */
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12); /* A more refined hover shadow */
}

[data-theme="dark"] .card:hover {
  border-color: var(--primary-color);
  box-shadow: 0 0 20px rgba(77, 171, 247, 0.15); /* A subtle glow effect on hover */
}

.card-header {
  background-color: var(--primary-color);
  color: var(--text-light);
  font-weight: 600;
}

.timeline-item {
  position: relative;
  padding-left: 30px;
  border-left: 2px solid var(--primary-color);
}

.timeline-item::before {
  content: "";
  position: absolute;
  left: -9px;
  top: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: var(--primary-color);
  border: 2px solid var(--background-light);
  transition: border-color 0.3s ease;
}

.date-badge {
  background-color: var(--primary-color) !important;
}

/* Skills Styling */
.skill-badge {
  font-size: 0.9rem;
  font-weight: 500;
  padding: 0.5em 1em;
  margin: 5px;
  transition: all 0.3s ease;
}

.skill-badge:hover {
  transform: scale(1.1);
  box-shadow: 0 0.2rem 0.5rem rgba(0, 0, 0, 0.1);
}

/* Project Links */
.project-link {
  font-size: 1.5rem;
  color: var(--primary-color);
  transition: transform 0.3s ease;
}

.project-link:hover {
  transform: scale(1.2);
}

/* Section Backgrounds */
.bg-white {
  background-color: #fff !important;
}

[data-theme="dark"] .bg-white {
  background-color: var(--background-dark) !important;
}

/* Footer */
footer {
  background-color: var(--background-dark);
  color: var(--text-light);
  padding: 40px 0;
}

[data-theme="dark"] footer {
  background-color: #111315;
}

footer .social-icons a {
  color: var(--text-light);
}

footer .social-icons a:hover {
  color: var(--primary-color);
}

[data-theme="dark"] .text-muted {
  color: #9a9a9a !important;
}

/* AI Chat Styles */
.chat-fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  z-index: 1050;
  transition: transform 0.3s ease;
}
.chat-fab:hover {
  transform: scale(1.1);
}
.chat-modal {
  display: none;
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 90%;
  max-width: 400px;
  height: 500px;
  background-color: var(--background-light);
  border: 1px solid var(--secondary-color);
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
  z-index: 1040;
  flex-direction: column;
  overflow: hidden;
  transition: opacity 0.3s, transform 0.3s;
  transform: translateY(20px);
  opacity: 0;
}
.chat-modal.active {
  display: flex;
  transform: translateY(0);
  opacity: 1;
}
.chat-header {
  padding: 1rem;
  background-color: var(--primary-color);
  color: var(--text-light);
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.chat-header .btn-close {
  filter: brightness(0) invert(1);
}
.chat-body {
  flex-grow: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}
.chat-message {
  max-width: 80%;
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  margin-bottom: 0.5rem;
}
.chat-message.user {
  background-color: var(--primary-color);
  color: var(--text-light);
  align-self: flex-end;
  border-bottom-right-radius: 0;
}
.chat-message.ai {
  background-color: var(--secondary-color);
  color: var(--text-light);
  align-self: flex-start;
  border-bottom-left-radius: 0;
}
.chat-message.loading {
  align-self: flex-start;
}
.spinner-dots {
  display: flex;
}
.spinner-dots div {
  width: 8px;
  height: 8px;
  background-color: var(--secondary-color);
  border-radius: 50%;
  margin: 0 2px;
  animation: bounce 1.4s infinite ease-in-out both;
}
.spinner-dots .bounce1 {
  animation-delay: -0.32s;
}
.spinner-dots .bounce2 {
  animation-delay: -0.16s;
}
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.chat-footer {
  padding: 0.5rem;
  border-top: 1px solid var(--secondary-color);
}
</style>