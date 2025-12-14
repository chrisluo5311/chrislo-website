<template>
  <LoadingOverlay :isLoading="isPageLoading" />

  <div v-show="!isPageLoading">
    <NavBar />
    
    <HeroSection ref="heroSection" />

  <!-- About Section -->
  <section id="about" class="section">
    <div class="container">
      <h2 class="section-title" ref="aboutTitle">About Me</h2>
      <div class="row justify-content-center">
        <div class="col-md-8 text-center">
          <p class="lead">{{ introduction }}</p>
          <h4 class="mt-5">Career Objective</h4>
          <p class="mt-3 career-objective">{{ careerObjective }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Education Section -->
  <section id="education" class="section bg-white">
    <div class="container">
      <h2 class="section-title" ref="educationTitle">Education</h2>
      <div class="row">
        <div class="col-md-10 mx-auto" ref="educationContainer">
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="timeline-item mb-5 timeline-item-gsap"
          >
            <h4 class="fw-bold d-flex flex-wrap align-items-center gap-2">
              {{ edu.institution }}
              <span
                v-if="edu.badge"
                class="badge bg-warning text-dark badge-compact"
                :title="edu.badge"
              >{{ edu.badge }}</span>
            </h4>
            <p class="text-muted mb-1" v-for="(deg, i) in edu.degree" :key="i">{{ deg }}</p>
            <p class="text-muted mb-2">
              <i class="bi bi-geo-alt-fill"></i> {{ edu.location }}
            </p>
            <span class="badge rounded-pill bg-primary date-badge">{{
              edu.date
            }}</span>
            <p v-if="edu.details && !edu.courses" class="mt-3">{{ edu.details }}</p>
            <div v-if="edu.courses" class="mt-3">
              <p v-if="edu.details" class="mb-2">{{ edu.details }}</p>
              <table class="table table-sm table-bordered course-table" style="max-width: 500px; font-size: 0.9rem;">
                <thead class="table-light">
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col" style="width: 80px;">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(course, idx) in edu.courses" :key="idx">
                    <td><strong>{{ course.name }}</strong></td>
                    <td class="text-center"><strong>{{ course.grade }}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- Certificate/Transcript Image Boxes -->
            <div v-if="edu.certificates && edu.certificates.length > 0" class="certificate-boxes mt-4">
              <a
                v-for="(cert, certIdx) in edu.certificates" 
                :key="certIdx"
                :href="getCertificatePdfUrl(cert)"
                target="_blank"
                rel="noopener noreferrer"
                class="certificate-box"
              >
                <img 
                  v-lazy="getCertificateImageUrl(cert)" 
                  :alt="`Certificate ${certIdx + 1}`"
                  class="certificate-image"
                />
                <div class="certificate-overlay">
                  <i class="bi bi-file-earmark-pdf-fill"></i>
                  <span>View PDF</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Work Experience Section -->
  <section id="experience" class="section">
    <div class="container">
      <h2 class="section-title" ref="experienceTitle">Work Experience</h2>
      <div class="row">
        <div class="col-md-10 mx-auto" ref="experienceContainer">
          <div
            v-for="(job, index) in workExperience"
            :key="index"
            class="timeline-item mb-5 timeline-item-gsap"
          >
            <h4 class="fw-bold">
              {{ job.title }} @
              <a
                v-if="job.companyUrl"
                :href="job.companyUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="company-link"
              >{{ job.company }}</a>
              <span v-else>{{ job.company }}</span>
            </h4>
            <p class="text-muted mb-2">
              <i class="bi bi-geo-alt-fill"></i> {{ job.location }}
            </p>
            <span class="badge rounded-pill bg-primary date-badge">{{
              job.date
            }}</span>
            <ul class="mt-3">
              <li v-for="desc in job.description" :key="desc" v-html="highlightTech(desc)"></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Skills Section -->
  <section id="skills" class="section bg-white">
    <div class="container">
      <h2 class="section-title" ref="skillsTitle">Skills</h2>
      <div v-for="(category, index) in skills" :key="index" class="mb-4">
        <h3 class="text-center mb-3">{{ category.title }}</h3>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-3 col-md-2"></div>
            <div class="col-lg-6 col-md-8 col-12">
              <div class="d-flex flex-wrap justify-content-center skills-container-gsap">
                <span
                  v-for="skill in category.items"
                  :key="skill"
                  class="badge bg-secondary skill-badge skill-badge-gsap"
                  >{{ skill }}</span
                >
              </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Projects Section -->
  <section id="projects" class="section">
    <div class="container">
      <h2 class="section-title" ref="projectsTitle">Projects</h2>
      <div class="row g-4" ref="projectsContainer">
        <div
          v-for="project in topProjects"
          :key="project.name"
          class="col-lg-4 col-md-6 mb-3"
        >
          <RouterLink
            v-if="isInternalRoute(project.link)"
            class="card card-link-override h-100"
            :to="project.link"
            :aria-label="`Open project: ${project.name}`"
          >
            <div class="card-body text-center d-flex flex-column h-100">
              <h5 class="card-title fw-bold project-card-title">
                <img v-if="project.icon" v-lazy="project.icon" alt="" class="project-lang-icon" @error="onIconError" />
                <span class="project-title-text">{{ project.name }}</span>
              </h5>
              <div class="card-subtitle mb-2 text-muted project-card-subtitle d-flex justify-content-between align-items-center">
                <span>{{ project.role }}</span>
                <small v-if="project.period" class="text-muted">{{ project.period }}</small>
              </div>
              <p class="card-text project-card-desc">{{ project.description }}</p>
              <div class="d-flex flex-wrap justify-content-center gap-2 mt-auto pt-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="badge bg-info text-dark m-1"
                  >{{ tech }}</span
                >
              </div>
            </div>
          </RouterLink>
          <a
            v-else
            class="card card-link-override h-100"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Open project: ${project.name}`"
          >
            <div class="card-body text-center d-flex flex-column h-100">
              <h5 class="card-title fw-bold project-card-title">
                <img v-if="project.icon" v-lazy="project.icon" alt="" class="project-lang-icon" @error="onIconError" />
                <span class="project-title-text">{{ project.name }}</span>
              </h5>
              <div class="card-subtitle mb-2 text-muted project-card-subtitle d-flex justify-content-between align-items-center">
                <span>{{ project.role }}</span>
                <small v-if="project.period" class="text-muted">{{ project.period }}</small>
              </div>
              <p class="card-text project-card-desc">{{ project.description }}</p>
              <div class="d-flex flex-wrap justify-content-center gap-2 mt-auto pt-2">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="badge bg-info text-dark m-1"
                  >{{ tech }}</span
                >
              </div>
            </div>
          </a>
        </div>
      </div>

      <div class="collapse mt-3" id="moreProjects" ref="moreProjectsContainer">
        <div class="row g-4">
          <div
            v-for="project in restProjects"
            :key="project.name"
            class="col-lg-4 col-md-6 mb-2"
          >
            <RouterLink
              v-if="isInternalRoute(project.link)"
              class="card card-link-override h-100"
              :to="project.link"
              :aria-label="`Open project: ${project.name}`"
            >
              <div class="card-body text-center d-flex flex-column h-100">
                <h5 class="card-title fw-bold project-card-title">
                  <img v-if="project.icon" v-lazy="project.icon" alt="" class="project-lang-icon" @error="onIconError" />
                  <span class="project-title-text">{{ project.name }}</span>
                </h5>
                <div class="card-subtitle mb-2 text-muted project-card-subtitle d-flex justify-content-between align-items-center">
                  <span>{{ project.role }}</span>
                  <small v-if="project.period" class="text-muted">{{ project.period }}</small>
                </div>
                <p class="card-text project-card-desc">{{ project.description }}</p>
                <div class="d-flex flex-wrap justify-content-center gap-2 mt-auto pt-2">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="badge bg-info text-dark m-1"
                    >{{ tech }}</span
                  >
                </div>
              </div>
            </RouterLink>
            <a
              v-else
              class="card card-link-override h-100"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Open project: ${project.name}`"
            >
              <div class="card-body text-center d-flex flex-column h-100">
                <h5 class="card-title fw-bold project-card-title">
                  <img v-if="project.icon" v-lazy="project.icon" alt="" class="project-lang-icon" @error="onIconError" />
                  <span class="project-title-text">{{ project.name }}</span>
                </h5>
                <div class="card-subtitle mb-2 text-muted project-card-subtitle d-flex justify-content-between align-items-center">
                  <span>{{ project.role }}</span>
                  <small v-if="project.period" class="text-muted">{{ project.period }}</small>
                </div>
                <p class="card-text project-card-desc">{{ project.description }}</p>
                <div class="d-flex flex-wrap justify-content-center gap-2 mt-auto pt-2">
                  <span
                    v-for="tech in project.technologies"
                    :key="tech"
                    class="badge bg-info text-dark m-1"
                    >{{ tech }}</span
                  >
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div v-if="hasMoreProjects" class="text-center mt-4">
        <button
          class="btn btn-outline-egg btn-lg rounded-pill px-4 px-lg-5"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#moreProjects"
          aria-expanded="false"
          aria-controls="moreProjects"
        >
          More
        </button>
      </div>
    </div>
  </section>

  <!-- Posts Section -->
  <section id="posts" class="section bg-white">
    <div class="container">
      <h2 class="section-title" ref="postsTitle">Posts</h2>
      <div class="row g-4" ref="homePostsContainer">
        <div
          v-for="post in posts"
          :key="post.title"
          class="col-md-6 col-lg-4"
        >
          <div class="card h-100 post-card-gsap">
            <img v-lazy="post.image" class="card-img-top" :alt="post.title" />
            <div class="card-body d-flex flex-column">
              <h5 class="card-title">{{ post.title }}</h5>
              <p class="card-text flex-grow-1">{{ post.snippet }}</p>
              <p class="card-text">
                <small class="text-muted"
                  >Last Updated：{{ post.lastUpdated }}</small
                >
              </p>  
              <button
                type="button"
                class="btn btn-read-more mt-auto align-self-start"
                @click="openPost(post)"
              >
                Read More
                <i class="bi bi-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <RouterLink
          class="btn btn-outline-egg btn-lg rounded-pill px-4 px-lg-5"
          :to="{ name: 'posts' }"
        >
          More
        </RouterLink>
      </div>
    </div>
  </section>

  <!-- Post Modal -->
  <div
    class="modal fade"
    id="postModal"
    tabindex="-1"
    aria-labelledby="postModalLabel"
    aria-hidden="true"
    ref="postModal"
  >
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="postModalLabel">{{ selectedPost?.title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <img
            v-if="selectedPost?.image"
            v-lazy="selectedPost.image"
            :alt="selectedPost.title"
            class="img-fluid rounded mb-3 post-modal-image"
          />
          <div v-html="renderedMarkdown" class="markdown-content"></div>
        </div>
        <div class="modal-footer">
          <small class="text-muted me-auto" v-if="selectedPost?.lastUpdated">Last Updated: {{ selectedPost.lastUpdated }}</small>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>

  <FooterComponent />

  <!-- Gemini AI Chat -->
  <div class="chat-widget">
    <div class="chat-modal" :class="{ active: isChatOpen }">
      <div class="chat-header">
        <span>AI Assistant</span>
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
          id="ai-chat-input"
          name="aiChatMessage"
          class="form-control"
          ref="chatInput"
          v-model="userMessage"
          placeholder="Ask questions about my resume."
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
    <div
      class="chat-fab"
      role="button"
      tabindex="0"
      aria-label="Open AI Assistant"
      :aria-expanded="isChatOpen"
      @click="handleChatFabClick"
      @keyup.enter="handleChatFabClick"
      @keyup.space.prevent="handleChatFabClick"
      @mouseenter="setChatFabVisualState(true)"
      @mouseleave="setChatFabVisualState(false)"
      @focus="setChatFabVisualState(true)"
      @blur="setChatFabVisualState(false)"
      @touchstart="setChatFabVisualState(true)"
      @touchend="setChatFabVisualState(false)"
    >
      <!-- Idle message bubble -->
      <div 
        v-if="showIdleMessage && !isChatOpen" 
        class="chat-idle-message"
        :class="{ 'is-dots': isIdleDots }"
        ref="idleMessageRef"
      >
        <div class="chat-idle-message__bubble" ref="idleBubbleRef">
          <span ref="idleTextRef">...</span>
        </div>
        <div class="chat-idle-message__tail" ref="idleTailRef"></div>
      </div>
      <img :src="chatFabImage" alt="AI Assistant" class="chat-fab__image" />
    </div>
  </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, onBeforeUnmount, computed, nextTick, watch } from 'vue';
import * as bootstrap from 'bootstrap';
import { gsap } from 'gsap';
import postsData from '@/data/posts';
import { renderMarkdown } from '@/utils/markdown';
import { 
  animatePostCards, 
  setupAllCardHovers, 
  cleanupScrollTriggers,
  animateHeroSection,
  animateSectionTitles,
  animateTimelineItems,
  animateSkillBadges,
  animateProjectCards,
  setupAllProjectCardHovers,
  setupProjectCardHover
} from '@/utils/gsap-animations';

// Import shared components
import NavBar from '@/components/NavBar.vue';
import HeroSection from '@/components/HeroSection.vue';
import FooterComponent from '@/components/FooterComponent.vue';
import LoadingOverlay from '@/components/LoadingOverlay.vue';

// Project icon URLs
const springbootIcon = 'https://images.chris-luo.me/PublicImg/project/springboot.png';
const arduinoIcon = 'https://images.chris-luo.me/PublicImg/project/arduino.png';
const lineIcon = 'https://images.chris-luo.me/PublicImg/project/line.png';
const openaiIcon = 'https://images.chris-luo.me/PublicImg/project/openai.png';
const geminiIcon = 'https://images.chris-luo.me/PublicImg/project/gemini.webp';
const pythonIcon = 'https://images.chris-luo.me/PublicImg/project/python.png';
const tensorflowIcon = 'https://images.chris-luo.me/PublicImg/project/tensorflow.png';
const yoloIcon = 'https://images.chris-luo.me/PublicImg/project/yolo.svg';
const matlabIcon = 'https://images.chris-luo.me/PublicImg/project/matlab.png';
const chatBotIdleImage = 'https://images.chris-luo.me/PublicImg/chatbot/rb1.png';
const chatBotHoverImage = 'https://images.chris-luo.me/PublicImg/chatbot/rb2.png';
const bootstrapImage = 'https://images.chris-luo.me/PublicImg/project/bootstrap.png';
const aws = 'https://images.chris-luo.me/PublicImg/project/aws.png';
const nvidiaIcon = 'https://images.chris-luo.me/PublicImg/project/nvidia.png';

// Hide broken icon images gracefully
function onIconError(event) {
  const img = event?.target;
  if (img && img.style) {
    console.error('Icon failed to load:', img.src);
    img.style.display = 'none';
  }
}

// Highlight key tech terms with a yellow underline effect
function highlightTech(text) {
  if (!text) return '';
  const terms = ['Spring Boot', 'Spring Security', 'MySQL', 'RabbitMQ'];
  // Escape regex special characters in terms and build a single regex (case-sensitive as requested)
  const escaped = terms.map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const regex = new RegExp(`\\b(${escaped.join('|')})\\b`, 'g');
  return text.replace(regex, '<span class="hl-underline-yellow">$1</span>');
}

// Check if a link is an internal route (starts with / and not an external URL)
function isInternalRoute(link) {
  if (!link) return false;
  return link.startsWith('/') && !link.startsWith('//');
}

// Get certificate image URL (supports both string and object format)
function getCertificateImageUrl(cert) {
  if (!cert) return '';
  // If cert is an object with image property
  if (typeof cert === 'object' && cert.image) {
    return cert.image;
  }
  // If cert is a string, assume it's an image URL
  return cert;
}

// Get certificate PDF URL (supports both string and object format)
function getCertificatePdfUrl(cert) {
  if (!cert) return '';
  // If cert is an object with pdf property
  if (typeof cert === 'object' && cert.pdf) {
    return cert.pdf;
  }
  // If cert is a string, assume it's a PDF URL
  return cert;
}

// --- Chat history persistence ---
const HISTORY_KEY = 'chatHistory.v1';
const MAX_TURNS = 12; // keep ~12 user/ai pairs (~24 msgs)

function persistHistory() {
  try { sessionStorage.setItem(HISTORY_KEY, JSON.stringify(chatMessages.value)); } catch (_) {}
}

function loadHistory() {
  try {
    const saved = JSON.parse(sessionStorage.getItem(HISTORY_KEY) || '[]');
    if (Array.isArray(saved)) chatMessages.value = saved;
  } catch (_) {}
}

// Map UI messages -> API history (user/assistant only, plain text)
function toAPIHistory() {
  const plain = chatMessages.value
    .filter(m => m.sender === 'user' || m.sender === 'assistant')
    .slice(-MAX_TURNS * 2) // cap on client
    .map(m => ({
      role: m.sender === 'user' ? 'user' : 'assistant',
      content: stripHtml(m.text),
    }));
  return plain;
}

// Strip any HTML before sending to server
function stripHtml(html) {
  const d = document.createElement('div');
  d.innerHTML = html;
  return d.textContent || d.innerText || '';
}

// PAGE LOADING STATE
// Check if this is the first visit in this session
const FIRST_VISIT_KEY = 'homePageFirstVisit';
const isFirstVisit = !sessionStorage.getItem(FIRST_VISIT_KEY);
const isPageLoading = ref(isFirstVisit);

// AI CHAT STATE
const isChatOpen = ref(false);
const userMessage = ref('');
const chatMessages = ref([]);
const isLoading = ref(false);
const chatBody = ref(null);
const chatInput = ref(null);
const chatFabImage = ref(chatBotIdleImage);
const chatWidget = ref(null);
const showIdleMessage = ref(true);
const idleMessageRef = ref(null);
const idleBubbleRef = ref(null);
const idleTextRef = ref(null);
const idleTailRef = ref(null);
const isIdleDots = ref(true);
let idleMessageAnimation = null;

// Persist chat history whenever messages change
watch(chatMessages, persistHistory, { deep: true });

// 监听 showIdleMessage 变化，添加打字动画
watch(showIdleMessage, (newVal) => {
  if (newVal && !isChatOpen.value) {
    nextTick(() => {
      // 模板中已经有 "..."，不需要重复设置
      isIdleDots.value = true;
      animateIdleMessage();
    });
  } else {
    // 隐藏时清理动画
    if (idleMessageAnimation) {
      idleMessageAnimation.kill();
      idleMessageAnimation = null;
    }
  }
});

// ... (toggleChat and other functions remain the same)
function toggleChat() {
    isChatOpen.value = !isChatOpen.value;
    if (isChatOpen.value && chatMessages.value.length === 0) {
        chatMessages.value.push({
            id: Date.now(),
            sender: 'assistant',
            text: 'Hello, I\'m Chris. You can ask me questions about my resume !'
        });
    }
}

// Idle message 打字动画
function animateIdleMessage() {
  // 多重检查，确保所有 ref 都存在
  if (!idleMessageRef.value || !idleBubbleRef.value || !idleTextRef.value || !idleTailRef.value) {
    return;
  }
  
  const messageText = 'Ask me any questions !';
  // Ensure we start in the "..." phase for styling
  isIdleDots.value = true;
  
  // 清理之前的动画
  if (idleMessageAnimation) {
    idleMessageAnimation.kill();
    idleMessageAnimation = null;
  }
  
  // 再次检查，防止在清理动画期间组件被卸载
  if (!idleBubbleRef.value || !idleTextRef.value || !idleTailRef.value) {
    return;
  }
  
  // 先确保文本是 "..."（模板中已有，这里只是确保）
  if (idleTextRef.value && idleTextRef.value.textContent !== '...') {
    idleTextRef.value.textContent = '...';
  }
  
  // 设置初始状态（在文本设置之后，避免闪烁）
  // 使用 immediateRender: false 确保不会立即应用
  gsap.set([idleBubbleRef.value, idleTailRef.value], {
    opacity: 0,
    scale: 0.8,
    y: 10,
    immediateRender: true
  });
  
  // 创建时间线
  const tl = gsap.timeline();
  
  // 1. Bubble 和 tail 淡入并弹跳
  if (idleBubbleRef.value && idleTailRef.value) {
    // Bubble 使用 scale 和 y
    tl.to(idleBubbleRef.value, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1.4)'
    });
    // Tail 需要保留 translateX(-50%)，只添加 scale 和 y
    tl.to(idleTailRef.value, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      ease: 'back.out(1.4)'
    }, '<'); // 与 bubble 同时开始
  }
  
  // 2. "..." 闪烁效果
  if (idleTextRef.value) {
    tl.to(idleTextRef.value, {
      opacity: 0.3,
      duration: 0.3,
      repeat: 1,
      yoyo: true,
      ease: 'power2.inOut'
    });
  }
  
  // 3. 清除 "..." 并开始打字动画
  tl.call(() => {
    // 检查 ref 是否存在，防止组件已卸载
    if (!idleTextRef.value) return;
    
    // Switch styling from dots-mode -> typing-mode
    isIdleDots.value = false;
    idleTextRef.value.textContent = '';
    // 使用 GSAP timeline 控制打字效果
    const typeTl = gsap.timeline();
    messageText.split('').forEach((char, index) => {
      typeTl.call(() => {
        // 每次设置前都检查 ref 是否存在
        if (idleTextRef.value) {
          idleTextRef.value.textContent = messageText.substring(0, index + 1);
        }
      }, null, index * 0.05); // 每个字符间隔 50ms
    });
  });
  
  // 4. 添加持续的呼吸效果（轻微缩放）
  if (idleBubbleRef.value) {
    tl.to(idleBubbleRef.value, {
      scale: 1.03,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut'
    }, '-=0.3');
  }
  
  idleMessageAnimation = tl;
}

