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
          
        </ul>
      </div>
    </div>
  </nav>

  <!-- Home/Hero Section -->
  <section id="home" v-reveal="{ animation: 'zoom-in', duration: 700 }">
    <div id="heroCarousel" class="carousel slide carousel-fade" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active" data-bs-interval="10000">
          <div class="carousel-bg" :style="{ backgroundImage: `url('${carouselBg1}')` }"></div>
        </div>
        <div class="carousel-item" data-bs-interval="10000">
          <div class="carousel-bg" :style="{ backgroundImage: `url('${carouselBg2}')` }"></div>
        </div>
      </div>
    </div>
    <div class="container text-center hero-content">
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
            <p v-if="edu.details" class="mt-3">{{ edu.details }}</p>
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
        <div class="d-flex flex-wrap justify-content-center" v-reveal="{ animation: 'fade-up', stagger: 60 }">
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
  <section id="projects" class="section" v-reveal>
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="row g-4">
        <div
          v-for="project in topProjects"
          :key="project.name"
          class="col-lg-4 col-md-6"
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
            class="col-lg-4 col-md-6"
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

      <div v-if="hasMoreProjects" class="text-center mt-5">
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
          v-for="(post, index) in posts"
          :key="index"
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
                  >最後更新：{{ post.lastUpdated }}</small
                >
              </p>
              <button
                type="button"
                class="btn btn-primary mt-auto align-self-start"
                @click="openPost(post)"
              >
                閱讀更多
              </button>
            </div>
          </div>
        </div>
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
          <p v-for="(para, i) in (selectedPost?.content || [])" :key="i" class="mb-3">{{ para }}</p>
        </div>
        <div class="modal-footer">
          <small class="text-muted me-auto" v-if="selectedPost?.lastUpdated">最後更新：{{ selectedPost.lastUpdated }}</small>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">關閉</button>
        </div>
      </div>
    </div>
  </div>

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
import * as bootstrap from 'bootstrap';

// Import carousel background
import carouselBg1 from "@/assets/images/index/bg1.jpg";
import carouselBg2 from "@/assets/images/index/bg2.jpg";

// Import project icons
import springbootIcon from '@/assets/images/project/springboot.png';
import arduinoIcon from '@/assets/images/project/arduino.png';
import awsIcon from '@/assets/images/project/aws.png';
import bootstrapIcon from '@/assets/images/project/bootstrap.png';
import lineIcon from '@/assets/images/project/line.png';
import openaiIcon from '@/assets/images/project/openai.png';
import pythonIcon from '@/assets/images/project/python.png';
import tensorflowIcon from '@/assets/images/project/tensorflow.png';
import yoloIcon from '@/assets/images/project/yolo.svg';
import matlabIcon from '@/assets/images/project/matlab.png';

// post images
import distributedImage from '@/assets/images/posts/db.jpg';
import l2regImage from '@/assets/images/posts/l2-reg.jpg';

// (Dark mode removed)

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
        details: 'Concentration: LLM' 
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
            'Utilized Spring Security, RESTful API, and unit testing, capable of supporting 10,000+ active users and processing 50,000+ orders daily.',
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
        items: ['MSSQL Server', 'MySQL'] 
    },
    { 
        title: 'Frameworks / Tools', 
        items: ['Spring Boot', 'OpenCV', 'PyTorch', 'Linux', 'Docker', 'Git'] 
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
    technologies: ['MATLAB', 'Image Compression'], 
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
]);

const posts = ref([ 
    { 
        image: l2regImage,
        title: 'Did you “ADD“ or “SUBTRACK“ the L2 Regularization ?',
        snippet: 'Whether L2 regularization is added or subtracted depends on how the objective function is defined',
        lastUpdated: '2025年5月9日',
        link: '#',
        content: [
          ''
        ]
    },
    { 
        image: 'https://placehold.co/600x400/6c757d/ffffff?text=Backend+System',
        title: '建構高併發後端系統的五個關鍵',
        snippet: '從我在 JY Globe Company 的經驗出發，探討如何使用 RabbitMQ 與資料庫分片技術來打造能處理大量訂單的後端服務。',
        lastUpdated: '2025年9月18日',
        link: '#',
        content: [
          '我歸納出高併發系統的五個關鍵：非同步解耦、水平擴展、資料分片、監控告警與壓力測試。',
          '以 RabbitMQ 實作異步處理，降低訂單高峰對主流程的影響；資料庫採用分片與索引優化，顯著提升查詢效能。',
          '文末提供我使用的壓測方法與基準指標，協助你評估系統瓶頸。'
        ]
    },
    { 
        image: 'https://placehold.co/600x400/0d6efd/ffffff?text=Career+Path',
        title: '從語言系到軟體工程師的轉職之路',
        snippet: '這是一篇關於我如何從英文系背景，透過資策會的密集訓練，成功轉職為 Java 後端工程師的經驗分享。',
        lastUpdated: '2025年9月5日',
        link: '#',
        content: [
          '我分享了從動機、學習規劃到面試準備的完整歷程。',
          '透過專案實作與公開程式碼累積作品集，並持續參與社群與比賽提升曝光。',
          '也整理了常見面試題型與我準備的方向，幫助有相同目標的你少走彎路。'
        ]
    } 
]);

// LIFECYCLE HOOK
onMounted(() => {
  startTypingLoop();
  // Initialize ScrollSpy using the imported bootstrap object.
  new bootstrap.ScrollSpy(document.body, {
    target: '#navbar-main',
    offset: 100 // Add offset for better accuracy
  });
});

// computed helpers for Projects collapse
const topProjects = computed(() => projects.value.slice(0, 3));
const restProjects = computed(() => projects.value.slice(3));
const hasMoreProjects = computed(() => projects.value.length > 3);

// POSTS MODAL STATE & ACTIONS
const selectedPost = ref(null);
const postModal = ref(null);
let postModalInstance = null;

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