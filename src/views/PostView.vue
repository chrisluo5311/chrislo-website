<template>
  <NavBar />
  
  <main class="container posts-main">
    <!-- Hero Banner Section -->
    <div class="hero-banner-posts p-4 p-md-5 mb-4 text-white rounded bg-dark" v-reveal>
      <div class="col-md-6 px-0">
        <h1 class="display-4 fst-italic">Technical articles and notes</h1>
        <p class="lead my-3">
          Here I share my learning experiences, technical research, and development experiences. From front-end development to AI development, I record every step of my growth.
        </p>
      </div>
    </div>

    <!-- Posts Section -->
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-5" v-reveal>
      <h2 class="section-title mb-0">All Articles</h2>
      <RouterLink class="btn btn-outline-egg rounded-pill px-4 px-lg-5" to="/">
        Back to Home
      </RouterLink>
    </div>

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
              <small class="text-muted">Last updated: {{ post.lastUpdated }}</small>
            </p>
            <button
              type="button"
              class="btn btn-read-more mt-auto align-self-start"
              @click="openPost(post)"
            >
              Read More
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="modal fade"
      :id="modalId"
      tabindex="-1"
      :aria-labelledby="modalLabelId"
      aria-hidden="true"
      ref="postModal"
    >
      <div class="modal-dialog modal-lg modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" :id="modalLabelId">{{ selectedPost?.title }}</h5>
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
            <small class="text-muted me-auto" v-if="selectedPost?.lastUpdated">Last updated：{{ selectedPost.lastUpdated }}</small>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </main>

  <FooterComponent />
</template>

<script setup>
import { computed, nextTick, onMounted, ref } from 'vue';
import * as bootstrap from 'bootstrap';
import postsData from '@/data/posts';
import { renderMarkdown } from '@/utils/markdown';
import NavBar from '@/components/NavBar.vue';
import FooterComponent from '@/components/FooterComponent.vue';

const posts = postsData;
const selectedPost = ref(null);
const postModal = ref(null);
const modalId = 'postsModalPage';
const modalLabelId = 'postsModalPageLabel';
let postModalInstance = null;

const renderedMarkdown = computed(() => {
  if (!selectedPost.value?.markdown) return '';
  return renderMarkdown(selectedPost.value.markdown);
});

async function openPost(post) {
  selectedPost.value = post;
  if (!postModalInstance && postModal.value) {
    postModalInstance = new bootstrap.Modal(postModal.value, { backdrop: true });
  }

  if (!postModalInstance) {
    await nextTick();
    if (!postModalInstance && postModal.value) {
      postModalInstance = new bootstrap.Modal(postModal.value, { backdrop: true });
    }
  }

  postModalInstance?.show();
}

onMounted(() => {
  document.title = 'Posts | JI DUNG LO';
});
</script>