function handleChatFabClick() {
    // Hide idle message when chat is clicked
    showIdleMessage.value = false;
    toggleChat();
}

const setChatFabVisualState = (isActive) => {
  chatFabImage.value = isActive ? chatBotHoverImage : chatBotIdleImage;
};

async function sendMessage() {
    const messageText = userMessage.value.trim();
    if (messageText === '' || isLoading.value) return;

    chatMessages.value.push({ id: Date.now(), sender: 'user', text: messageText });
    userMessage.value = '';
    isLoading.value = true;
    await scrollToBottom();

    try {
        const aiResponse = await callAIAPI(messageText, toAPIHistory());
        chatMessages.value.push({ id: Date.now() + 1, sender: 'assistant', text: aiResponse });
    } catch (error) {
        console.error('Error calling AI API:', error);
        chatMessages.value.push({ id: Date.now() + 1, sender: 'assistant', text: 'Sorry, we are unable to connect to the AI service right now. Please try again later.' });
    } finally {
        isLoading.value = false;
        await scrollToBottom();
      await nextTick();
      chatInput.value?.focus();
    }
}

async function callAIAPI(userQuery, history) {
  const apiUrl = "https://6s5wa2e3canefhhejch75ds4pi0eocpr.lambda-url.us-east-2.on.aws/api/chat";
  const resumeData = { 
    introduction: introduction.value, 
  };
  
  let response;
  for (let i = 0; i < 5; i++) {
    try {
      response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          { 
            message: userQuery, 
            history: [
              {
                role: "system",
                content: `Intro:\n${JSON.stringify(resumeData)}`
              },
              ...history
            ]
          })
      });
      if (response.ok) break;
    } catch (err) {
      if (i === 4) throw err;
      await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }

  if (!response.ok) throw new Error(`API request failed: ${response.status}`);
  const result = await response.json();
  let text = result?.answer || "Sorry, I can't generate a reply.";

  // 你的原始轉 HTML 邏輯
  text = renderBasicHtml(text);

  return text;
}

