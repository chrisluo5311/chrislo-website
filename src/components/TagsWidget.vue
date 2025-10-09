<template>
  <div class="tags-widget mb-4">
    <h5 class="widget-title">Tags</h5>
    <div class="tags-container">
      <span
        v-for="(count, tag) in tags"
        :key="tag"
        class="tag-item"
        :class="{ active: selectedTag === tag }"
        @click="$emit('select-tag', selectedTag === tag ? null : tag)"
      >
        {{ tag }} <span class="tag-count">({{ count }})</span>
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  tags: {
    type: Object,
    required: true
  },
  selectedTag: {
    type: String,
    default: null
  }
});

defineEmits(['select-tag']);
</script>

<style scoped lang="scss">
.tags-widget {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  padding: 1.75rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  .widget-title {
    font-weight: 700;
    font-size: 1.25rem;
    margin-bottom: 1.25rem;
    color: #1a1a1a;
    position: relative;
    padding-bottom: 0.5rem;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 3px;
      background: linear-gradient(90deg, var(--egg-yellow), #ffd93d);
      border-radius: 2px;
    }
  }

  .tags-container {
    display: flex;
    flex-wrap: wrap;
    gap: 0.625rem;

    .tag-item {
      display: inline-flex;
      align-items: center;
      padding: 0.5rem 1.125rem;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      color: #495057;
      border-radius: 24px;
      font-size: 0.875rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
      border: 1.5px solid transparent;
      position: relative;
      overflow: hidden;
      letter-spacing: 0.3px;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
        transition: left 0.5s ease;
      }

      &:hover {
        background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
        transform: translateY(-3px) scale(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
        border-color: rgba(0, 0, 0, 0.1);

        &::before {
          left: 100%;
        }
      }

      &.active {
        background: linear-gradient(135deg, var(--egg-yellow) 0%, #ffd93d 100%);
        color: #1a1a1a;
        font-weight: 600;
        border-color: rgba(0, 0, 0, 0.15);
        box-shadow: 0 4px 15px rgba(255, 199, 0, 0.3);
        transform: translateY(-2px);

        &:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 6px 20px rgba(255, 199, 0, 0.4);
        }
      }

      .tag-count {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        margin-left: 0.375rem;
        padding: 0.125rem 0.5rem;
        background: rgba(0, 0, 0, 0.08);
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 700;
        min-width: 24px;
        transition: all 0.2s ease;
      }

      &.active .tag-count {
        background: rgba(0, 0, 0, 0.12);
        color: #1a1a1a;
      }

      &:hover .tag-count {
        transform: scale(1.1);
        background: rgba(0, 0, 0, 0.12);
      }
    }
  }
}

// 響應式設計
@media (max-width: 768px) {
  .tags-widget {
    padding: 1.25rem;

    .widget-title {
      font-size: 1.125rem;
    }

    .tags-container {
      gap: 0.5rem;

      .tag-item {
        padding: 0.4rem 0.875rem;
        font-size: 0.8125rem;
      }
    }
  }
}
</style>
