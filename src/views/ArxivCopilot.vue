<template>
  <div>
    <NavBar />

    <main class="arxiv-copilot-main">
      <!-- Sticky Back to Home Button -->
      <RouterLink class="btn-back-home" to="/" title="Back to Home">
        <i class="bi bi-house-fill"></i>
        <span class="btn-text">Back to Home</span>
      </RouterLink>
      
      <section class="page-wrap">
      <!-- Hero -->
      <header class="hero">
      <h1>arXiv Copilot<br>A RAG Chatbot for Research Assistance</h1>
      <p class="tagline mb-3">
        An interactive tool for searching, downloading, parsing, and Q&A with arXiv papers using Retrieval-Augmented Generation.
      </p>
      <div class="hero-cta">
        <a class="btn primary" href="https://images.chris-luo.me/PublicDocs/arXiv_Copilot.pdf" target="_blank" rel="noopener">
          <i class="bi bi-file-earmark-pdf"></i>
          Read the Full Report
        </a>
        <a class="btn btn-github" href="https://github.com/chrisluo5311/arxiv-copilot" target="_blank" rel="noopener">
          <i class="bi bi-github"></i>
          View on GitHub
        </a>
        <a class="btn" href="https://youtu.be/demo-video" target="_blank" rel="noopener">
          <i class="bi bi-youtube"></i>
          Watch Demo Video
        </a>
      </div>
    </header>

    <!-- Try it now section -->
    <section class="try-it-section">
      <h2 class="try-it-title">Try it now !</h2>
      <div class="iframe-wrapper">
        <div v-if="iframeLoading" class="iframe-loading" ref="iframeLoadingRef">
          <div class="gsap-spinner">
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
            <div class="spinner-ring"></div>
          </div>
          <p class="loading-text" ref="loadingTextRef">Loading arXiv Copilot...</p>
        </div>
        <iframe 
          src="https://chris-luo.me/streamlit/" 
          frameborder="0"
          allowfullscreen
          class="streamlit-iframe"
          :class="{ 'iframe-hidden': iframeLoading }"
          @load="onIframeLoad"
        ></iframe>
      </div>
      <div class="collapse-note">
        <button 
          class="btn btn-link collapse-toggle" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#implementationNote" 
          aria-expanded="false" 
          aria-controls="implementationNote"
        >
          <i class="bi bi-info-circle"></i>
          Implementation Note
          <i class="bi bi-chevron-down"></i>
        </button>
        <div class="collapse" id="implementationNote">
          <div class="collapse-content">
            <p>The iframe implementation utilizes a <strong>S3 vector database</strong> for embeddings storage (currently 55800 vectors) and user queries, employing OpenAI's <strong>text-embedding-3-small</strong> model for text embeddings.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Highlight metrics -->
    <section class="arxiv-metrics">
      <div class="arxiv-card">
        <div class="arxiv-metric">LlamaParse</div>
        <div class="arxiv-label">Extracts text, figures, and tables from PDFs and breaks into chunks (~300 words) with an overlap stride of 100 words</div>
      </div>
      <div class="arxiv-card">
        <div class="arxiv-metric">FAISS</div>
        <div class="arxiv-label">Encodes with Sentence-BERT and stores in FAISS for top-k cosine similarity search</div>
      </div>
      <div class="arxiv-card">
        <div class="arxiv-metric">SPIQA</div>
        <div class="arxiv-label">Benchmarking on SPIQA dataset (666 questions across 118 CS papers) with emphasis on figure/chart/table reasoning</div>
      </div>
    </section>

    <!-- Project overview -->
    <section class="arxiv-grid arxiv-two arxiv-project-overview-section">
      <div>
        <h2>Project Overview</h2>
        <p>
          arXiv Copilot is an intelligent research assistant that leverages Retrieval-Augmented Generation (RAG) 
          to help researchers interact with arXiv papers more effectively. Built with Streamlit and powered by 
          OpenAI's GPT models, it provides three distinct modes for different research needs.
        </p>
        <p>
          The system combines fast abstract retrieval with deep document analysis, enabling users to quickly 
          find relevant papers and then dive deep into specific documents for detailed Q&A sessions.
        </p>
        <ul class="bullets">
          <li><strong>Fast Retrieval</strong> searches arXiv paper abstracts by keyword for quick discovery.</li>
          <li><strong>Chatbot Mode</strong> provides an AI assistant with abstract search capabilities.</li>
          <li><strong>File Q&A Mode</strong> downloads and parses specific papers for detailed analysis.</li>
        </ul>
        <p>
          The architecture uses LlamaParse for sophisticated PDF parsing, storing document chunks in vector 
          embeddings for efficient retrieval. This enables accurate, context-aware responses based on the 
          actual paper content rather than just abstracts.
        </p>
        <p>
          Designed for researchers, students, and academics, arXiv Copilot transforms the way we interact 
          with scientific literature, making complex papers more accessible and research workflows more efficient.
        </p>
      </div>
      <figure class="arxiv-img-card arxiv-clickable-img">
        <img 
          v-lazy="arXivRagImage" 
          alt="arXiv Copilot Architecture"
          @click="openImageModal(arXivRagImage, 'arXiv Copilot RAG Architecture Overview')"
        >
        <figcaption>arXiv Copilot RAG Architecture Overview</figcaption>
      </figure>
    </section>

    <!-- Features -->
    <section class="arxiv-features-section">
      <h2>Key Features</h2>
      <p>
        arXiv Copilot offers a comprehensive suite of tools designed to streamline research workflows 
        and enhance paper comprehension through AI-powered assistance.
      </p>

      <h3>Three Operating Modes</h3>

      <p>
        The system provides flexible interaction patterns:
      </p>
      <ul>
        <li><strong>Fast Retrieval</strong> - Quick keyword-based search across arXiv abstracts</li>
        <li><strong>Chatbot Mode</strong> - Conversational AI assistant with search capabilities</li>
        <li><strong>File Q&A Mode</strong> - Deep analysis of specific papers via arXiv ID</li>
      </ul>
      <p>
        Each mode serves different research scenarios, from initial paper discovery to detailed 
        content analysis and understanding.
      </p>

      <h3>Advanced PDF Processing</h3>

      <p>
        The system uses LlamaParse for sophisticated document processing:
      </p>
      <ul>
        <li>Automatic PDF download from arXiv using paper IDs</li>
        <li>Intelligent text extraction and chunking</li>
        <li>Vector embedding generation for semantic search</li>
        <li>Persistent storage in <code>pdf_chunks/</code> directory</li>
      </ul>
      <p>
        This enables accurate retrieval of relevant document sections during Q&A sessions, 
        ensuring responses are grounded in actual paper content.
      </p>
      <h4>RAG Implementation</h4>
      <ul>
        <li>Document chunking and embedding storage</li>
        <li>Semantic similarity search for relevant sections</li>
        <li>Context-aware response generation with OpenAI GPT</li>
        <li>Citation tracking and source attribution</li>
      </ul>
      <p>
        The RAG approach ensures that AI responses are accurate, relevant, and properly 
        attributed to specific sections of the source papers.
      </p>
      <h4>User Interface</h4>
      <p>
        Built with Streamlit for intuitive interaction, featuring sidebar configuration, 
        mode selection, and real-time response streaming for optimal user experience.
        The interface adapts to different use cases while maintaining simplicity and 
        accessibility for users of all technical backgrounds.
      </p>
    </section>

    <!-- Technical Implementation -->
    <section class="row g-4 arxiv-implementation-section">
      <div class="col-12 col-md-6 arxiv-implementation-column">
        <div class="arxiv-implementation-copy">
          <h3>PDF Processing Pipeline</h3>
          <p>
            The system automatically downloads PDFs from arXiv using paper IDs, then processes them through 
            LlamaParse for intelligent text extraction and chunking. Each chunk is embedded using OpenAI's 
            embedding models and stored for efficient retrieval.
          </p>
        </div>
        <figure class="arxiv-img-card arxiv-clickable-img arxiv-implementation-figure">
          <img
            class="arxiv-implementation-image"
            v-lazy="pdfPipelineImage"
            alt="PDF Processing Pipeline"
            @click="openImageModal(pdfPipelineImage, 'PDF Processing and Embedding Pipeline')"
          >
          <figcaption>PDF Processing and Embedding Pipeline</figcaption>
        </figure>
      </div>
      <div class="col-12 col-md-6 arxiv-implementation-column">
        <div class="arxiv-implementation-copy">
          <h3>Vector Search & Retrieval</h3>
          <p>
            When users ask questions, the system performs semantic similarity search across document chunks 
            to find the most relevant sections. These chunks are then used as context for generating 
            accurate, source-attributed responses.
          </p>
        </div>
        <figure class="arxiv-img-card arxiv-clickable-img arxiv-implementation-figure">
          <img
            class="arxiv-implementation-image"
            v-lazy="vectorSearchImage"
            alt="Vector Search Process"
            @click="openImageModal(vectorSearchImage, 'Vector Search and Retrieval Process')"
          >
          <figcaption>Vector Search and Retrieval Process</figcaption>
        </figure>
      </div>
    </section>

    <!-- Core Technologies -->
    <section class="arxiv-technologies-section">
      <h2>Core Technologies & Services</h2>
      
      <div class="arxiv-tech-grid">
        <div class="arxiv-tech-card">
          <div class="arxiv-tech-header">
            <div class="arxiv-tech-icon-wrapper">
              <i class="bi bi-search"></i>
            </div>
            <h3>Research Paper Search</h3>
          </div>
          <div class="arxiv-tech-body">
            <p>Retrieve arXiv papers by ID or keyword and automatically fetch full-text PDFs from the public arXiv dataset for downstream processing.</p>
          </div>
          <div class="arxiv-tech-footer">
            <span class="arxiv-tech-tag">API Integration</span>
          </div>
        </div>

        <div class="arxiv-tech-card">
          <div class="arxiv-tech-header">
            <div class="arxiv-tech-icon-wrapper">
              <i class="bi bi-file-earmark-pdf"></i>
            </div>
            <h3>PDF Parsing & Chunking</h3>
          </div>
          <div class="arxiv-tech-body">
            <p>Leverages <strong>LlamaParse</strong> to extract structured text, figure captions, and tables from scientific PDFs, then splits content into overlapping chunks (~300 words) for accurate retrieval.</p>
          </div>
          <div class="arxiv-tech-footer">
            <span class="arxiv-tech-tag">Document AI</span>
          </div>
        </div>
        
        <div class="arxiv-tech-card">
          <div class="arxiv-tech-header">
            <div class="arxiv-tech-icon-wrapper">
              <i class="bi bi-cloud-arrow-down"></i>
            </div>
            <h3>Vector Indexing & Semantic Retrieval</h3>
          </div>
          <div class="arxiv-tech-body">
            <p>Encodes text chunks using <strong>Sentence-BERT (all-MiniLM-L6-v2)</strong> and stores them in <strong>FAISS</strong>, enabling high-speed semantic search that retrieves only the most relevant paper sections.</p>
          </div>
          <div class="arxiv-tech-footer">
            <span class="arxiv-tech-tag">Vector DB</span>
          </div>
        </div>

        <div class="arxiv-tech-card">
          <div class="arxiv-tech-header">
            <div class="arxiv-tech-icon-wrapper">
              <i class="bi bi-diagram-3"></i>
            </div>
            <h3>RAG-Enhanced Multimodal Chatbot</h3>
          </div>
          <div class="arxiv-tech-body">
            <p>Combines <strong>GPT-4o</strong> with retrieved text and figure images to generate grounded answers. Supports both text-only and multimodal (text + image) scientific question answering with optional chain-of-thought reasoning.</p>
          </div>
          <div class="arxiv-tech-footer">
            <span class="arxiv-tech-tag">RAG System</span>
          </div>
        </div>

        <div class="arxiv-tech-card">
          <div class="arxiv-tech-header">
            <div class="arxiv-tech-icon-wrapper">
              <i class="bi bi-chat-dots"></i>
            </div>
            <h3>Evaluation & Benchmarking</h3>
          </div>
          <div class="arxiv-tech-body">
            <p>Benchmarked on the SPIQA Test-A dataset (666 multimodal QA pairs) using cosine similarity, accuracy, recall, and F1-score — demonstrating improved factual grounding and reduced hallucination over vanilla GPT-4o.</p>
          </div>
          <div class="arxiv-tech-footer">
            <span class="arxiv-tech-tag">Benchmarking</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Evaluation -->
    <section class="arxiv-evaluation-section">
      <h2>Evaluation & Results</h2>
      
      <!-- Text-Only QA -->
      <div class="arxiv-eval-item">
        <div class="arxiv-eval-card">
          <div class="arxiv-eval-header">
            <h3>Text-Only QA</h3>
          </div>
          <div class="arxiv-eval-body">
            <p>Evaluation metrics for text-only QA with thresholded cosine similarity at 0.7 for correctness. RAG model demonstrates superior performance with 53% accuracy and 0.69 F1-score compared to Vanilla GPT4o's 35% accuracy and 0.52 F1-score.</p>
          </div>
        </div>
        <figure class="arxiv-img-card arxiv-clickable-img">
          <img 
            v-lazy="textOnlyImage" 
            alt="Text-Only QA Evaluation Results"
            @click="openImageModal(textOnlyImage, 'Figure 4. Evaluation metrics for text-only QA (thresholded at cosine similarity 0.7 for correctness)')"
          >
          <figcaption>Figure 4. Text-Only QA Evaluation Results</figcaption>
        </figure>
      </div>

      <!-- Multimodal QA -->
      <div class="arxiv-eval-item arxiv-eval-item-reverse">
        <figure class="arxiv-img-card arxiv-clickable-img">
          <img 
            v-lazy="multiModalImage" 
            alt="Multimodal QA Evaluation Results"
            @click="openImageModal(multiModalImage, 'Figure 6. Evaluation metrics for multimodal QA')"
          >
          <figcaption>Figure 6. Multimodal QA Evaluation Results</figcaption>
        </figure>
        <div class="arxiv-eval-card">
          <div class="arxiv-eval-header">
            <h3>Multimodal QA</h3>
          </div>
          <div class="arxiv-eval-body">
            <p>Performance comparison for multimodal question answering tasks. Multimodal RAG achieves 63% accuracy and 0.77 F1-score, outperforming Multimodal Vanilla GPT4o which reaches 59% accuracy and 0.74 F1-score.</p>
          </div>
        </div>
      </div>

      <!-- Multimodal CoT -->
      <div class="arxiv-eval-item">
        <div class="arxiv-eval-card">
          <div class="arxiv-eval-header">
            <h3>Multimodal CoT</h3>
          </div>
          <div class="arxiv-eval-body">
            <p>Chain-of-Thought reasoning evaluation for multimodal tasks. Both Multimodal CoT RAG and Multimodal CoT Vanilla GPT4o achieve identical performance with 59% accuracy and 0.74 F1-score, demonstrating comparable reasoning capabilities.</p>
          </div>
        </div>
        <figure class="arxiv-img-card arxiv-clickable-img">
          <img 
            v-lazy="multiModalCotImage" 
            alt="Multimodal CoT Evaluation Results"
            @click="openImageModal(multiModalCotImage, 'Figure 8. Evaluation metrics for multimodal CoT. RAG and Vanilla GPT')"
          >
          <figcaption>Figure 8. Multimodal CoT Evaluation Results</figcaption>
        </figure>
      </div>
    </section>

    <!-- Tech stack -->
    <section>
      <h2>Tech Stack</h2>
      <ul class="arxiv-chips">
        <li>Streamlit</li>
        <li>OpenAI GPT</li>
        <li>LlamaParse</li>
        <li>FAISS</li>
        <li>Python</li>
        <li>arXiv API</li>
        <li>Vector Embeddings</li>
        <li>RAG</li>
        <li>PDF Processing</li>
        <li>Semantic Search</li>
      </ul>
    </section>
    </section>

    <!-- Image Modal -->
    <div 
      v-if="showImageModal" 
      class="image-modal"
      @click="closeImageModal"
    >
      <div class="image-modal-content">
        <button class="modal-close-btn" @click="closeImageModal" aria-label="Close">
          <i class="bi bi-x-lg"></i>
        </button>
        <img v-lazy="modalImageSrc" :alt="modalImageCaption">
        <p v-if="modalImageCaption" class="modal-caption">{{ modalImageCaption }}</p>
      </div>
    </div>
    </main>

    <FooterComponent />
  </div>