function renderBasicHtml(text) {
  // Escape
  const esc = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Minimal formatting: line breaks + bullets
  const withLines = esc.replace(/\n/g, '<br>');
  const bullets = withLines
    .replace(/^\* (.*)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)(?![\s\S]*<\/ul>)/, '<ul>$1</ul>');

  return bullets;
}


async function scrollToBottom() {
    await nextTick();
    if (chatBody.value) {
        chatBody.value.scrollTop = chatBody.value.scrollHeight;
    }
}

// RESUME DATA (now as reactive constants)
const introduction = ref(
  'Hello, I’m Chris👋. I am a Java Engineer and MS Computer Science student at Santa Clara University. With 5 years of coding experience, I have worked with frameworks like AI agents, RAG, Pytorch, Keras, and TensorFlow. Previously, at JY Globe Company, I built a crypto trading platform with Spring Boot and optimized SQL performance for web application.'
);

const careerObjective = ref(
  'Seeking a full-time job as an AI Engineer or Software role to develop scalable and efficient AI-driven applications.'
);

const education = ref([ 
    { 
        institution: 'Santa Clara University', 
        degree: ['MS in Computer Science and Engineering'], 
        location: 'Santa Clara, CA', 
        date: 'March 2024 - Expected March 2026', 
        details: 'Concentration: LLM',
        courses: [
            { name: 'Machine Learning', grade: 'A' },
            { name: 'Information Retrieval and Recommendation System', grade: 'A' },
            { name: 'Natural Language Processing', grade: 'A' }
        ]
    },
    { 
        institution: 'Soochow University', 
        degree: ['BA in English Language and Literature', 'BA in Business Administration'], 
        location: 'Taipei, Taiwan', 
        date: 'Sep 2015 - Jan 2020', 
        details: 'GPA: 3.7 / 4.0',
        certificates: [
          {
            image: 'https://images.chris-luo.me/PublicImg/certificate/undergrad_transcript.jpg',
            pdf:'https://images.chris-luo.me/PublicImg/certificate/undergrad_transcript.pdf'
          },
          {
            image: 'https://images.chris-luo.me/PublicImg/certificate/undergrad_deploma.jpg',
            pdf:'https://images.chris-luo.me/PublicImg/certificate/undergrad_deploma.pdf'
          }
        ]
    },
    { 
        institution: 'National Yang Ming Chiao Tung University', 
        degree: ['Semiconductor AI Academy (108 hours)'], 
        location: 'Taipei, Taiwan', 
        date: 'Aug 2023 - Nov 2023', 
        details: 'Learned Deep Learning, Machine Learning, TensorFlow, Keras, OpenCV',
        badge: 'Bootcamp',
        certificates: [
          {

            image: 'https://images.chris-luo.me/PublicImg/certificate/SemiconductorAIAcademy.jpg',
            pdf:'https://images.chris-luo.me/PublicImg/certificate/SemiconductorAIAcademy.pdf'
          }
          
        ]
    },
    { 
        institution: 'Institute for Information Industry', 
        degree: ['Java Backend Engineering Training Program (576 hours)'], 
        location: 'Taipei, Taiwan', 
        date: 'Dec 2020 - May 2021', 
        details: 'Learned Java, Spring Boot, MSSQL Server, RESTful API, JavaScript',
        badge: 'Bootcamp',
        certificates: [
          {
            image: 'https://images.chris-luo.me/PublicImg/certificate/JavaBackendEngineerAcademy.jpg',
            pdf:'https://images.chris-luo.me/PublicImg/certificate/JavaBackendEngineerAcademy.pdf'
          }
        ]
    } 
]);

