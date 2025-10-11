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

    <!-- Sticky Back to Home Button -->
    <RouterLink class="btn-back-home" to="/" title="Back to Home">
      <i class="bi bi-house-fill"></i>
      <span class="btn-text">Back to Home</span>
    </RouterLink>

    <!-- Two Column Layout -->
    <div class="row g-4">
      <!-- Main Content - Articles (col-8) -->
      <div class="col-lg-8">
        <!-- Posts Section Header -->
        <div class="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4" v-reveal>
          <h2 class="section-title mb-0">
            {{ filteredTitle }}
            <span class="text-muted" style="font-size: 0.875rem; font-weight: normal;">
              ({{ filteredPosts.length }} articles)
            </span>
          </h2>
          
          <!-- Sort Filter -->
          <div class="sort-filter">
            <label class="sort-label">
              <i class="bi bi-sort-down"></i>
              Sort by Date:
            </label>
            <select 
              v-model="sortOrder" 
              class="sort-select"
              @change="handleSortChange"
            >
              <option value="newest">Descending</option>
              <option value="oldest">Ascending</option>
            </select>
          </div>
        </div>

        <!-- Articles Grid -->
        <div class="row g-4 mb-4">
          <div
            v-for="post in paginatedPosts"
            :key="post.title"
            class="col-md-6"
            v-reveal="{ animation: 'fade-up', duration: 600, delay: 50 }"
          >
            <div class="card h-100">
              <img :src="post.image" class="card-img-top" :alt="post.title" />
              <div class="card-body d-flex flex-column">
                <div class="mb-2">
                  <span class="badge bg-category">{{ post.category }}</span>
                </div>
                <h5 class="card-title">{{ post.title }}</h5>
                <p class="card-text snippet-text flex-grow-1">{{ post.snippet }}</p>
                <div class="tags-container mb-3">
                  <span v-for="tag in post.tags" :key="tag" class="badge bg-tag">
                    {{ tag }}
                  </span>
                </div>
                <p class="card-text">
                  <small class="text-muted">Last updated: {{ post.lastUpdated }}</small>
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

        <!-- No Results Message -->
        <div v-if="filteredPosts.length === 0" class="no-results" v-reveal>
          <i class="bi bi-search"></i>
          <h4>No articles found</h4>
          <p>Try adjusting your search or filter criteria</p>
        </div>

        <!-- Pagination -->
        <PaginationComponent
          v-if="filteredPosts.length > 0"
          :current-page="currentPage"
          :total-pages="totalPages"
          @page-change="handlePageChange"
        />
      </div>

      <!-- Sidebar - Widgets (col-4) -->
      <div class="col-lg-4">
        <div class="sidebar-sticky">
          <!-- Search Widget -->
          <SearchArticle @search="handleSearch" />

          <!-- Category Widget -->
          <CategoryWidget
            :categories="categoryStats"
            :selected-category="selectedCategory"
            @select-category="handleCategorySelect"
          />

          <!-- Tags Widget -->
          <TagsWidget
            :tags="tagStats"
            :selected-tag="selectedTag"
            @select-tag="handleTagSelect"
          />

          <!-- Archives Widget -->
          <ArchivesWidget
            :archives="archiveStats"
            :selected-archive="selectedArchive"
            @select-archive="handleArchiveSelect"
          />
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
import SearchArticle from '@/components/SearchArticle.vue';
import CategoryWidget from '@/components/CategoryWidget.vue';
import TagsWidget from '@/components/TagsWidget.vue';
import ArchivesWidget from '@/components/ArchivesWidget.vue';
import PaginationComponent from '@/components/PaginationComponent.vue';

const posts = postsData;
const selectedPost = ref(null);
const postModal = ref(null);
const modalId = 'postsModalPage';
const modalLabelId = 'postsModalPageLabel';
let postModalInstance = null;

// Filter states
const searchQuery = ref('');
const selectedCategory = ref(null);
const selectedTag = ref(null);
const selectedArchive = ref(null);
const sortOrder = ref('newest'); // 'newest' or 'oldest'