</template>

<script>
import { gsap } from 'gsap';
import NavBar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';

export default {
  name: "ArxivCopilot",
  components: {
    NavBar,
    FooterComponent
  },
  data() {
    return {
      pdfPipelineImage: 'https://images.chris-luo.me/PublicImg/arXiv/pdf_pipeline.png',
      vectorSearchImage: 'https://images.chris-luo.me/PublicImg/arXiv/vectorsearch.png',
      multiModalImage: 'https://images.chris-luo.me/PublicImg/arXiv/multi_modal.jpg',
      multiModalCotImage: 'https://images.chris-luo.me/PublicImg/arXiv/multi_modal_CoT.jpg',
      textOnlyImage: 'https://images.chris-luo.me/PublicImg/arXiv/text_only.jpg',
      arXivRagImage: 'https://images.chris-luo.me/PublicImg/arXiv/arXiv_rag.jpg',
      showImageModal: false,
      modalImageSrc: '',
      modalImageCaption: '',
      iframeLoading: true,
      spinnerAnimations: [] // 存储动画实例以便清理
    };
  },
  watch: {
    iframeLoading(newVal) {
      if (newVal) {
        // 当 iframeLoading 变为 true 时，初始化动画
        this.$nextTick(() => {
          this.initLoadingSpinner();
        });
      }
    }
  },
  mounted() {
    // Optional: basic scroll-to-top on route enter
    window.scrollTo({ top: 0, behavior: "smooth" });
    
    // 初始化 GSAP loading spinner 动画
    this.initLoadingSpinner();
  },
  methods: {
    openImageModal(imageSrc, caption = '') {
      this.modalImageSrc = imageSrc;
      this.modalImageCaption = caption;
      this.showImageModal = true;
      // 防止背景滾動
      document.body.style.overflow = 'hidden';
    },
    closeImageModal() {
      this.showImageModal = false;
      this.modalImageSrc = '';
      this.modalImageCaption = '';
      // 恢復背景滾動
      document.body.style.overflow = '';
    },
    onIframeLoad() {
      // iframe 載入完成後隱藏 loading spinner
      this.animateLoadingOut(() => {
        this.iframeLoading = false;
      });
    },
    initLoadingSpinner() {
      this.$nextTick(() => {
        if (this.$refs.iframeLoadingRef && this.iframeLoading) {
          const spinnerRings = this.$refs.iframeLoadingRef.querySelectorAll('.spinner-ring');
          const loadingText = this.$refs.loadingTextRef;
          
          // 清理之前的动画
          this.spinnerAnimations.forEach(anim => anim.kill());
          this.spinnerAnimations = [];
          
          if (spinnerRings.length > 0) {
            // 设置初始状态
            gsap.set(spinnerRings, {
              rotation: 0,
              scale: 0.8,
              opacity: 0.6
            });
            
            // 创建旋转动画
            spinnerRings.forEach((ring, index) => {
              const rotateAnim = gsap.to(ring, {
                rotation: 360,
                duration: 1.5 + index * 0.3,
                repeat: -1,
                ease: 'none'
              });
              
              // 添加脉冲效果
              const pulseAnim = gsap.to(ring, {
                scale: 1.1,
                opacity: 1,
                duration: 0.8,
                repeat: -1,
                yoyo: true,
                ease: 'power2.inOut',
                delay: index * 0.2
              });
              
              this.spinnerAnimations.push(rotateAnim, pulseAnim);
            });
          }
          
          // 文字淡入淡出动画
          if (loadingText) {
            const textFadeIn = gsap.fromTo(loadingText,
              {
                opacity: 0,
                y: 10
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                delay: 0.3
              }
            );
            
            // 文字脉冲效果
            const textPulse = gsap.to(loadingText, {
              opacity: 0.7,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: 'power1.inOut'
            });
            
            this.spinnerAnimations.push(textFadeIn, textPulse);
          }
        }
      });
    },
    animateLoadingOut(callback) {
      if (this.$refs.iframeLoadingRef) {
        const spinnerRings = this.$refs.iframeLoadingRef.querySelectorAll('.spinner-ring');
        const loadingText = this.$refs.loadingTextRef;
        
        const tl = gsap.timeline({
          onComplete: callback
        });
        
        // 先淡出文字
        if (loadingText) {
          tl.to(loadingText, {
            opacity: 0,
            y: -10,
            duration: 0.3,
            ease: 'power2.in'
          });
        }
        
        // 然后淡出 spinner 并缩放
        if (spinnerRings.length > 0) {
          tl.to(spinnerRings, {
            opacity: 0,
            scale: 0.5,
            rotation: '+=180',
            duration: 0.4,
            stagger: 0.05,
            ease: 'power2.in'
          }, '-=0.1');
        }
        
        // 最后淡出整个容器
        tl.to(this.$refs.iframeLoadingRef, {
          opacity: 0,
          duration: 0.2,
          ease: 'power2.in'
        });
      } else {
        if (callback) callback();
      }
    }
  },
  beforeUnmount() {
    // 確保離開頁面時恢復滾動
    document.body.style.overflow = '';
    
    // 清理所有 GSAP 动画
    this.spinnerAnimations.forEach(anim => anim.kill());
    this.spinnerAnimations = [];
  }
};
</script>