const workExperience = ref([
    {
      company: 'Settlyfe Inc.',
      companyUrl: 'https://settlyfe.com/',
      title: 'Full Stack/AI Engineer Intern',
      location: 'Remote',
      date: 'Nov 20 - exptected Feb 2026',
      description: [
        'Iteratively develop and maintain full-stack web and mobile applications using React, React Native, Node.js, Java Spring Boot, and Supabase.',
        'Integrate LLM-based functionalities and fine-tune models to meet the application’s specific requirements.'
      ]
    },
    { 
        company: 'JY Globe Company', 
        title: 'Java Backend Engineer', 
        location: 'Taipei, Taiwan', 
        date: 'Sep 2021 - Apr 2022', 
        description: [
            'Built a cryptocurrency trading application with Spring Boot, featuring membership, order, and product systems.',
            'Utilized Spring Security, RESTful API, and unit testing, capable of supporting 100,000+ active users and processing 50,000+ orders daily.',
            'Improved MySQL database query performance by 150% to 200% through indexing and data sharding.',
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
        items: ['MSSQL Server', 'MySQL','PostgreSQL', 'SQLite'] 
    },
    { 
        title: 'Frameworks / Tools', 
        items: ['Spring Boot', 'Flask', 'Vue.js', 'AWS EC2', 'AWS Lambda', 'AWS S3', 'Redis', 'RabbitMQ', 'PyTorch','OpenCV', 'Git'] 
    } 
]);

const projects = ref([ 
  { 
    name: 'Distributed Sharding Database', 
    icon: springbootIcon,
    role: 'Developer', 
    period: 'May 2025 - June 2025',
    description: 'Relies on Spring Boot and SQLite, featuring P2P routing, gossip-based node discovery and sharding between multiple SQLite instances', 
    technologies: ['Spring Boot', 'SQLite', 'RabbitMQ', 'P2P', "Gossip Protocol", "Sharding"], 
    link: '/projects/distributed-sharding-db' 
  },
  { 
    name: 'arXiv-Copilot: AI Research Assistant', 
    icon: openaiIcon,
    role: 'Developer', 
    period: 'May 2025 - June 2025',
    description: 'Interactive tool for searching, downloading, parsing, and Q&A with arXiv papers, using OpenAI models and FAISS vector database.', 
    technologies: ['S3 vector database','OpenAI', 'LlamaParse', 'FAISS', 'Streamlit'], 
    link: '/projects/arxiv-copilot' 
  },
  { 
    name: 'Automated Detection and Blurring of Sensitive Information', 
    icon: yoloIcon,
    role: 'Developer', 
    period: 'Nov 2024 - Dec 2024',
    description: 'Fine-tunes YOLOv8 to detect and blur sensitive content in public imagery, focusing on faces and vehicle license plates.', 
    technologies: ['YOLOv8', 'Python', 'OpenCV'], 
    link: 'https://github.com/chrisluo5311/YOLOv8ForSensitiveInformation' 
  },
  { 
    name: 'Brain Tumor Detection', 
    icon: tensorflowIcon,
    role: 'Team Leader', 
    period: 'Jan 2017 - Nov 2017',
    description: 'Developed a model achieving 90.24% accuracy in brain tumor detection using a CNN, TensorFlow, and Keras.', 
    technologies: ['TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Python'], 
    link: 'https://github.com/chrisluo5311/Team_Image_Recognition' 
  },
  { 
    name: 'Resume Assistant', 
    icon: geminiIcon,
    role: 'Developer', 
    period: 'Oct 2025 - Oct 2025',
    description: 'Builds a persona from my resume, routes chats through Google’s Gemini AI, and collects visitor info or unanswered questions for follow-up.', 
    technologies: ['AWS Lambda', 'AWS S3', 'Gemini', 'FastAPI', 'OpenAI', 'Pushover'], 
    link: 'https://github.com/chrisluo5311/ResumeAssistant' 
  },
  {
    name: 'MoodFM',
    icon: openaiIcon,
    role: 'Developer',
    period: 'Nov 2025 - Nov 2025',
    description: 'A mood-based music streaming service that recommends songs based on the user\'s mood.',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Flask', 'OpenAI', 'Pushover'],
    link: 'https://moodfm.chris-luo.me/'
  },
  { 
    name: 'VisionFlow AI', 
    icon: aws,
    role: 'Developer', 
    period: 'Nov 2024 - Nov 2024',
    description: 'Built with React and Flask that integrates AWS Bedrock for multimodal AI (LLM + image analysis) and geospatial APIs to deliver location-based alerts.', 
    technologies: ['AWS Bedrock', 'AWS x INREX HACKERTHON', 'React', 'Flask','Geospatial APIs'], 
    link: 'https://github.com/AmirAnva/SCU-AWS-INREX-2024-track1' 
  },
  {
    name: 'Leonardo AI', 
    icon: nvidiaIcon,
    role: 'Developer', 
    period: 'Oct 2025 - Oct 2025',
    description: 'A multi-agent AI system by Nvidia that simulates crowd intelligence predictions using real search capabilities.', 
    technologies: ['NVIDIA','nemotron-nano-9b', 'nemotron-super-49b', 'AI Agent', 'NewsAPI'], 
    link: 'https://github.com/chrisluo5311/NVIDIA_HACKATHON' 
  },
  { 
    name: ' Line chatbot - Covid 19 information', 
    icon: lineIcon,
    role: 'Developer', 
    period: 'Dec 2021 - Feb 2022',
    description: 'Crawls and parses data such as daily confirmed cases, remaining masks, QR code scanning, global epidemic statistics, and vaccine registration statistics.', 
    technologies: ['Spring Boot', 'Line', 'WebSocket', 'PostgreSQL'], 
    link: 'https://github.com/chrisluo5311/LineBot' 
  },
  { 
    name: 'PepperNoodles - search for nearby restaurants', 
    icon: springbootIcon,
    role: 'Tech Lead', 
    period: 'Jun 2019 - Present',
    description: 'A food map web application to search for the nearest restaurants, featuring a membership system and a secure e-commerce system.', 
    technologies: ['Spring Boot', 'MSSQL Server', 'Spring Security'], 
    link: 'https://github.com/PepperNoodles/PepperNoodles' 
  },
  {
    name: 'FurBaby - Responsive Web App',
    icon: bootstrapImage,
    role: 'Developer',
    period: 'Aug 2024 - Aug 2024',
    description: 'A responsive web app built with Bootstrap 5, Sass, HTML, CSS, and JavaScript, ensuring seamless display across devices.',
    technologies: ['Bootstrap 5', 'Sass', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://chrisluo5311.github.io/FurBaby/index.html'
  },
  { 
    name: 'Subpixel Motion Estimation Without Interpolation', 
    icon: matlabIcon,
    role: 'Developer', 
    period: 'Feb 2025 - March 2025',
    description: 'Reproduces a hybrid subpixel motion estimation for motion deblurring that combines coarse block matching with Full search and Log search.', 
    technologies: ['MATLAB', 'Full Search', 'Log Search'], 
    link: 'https://github.com/chrisluo5311/Subpixel-Motion-Estimation' 
  },
  { 
    name: 'Movie Recommendation System', 
    icon: pythonIcon,
    role: 'Developer', 
    period: 'Apr 2025 - May 2025',
    description: 'Developed different algorithms for movie recommendations, such user-based and item-based collaborative filtering, and ensemble methods.', 
    technologies: ['Python', 'Recommendation Systems'], 
    link: 'https://github.com/chrisluo5311/MyNLP_And_LLM/tree/master/web_search%26information_retrieval/project2' 
  },
  { 
    name: 'ChrisLuo Website', 
    icon: aws,
    role: 'Developer', 
    period: 'Sep 2025 - Oct 2025',
    description: 'Personal website built with Vue.js and an AI Resume Assistant backed by Python backend. The full stack is deployed on AWS EC2, with Nginx reverse proxy and SSL (Certbot) for HTTPS support.', 
    technologies: ['AWS EC2', 'AWS Lambda', 'AWS S3', 'Nginx', 'SSL'], 
    link: 'https://github.com/chrisluo5311/chrislo-website' 
  },
  { 
    name: 'Employee access control system', 
    icon: arduinoIcon,
    role: 'Developer', 
    period: 'Dec 2023 - Dec 2023',
    description: 'Developed a access control system with Linkit7688duo and Arduino to Control and manage personnel entering and exiting', 
    technologies: ['Arduino', 'Linkit7688duo', 'Python'], 
    link: 'https://github.com/chrisluo5311/EmbeddedLinkit7688duo' 
  },
]);

const posts = computed(() => postsData.slice(0, 3));

// Handle click outside chat widget
function handleClickOutside(event) {
  if (!isChatOpen.value) return;
  
  const chatWidgetElement = document.querySelector('.chat-widget');
  if (chatWidgetElement && !chatWidgetElement.contains(event.target)) {
    isChatOpen.value = false;
  }
}

// Preload key images before showing page (only on first visit)
async function preloadImages() {
  // If not first visit, skip loading overlay
  if (!isFirstVisit) {
    return;
  }

  // Hero section background images - critical for carousel, load with high priority
  const heroBg1 = 'https://images.chris-luo.me/PublicImg/index/bg1.jpg';
  const heroBg2 = 'https://images.chris-luo.me/PublicImg/index/bg2.jpg';
  
  const imagesToPreload = [
    // Hero carousel backgrounds - load first (highest priority)
    heroBg1,
    heroBg2,
    // Other images
    springbootIcon,
    arduinoIcon,
    lineIcon,
    openaiIcon,
    geminiIcon,
    pythonIcon,
    tensorflowIcon,
    yoloIcon,
    matlabIcon,
    chatBotIdleImage,
    chatBotHoverImage,
    bootstrapImage,
    aws,
    nvidiaIcon,
    ...posts.value.map(post => post.image).filter(Boolean)
  ];

  const imagePromises = imagesToPreload.map(src => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve();
      img.onerror = () => resolve(); // Still resolve on error to not block page
      img.src = src;
    });
  });

  // Minimum display time to ensure percentage animation completes
  const minDisplayTime = new Promise(resolve => setTimeout(resolve, 1100));

  try {
    // Wait for both images to load AND minimum display time
    await Promise.all([Promise.all(imagePromises), minDisplayTime]);
  } catch (error) {
    console.error('Error preloading images:', error);
  } finally {
    isPageLoading.value = false;
    // Mark as visited in this session
    sessionStorage.setItem(FIRST_VISIT_KEY, 'true');
  }
}

