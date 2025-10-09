<template>
  <div class="category-widget mb-4">
    <h5 class="widget-title">Categories</h5>
    <ul class="category-list">
      <li
        v-for="(count, category) in categories"
        :key="category"
        class="category-item"
        :class="{ active: selectedCategory === category }"
        @click="handleCategoryClick(category)"
      >
        <span class="category-name">{{ category }}</span>
        <span class="category-count">{{ count }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
const props = defineProps({
  categories: {
    type: Object,
    required: true
  },
  selectedCategory: {
    type: String,
    default: null
  }
});

const emit = defineEmits(['select-category']);

function handleCategoryClick(category) {
  // 如果點擊的是已選中的分類，則取消選擇
  if (props.selectedCategory === category) {
    emit('select-category', null);
  } else {
    emit('select-category', category);
  }
}
</script>

<style scoped lang="scss">
.category-widget {
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

  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;

    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.875rem 1.125rem;
      margin-bottom: 0.625rem;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f5 100%);
      border: 1px solid transparent;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 3px;
        background: var(--egg-yellow);
        transform: scaleY(0);
        transition: transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      }

      &:hover {
        background: linear-gradient(135deg, #e9ecef 0%, #dee2e6 100%);
        border-color: rgba(0, 0, 0, 0.08);
        transform: translateX(4px);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);

        &::before {
          transform: scaleY(1);
        }

        .category-count {
          transform: scale(1.05);
        }
      }

      &.active {
        background: linear-gradient(135deg, var(--egg-yellow) 0%, #ffd93d 100%);
        color: var(--dark);
        font-weight: 600;
        border-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 4px 12px rgba(255, 215, 0, 0.25);
        transform: translateX(0);

        &::before {
          transform: scaleY(1);
          width: 4px;
          background: var(--dark);
        }

        .category-name {
          letter-spacing: 0.01em;
        }

        .category-count {
          background: var(--dark);
          color: var(--egg-yellow);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          transform: scale(1);
        }
      }

      &:last-child {
        margin-bottom: 0;
      }

      .category-name {
        flex: 1;
        font-size: 0.9375rem;
        font-weight: 500;
        transition: all 0.25s ease;
      }

      .category-count {
        background: linear-gradient(135deg, #dee2e6 0%, #ced4da 100%);
        color: #495057;
        padding: 0.375rem 0.625rem;
        border-radius: 20px;
        font-size: 0.8125rem;
        font-weight: 700;
        min-width: 32px;
        text-align: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
        letter-spacing: 0.02em;
      }
    }
  }
}
</style>
