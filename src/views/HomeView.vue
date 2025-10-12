<template>
  <NavBar />
  
  <HeroSection />

  <!-- About Section -->
  <section id="about" class="section" v-reveal>
    <div class="container">
      <h2 class="section-title">About Me</h2>
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
  <section id="education" class="section bg-white" v-reveal>
    <div class="container">
      <h2 class="section-title">Education</h2>
      <div class="row">
        <div class="col-md-10 mx-auto">
          <div
            v-for="(edu, index) in education"
            :key="index"
            class="timeline-item mb-5"
            v-reveal="{ animation: 'fade-up', duration: 600, delay: 50 }"
          >
            <h4 class="fw-bold d-flex flex-wrap align-items-center gap-2">
              {{ edu.institution }}
              <span
                v-if="isBootcamp(edu.institution)"
                class="badge bg-warning text-dark badge-compact"
                title="Bootcamp"
              >Bootcamp</span>
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
              <table class="table table-sm table-bordered" style="max-width: 500px; font-size: 0.9rem;">
                <thead class="table-light">
                  <tr>
                    <th scope="col">Course</th>
                    <th scope="col" style="width: 80px;">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(course, idx) in edu.courses" :key="idx">
                    <td>{{ course.name }}</td>
                    <td class="text-center">{{ course.grade }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Work Experience Section -->
  <section id="experience" class="section" v-reveal>
    <div class="container">
      <h2 class="section-title">Work Experience</h2>
      <div class="row">
        <div class="col-md-10 mx-auto">
          <div
            v-for="(job, index) in workExperience"
            :key="index"
            class="timeline-item mb-5"
            v-reveal="{ animation: 'fade-up', duration: 600 }"
          >
            <h4 class="fw-bold">{{ job.title }} @ {{ job.company }}</h4>
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
  <section id="skills" class="section bg-white" v-reveal>
    <div class="container">
      <h2 class="section-title">Skills</h2>
      <div v-for="(category, index) in skills" :key="index" class="mb-4">
        <h3 class="text-center mb-3">{{ category.title }}</h3>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-lg-3 col-md-2"></div>
            <div class="col-lg-6 col-md-8 col-12">
              <div class="d-flex flex-wrap justify-content-center" v-reveal="{ animation: 'fade-up', stagger: 60 }">
                <span
                  v-for="skill in category.items"
                  :key="skill"
                  class="badge bg-secondary skill-badge"
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
  <section id="projects" class="section" v-reveal>
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="row g-4">
        <div
          v-for="project in topProjects"
          :key="project.name"
          class="col-lg-4 col-md-6 mb-2"
          v-reveal="{ animation: 'fade-up', duration: 650 }"
        >
          <a
            class="card card-link-override h-100"
            :href="project.link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`Open project: ${project.name}`"
          >
            <div class="card-body text-center d-flex flex-column h-100">
              <h5 class="card-title fw-bold project-card-title">
                <img v-if="project.icon" :src="project.icon" alt="" class="project-lang-icon" @error="onIconError" />
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

      <div class="collapse mt-3" id="moreProjects">
        <div class="row g-4" v-reveal="{ animation: 'fade-up', stagger: 80 }">
          <div
            v-for="project in restProjects"
            :key="project.name"
            class="col-lg-4 col-md-6 mb-2"
          >
            <a
              class="card card-link-override h-100"
              :href="project.link"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="`Open project: ${project.name}`"
            >
              <div class="card-body text-center d-flex flex-column h-100">
                <h5 class="card-title fw-bold project-card-title">
                  <img v-if="project.icon" :src="project.icon" alt="" class="project-lang-icon" @error="onIconError" />
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
  <section id="posts" class="section bg-white" v-reveal>
    <div class="container">
      <h2 class="section-title">Posts</h2>
      <div class="row g-4">
        <div
          v-for="post in posts"
          :key="post.title"
          class="col-md-6 col-lg-4"
          v-reveal="{ animation: 'fade-up', duration: 600, delay: 50 }"
        >
          <div class="card h-100">
            <img :src="post.image" class="card-img-top" :alt="post.title" />
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
            :src="selectedPost.image"
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
          class="form-control"
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
      @click="toggleChat"
      @keyup.enter="toggleChat"
      @keyup.space.prevent="toggleChat"
      @mouseenter="setChatFabVisualState(true)"
      @mouseleave="setChatFabVisualState(false)"
      @focus="setChatFabVisualState(true)"
      @blur="setChatFabVisualState(false)"
      @touchstart="setChatFabVisualState(true)"
      @touchend="setChatFabVisualState(false)"
    >
      <img :src="chatFabImage" alt="AI Assistant" class="chat-fab__image" />
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import * as bootstrap from 'bootstrap';
import postsData from '@/data/posts';
import { renderMarkdown } from '@/utils/markdown';

// Import shared components
import NavBar from '@/components/NavBar.vue';
import HeroSection from '@/components/HeroSection.vue';
import FooterComponent from '@/components/FooterComponent.vue';

// Import project icons
import springbootIcon from '@/assets/images/project/springboot.png';
import arduinoIcon from '@/assets/images/project/arduino.png';
import lineIcon from '@/assets/images/project/line.png';
import openaiIcon from '@/assets/images/project/openai.png';
import geminiIcon from '@/assets/images/project/gemini.png';
import pythonIcon from '@/assets/images/project/python.png';
import tensorflowIcon from '@/assets/images/project/tensorflow.png';
import yoloIcon from '@/assets/images/project/yolo.svg';
import matlabIcon from '@/assets/images/project/matlab.png';
import chatBotIdleImage from '@/assets/images/chatbot/rb1.png';
import chatBotHoverImage from '@/assets/images/chatbot/rb2.png';
import bootstrapImage from '@/assets/images/project/bootstrap.png';
import aws from '@/assets/images/project/aws.png';

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

// Identify bootcamp-type institutions to show a small badge in Education
function isBootcamp(name) {
  if (!name) return false;
  return [
    'National Yang Ming Chiao Tung University',
    'Institute for Information Industry'
  ].includes(name);
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

// AI CHAT STATE
const isChatOpen = ref(false);
const userMessage = ref('');
const chatMessages = ref([]);
const isLoading = ref(false);
const chatBody = ref(null);
const chatFabImage = ref(chatBotIdleImage);

// Persist chat history whenever messages change
watch(chatMessages, persistHistory, { deep: true });

// ... (toggleChat and other functions remain the same)
function toggleChat() {
    isChatOpen.value = !isChatOpen.value;
    if (isChatOpen.value && chatMessages.value.length === 0) {
        chatMessages.value.push({
            id: Date.now(),
            sender: 'assistant',
            text: 'Hello, I\'m Chris. You can ask me questions about my resume!'
        });
    }
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
    }
}

async function callAIAPI(userQuery, history) {
  const apiUrl = "/api/chat";
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
const personalInfo = ref(
    { 
        name: 'JI DUNG LO', 
        email: 'chrislo5311@gmail.com', 
        phone: '((408) 387-4040)', 
        socials: 
        { 
          linkedin: 'https://www.linkedin.com/in/ji-dung-lo-b4b350189/', 
          github: 'https://github.com/chrisluo5311' 
        } 
    }
);

const introduction = ref(
  'Hello, I’m Chris👋. I am a Java Engineer and MS Computer Science student at Santa Clara University. With 5 years of coding experience, I have worked with frameworks like AI agents, RAG, Pytorch, Keras, and TensorFlow. Previously, at JY Globe Company, I built a crypto trading platform with Spring Boot and optimized SQL performance for web application.'
);

const careerObjective = ref(
  'Seeking a full-time job as a AI engineer to apply my skills in building intelligent AI-driven applications.'
);

const education = ref([ 
    { 
        institution: 'Santa Clara University', 
        degree: ['MS in Computer Science and Engineering'], 
        location: 'Santa Clara, CA', 
        date: 'Expected March 2026', 
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
        details: 'GPA: 3.7 / 4.0' 
    },
    { 
        institution: 'National Yang Ming Chiao Tung University', 
        degree: ['Semiconductor AI and ChatGPT Academy (108 hours)'], 
        location: 'Taipei, Taiwan', 
        date: 'Aug 2023 - Nov 2023', 
        details: 'Learned Deep Learning, Machine Learning, TensorFlow, Keras, OpenCV' 
    },
    { 
        institution: 'Institute for Information Industry', 
        degree: ['Java Backend Engineering Training Program (576 hours)'], 
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
        items: ['Spring Boot', 'Flask', 'Vue.js', 'Redis', 'RabbitMQ',
                'AWS EC2', 'PyTorch','OpenCV', 'Docker', 'Git'] 
    } 
]);

const projects = ref([ 
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
    name: 'Brain Tumor Detection with CNN', 
    icon: tensorflowIcon,
    role: 'Team Leader', 
    period: 'Jan 2017 - Nov 2017',
    description: 'Developed a model achieving 90.24% accuracy in brain tumor detection using a CNN, TensorFlow, and Keras.', 
    technologies: ['TensorFlow', 'Keras', 'CNN', 'OpenCV', 'Python'], 
    link: 'https://github.com/chrisluo5311/Team_Image_Recognition' 
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
    name: 'FurBaby - Responsive Web App',
    icon: bootstrapImage,
    role: 'Developer',
    period: 'Aug 2024 - Aug 2024',
    description: 'A responsive web app built with Bootstrap 5, Sass, HTML, CSS, and JavaScript, ensuring seamless display across devices.',
    technologies: ['Bootstrap 5', 'Sass', 'HTML', 'CSS', 'JavaScript'],
    link: 'https://github.com/chrisluo5311/FurBaby?tab=readme-ov-file'
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
    name: 'Distributed Sharding Database', 
    icon: springbootIcon,
    role: 'Developer', 
    period: 'May 2025 - June 2025',
    description: 'Relies on Spring Boot and SQLite, featuring P2P routing, gossip-based node discovery and sharding between multiple SQLite instances', 
    technologies: ['Spring Boot', 'SQLite', 'RabbitMQ', 'P2P', "Gossip Protocol", "Sharding"], 
    link: 'https://github.com/chrisluo5311/ShardingJH' 
  },
  { 
    name: 'arXiv-Copilot: AI Research Assistant', 
    icon: openaiIcon,
    role: 'Developer', 
    period: 'May 2025 - June 2025',
    description: 'An interactive tool for searching, downloading, parsing, and Q&A with arXiv papers (mainly Computer Science), using OpenAI models and FAISS vector database.', 
    technologies: ['Python', 'OpenAI', 'LlamaParse', 'FAISS', 'Streamlit'], 
    link: 'https://github.com/chrisluo5311/arxiv-copilot' 
  },
  { 
    name: 'Resume Assistant', 
    icon: geminiIcon,
    role: 'Developer', 
    period: 'Oct 2025 - Oct 2025',
    description: 'Builds a persona from my resume, routes chats through Google’s Gemini AI, and collects visitor info or unanswered questions for follow-up.', 
    technologies: ['Python', 'Gemini', 'FastAPI', 'OpenAI', 'Pushover'], 
    link: 'https://github.com/chrisluo5311/ResumeAssistant' 
  },
  { 
    name: 'ChrisLuo Website', 
    icon: aws,
    role: 'Developer', 
    period: 'Sep 2025 - Oct 2025',
    description: 'Personal website built with Vue.js and an AI Resume Assistant backed by Python backend. The full stack is deployed on AWS EC2, with Nginx reverse proxy and SSL (Certbot) for HTTPS support.', 
    technologies: ['AWS EC2', 'Gemini', 'FastAPI', 'Nginx', 'SSL'], 
    link: 'https://github.com/chrisluo5311/chrislo-website' 
  },
]);

const posts = computed(() => postsData.slice(0, 3));

// LIFECYCLE HOOK
onMounted(() => {
  // Initialize ScrollSpy using the imported bootstrap object.
  new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-main',
    offset: 100 // Add offset for better accuracy
  });
  loadHistory();
});

// computed helpers for Projects collapse
const topProjects = computed(() => projects.value.slice(0, 3));
const restProjects = computed(() => projects.value.slice(3));
const hasMoreProjects = computed(() => projects.value.length > 3);

// POSTS MODAL STATE & ACTIONS
const selectedPost = ref(null);
const postModal = ref(null);
let postModalInstance = null;

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