// 初始化Home页面的GSAP动画
function initHomeGSAPAnimations() {
  nextTick(() => {
    // 1. Hero Section 动画（只在第一次访问时显示）
    if (heroSection.value) {
      // 检查是否是第一次访问
      const HERO_ANIMATION_KEY = 'heroAnimationShown';
      const hasSeenAnimation = sessionStorage.getItem(HERO_ANIMATION_KEY);
      
      // 等待HeroSection组件完全渲染
      setTimeout(() => {
        const heroElement = document.getElementById('home');
        if (heroElement) {
          // 如果是第一次访问，显示动画并标记
          if (!hasSeenAnimation) {
            animateHeroSection(heroElement, true);
            sessionStorage.setItem(HERO_ANIMATION_KEY, 'true');
          } else {
            // 如果不是第一次，直接显示（不动画）
            animateHeroSection(heroElement, false);
          }
        }
      }, 100);
    }

    // 2. Section 标题动画
    const sectionTitles = [
      aboutTitle.value,
      educationTitle.value,
      experienceTitle.value,
      skillsTitle.value,
      projectsTitle.value,
      postsTitle.value
    ].filter(Boolean);
    
    if (sectionTitles.length > 0) {
      animateSectionTitles(sectionTitles);
    }

    // 3. Education Timeline 动画
    if (educationContainer.value) {
      const educationItems = educationContainer.value.querySelectorAll('.timeline-item-gsap');
      if (educationItems.length > 0) {
        animateTimelineItems(educationItems);
      }
    }

    // 4. Experience Timeline 动画
    if (experienceContainer.value) {
      const experienceItems = experienceContainer.value.querySelectorAll('.timeline-item-gsap');
      if (experienceItems.length > 0) {
        animateTimelineItems(experienceItems);
      }
    }

    // 5. Skills Badges 动画
    const skillsContainers = document.querySelectorAll('.skills-container-gsap');
    skillsContainers.forEach(container => {
      const skillBadges = container.querySelectorAll('.skill-badge-gsap');
      if (skillBadges.length > 0) {
        animateSkillBadges(skillBadges);
      }
    });

    // 6. Project Cards 动画
    if (projectsContainer.value) {
      const projectCards = projectsContainer.value.querySelectorAll('.card-link-override');
      if (projectCards.length > 0) {
        animateProjectCards(projectCards, {
          stagger: 0.12,
          duration: 0.7,
          y: 60,
          ease: 'power3.out'
        });
        setupAllProjectCardHovers('.card-link-override');
      }
    }

    // 7. Post Cards 动画
    if (homePostsContainer.value) {
      const cards = homePostsContainer.value.querySelectorAll('.post-card-gsap');
      if (cards.length > 0) {
        animatePostCards(cards, {
          stagger: 0.15,
          duration: 0.7,
          y: 60,
          ease: 'power3.out'
        });
        setupAllCardHovers('.post-card-gsap');
      }
    }

    // 8. 监听 "More Projects" 展开事件
    const moreProjectsElement = document.getElementById('moreProjects');
    if (moreProjectsElement) {
      let isAnimating = false;
      
      // 在 collapse 开始展开时设置初始状态（避免闪烁）
      moreProjectsElement.addEventListener('show.bs.collapse', () => {
        if (isAnimating) return;
        isAnimating = true;
        
        // 立即设置初始状态，此时元素还在隐藏状态
        nextTick(() => {
          const moreProjectCards = moreProjectsElement.querySelectorAll('.card-link-override');
          if (moreProjectCards.length > 0) {
            // 在元素可见之前就设置初始状态
            gsap.set(moreProjectCards, {
              opacity: 0,
              y: 30,
              scale: 0.95
            });
          }
        });
      });
      
      // 在 collapse 完全展开后运行动画
      moreProjectsElement.addEventListener('shown.bs.collapse', () => {
        if (!isAnimating) return; // 确保 show 事件已触发
        
        // 等待一个tick确保DOM完全更新
        nextTick(() => {
          // Bootstrap collapse 默认 transition 是 350ms，等待更长时间确保完成
          setTimeout(() => {
            const moreProjectCards = moreProjectsElement.querySelectorAll('.card-link-override');
            if (moreProjectCards.length > 0) {
              // 运行动画（初始状态已在 show 事件中设置）
              gsap.to(moreProjectCards, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power3.out',
                onComplete: () => {
                  isAnimating = false;
                }
              });
              
              // 只为新展开的卡片设置hover效果（避免重复设置）
              moreProjectCards.forEach(card => {
                // 检查是否已经设置过hover
                if (!card.dataset.hoverSetup) {
                  setupProjectCardHover(card);
                  card.dataset.hoverSetup = 'true';
                }
              });
            } else {
              isAnimating = false;
            }
          }, 50); // 只需要等待很短时间，因为初始状态已设置
        });
      });
    }
  });
}