// Pagination states
const currentPage = ref(1);
const postsPerPage = 6;

// Computed: Category statistics
const categoryStats = computed(() => {
  const stats = {};
  posts.forEach(post => {
    if (post.category) {
      stats[post.category] = (stats[post.category] || 0) + 1;
    }
  });
  return stats;
});

// Computed: Tag statistics
const tagStats = computed(() => {
  const stats = {};
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => {
        stats[tag] = (stats[tag] || 0) + 1;
      });
    }
  });
  // Sort tags by count (descending)
  return Object.fromEntries(
    Object.entries(stats).sort((a, b) => b[1] - a[1])
  );
});

// Computed: Archive statistics (by year)
const archiveStats = computed(() => {
  const stats = {};
  posts.forEach(post => {
    if (post.lastUpdated) {
      const date = new Date(post.lastUpdated);
      const year = date.getFullYear().toString();
      stats[year] = (stats[year] || 0) + 1;
    }
  });
  // Sort archives by year (descending - newest first)
  return Object.fromEntries(
    Object.entries(stats).sort((a, b) => b[0] - a[0])
  );
});

// Computed: Filtered posts
const filteredPosts = computed(() => {
  let result = [...posts];

  // Apply search filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.snippet.toLowerCase().includes(query) ||
      post.tags?.some(tag => tag.toLowerCase().includes(query))
    );
  }

  // Apply category filter
  if (selectedCategory.value) {
    result = result.filter(post => post.category === selectedCategory.value);
  }

  // Apply tag filter
  if (selectedTag.value) {
    result = result.filter(post => post.tags?.includes(selectedTag.value));
  }

  // Apply archive filter
  if (selectedArchive.value) {
    result = result.filter(post => {
      if (post.lastUpdated) {
        const date = new Date(post.lastUpdated);
        const year = date.getFullYear().toString();
        return year === selectedArchive.value;
      }
      return false;
    });
  }

  // Apply sort order
  result.sort((a, b) => {
    const dateA = new Date(a.lastUpdated);
    const dateB = new Date(b.lastUpdated);
    
    if (sortOrder.value === 'newest') {
      return dateB - dateA; // Newest first
    } else {
      return dateA - dateB; // Oldest first
    }
  });

  return result;
});

// Computed: Filtered title
const filteredTitle = computed(() => {
  if (selectedCategory.value) {
    return `${selectedCategory.value} Articles`;
  }
  if (selectedTag.value) {
    return `Articles tagged with "${selectedTag.value}"`;
  }
  if (selectedArchive.value) {
    return `Articles from ${selectedArchive.value}`;
  }
  if (searchQuery.value) {
    return `Search Results for "${searchQuery.value}"`;
  }
  return 'All Articles';
});

// Computed: Total pages
const totalPages = computed(() => {
  return Math.ceil(filteredPosts.value.length / postsPerPage);
});

// Computed: Paginated posts
const paginatedPosts = computed(() => {
  const start = (currentPage.value - 1) * postsPerPage;
  const end = start + postsPerPage;
  return filteredPosts.value.slice(start, end);
});

// Computed: Rendered markdown
const renderedMarkdown = computed(() => {
  if (!selectedPost.value?.markdown) return '';
  return renderMarkdown(selectedPost.value.markdown);
});

// Handle search
function handleSearch(query) {
  searchQuery.value = query;
  currentPage.value = 1; // Reset to first page
}

// Handle category selection
function handleCategorySelect(category) {
  selectedCategory.value = category;
  currentPage.value = 1; // Reset to first page
}

// Handle tag selection
function handleTagSelect(tag) {
  selectedTag.value = tag;
  currentPage.value = 1; // Reset to first page
}

// Handle archive selection
function handleArchiveSelect(archive) {
  selectedArchive.value = archive;
  currentPage.value = 1; // Reset to first page
}

// Handle page change
function handlePageChange(page) {
  currentPage.value = page;
}

// Handle sort change
function handleSortChange() {
  currentPage.value = 1; // Reset to first page when sort order changes
}

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
