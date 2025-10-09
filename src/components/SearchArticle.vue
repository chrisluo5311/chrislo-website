<template>
  <div class="search-article-widget mb-4">
    <h5 class="widget-title">Search Articles</h5>
    <div class="search-container">
      <input
        v-model="searchQuery"
        type="text"
        class="form-control search-input"
        placeholder="Search articles..."
        @input="$emit('search', searchQuery)"
      />
      <i class="bi bi-search search-icon"></i>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const searchQuery = ref('');

defineEmits(['search']);
</script>

<style scoped lang="scss">
.search-article-widget {
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  }

  .widget-title {
    font-weight: 700;
    font-size: 1.125rem;
    margin-bottom: 1rem;
    color: #1a1a1a;
  }

  .search-container {
    position: relative;

    .search-input {
      padding-right: 2.5rem;
      border: 2px solid #e9ecef;
      border-radius: 8px;
      transition: all 0.3s ease;

      &:focus {
        border-color: var(--egg-yellow);
        box-shadow: 0 0 0 0.2rem rgba(255, 220, 100, 0.25);
      }
    }

    .search-icon {
      position: absolute;
      right: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #6c757d;
      pointer-events: none;
    }
  }
}
</style>