// LIFECYCLE HOOK
onMounted(async () => {
  // Initialize ScrollSpy using the imported bootstrap object.
  new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-main',
    offset: 100 // Add offset for better accuracy
  });
  loadHistory();
  
  // Add click outside listener for chat widget
  document.addEventListener('click', handleClickOutside);
  
  // Preload images
  await preloadImages();
  
  // Initialize GSAP animations after page loads and images are ready
  // Wait a bit more to ensure all elements are rendered
  setTimeout(() => {
    initHomeGSAPAnimations();
    // 初始化 idle message 动画
    if (showIdleMessage.value && !isChatOpen.value) {
      // 模板中已经有 "..."，不需要重复设置
      nextTick(() => {
        animateIdleMessage();
      });
    }
  }, 200);
});

onBeforeUnmount(() => {
  // Clean up click outside listener
  document.removeEventListener('click', handleClickOutside);
  // Clean up GSAP ScrollTriggers
  cleanupScrollTriggers();
  // 清理 idle message 动画
  if (idleMessageAnimation) {
    idleMessageAnimation.kill();
    idleMessageAnimation = null;
  }
});

// computed helpers for Projects collapse
const topProjects = computed(() => projects.value.slice(0, 3));
const restProjects = computed(() => projects.value.slice(3));
const hasMoreProjects = computed(() => projects.value.length > 3);

// POSTS MODAL STATE & ACTIONS
const selectedPost = ref(null);
const postModal = ref(null);
const homePostsContainer = ref(null);
let postModalInstance = null;

// Refs for GSAP animations
const heroSection = ref(null);
const aboutTitle = ref(null);
const educationTitle = ref(null);
const educationContainer = ref(null);
const experienceTitle = ref(null);
const experienceContainer = ref(null);
const skillsTitle = ref(null);
const projectsTitle = ref(null);
const projectsContainer = ref(null);
const postsTitle = ref(null);
const moreProjectsContainer = ref(null);

// Computed property to render markdown content
const renderedMarkdown = computed(() => {
  if (!selectedPost.value?.markdown) return '';
  return renderMarkdown(selectedPost.value.markdown);
});

function openPost(post) {
  selectedPost.value = post;
  // Ensure modal instance
  if (!postModalInstance && postModal.value) {
    postModalInstance = new bootstrap.Modal(postModal.value, { backdrop: true });
  }
  // If not yet mounted, wait nextTick
  if (!postModalInstance) {
    nextTick(() => {
      if (!postModalInstance && postModal.value) {
        postModalInstance = new bootstrap.Modal(postModal.value, { backdrop: true });
      }
      postModalInstance && postModalInstance.show();
    });
  } else {
    postModalInstance.show();
  }
}
</script>
