<template>
  <nav aria-label="Page navigation" class="pagination-wrapper">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">
          <i class="bi bi-chevron-left"></i>
        </a>
      </li>
      
      <li
        v-for="page in displayPages"
        :key="page"
        class="page-item"
        :class="{ active: currentPage === page, disabled: page === '...' }"
      >
        <a
          class="page-link"
          href="#"
          @click.prevent="page !== '...' && changePage(page)"
        >
          {{ page }}
        </a>
      </li>
      
      <li class="page-item" :class="{ disabled: currentPage === totalPages }">
        <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">
          <i class="bi bi-chevron-right"></i>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  }
});

const emit = defineEmits(['page-change']);

const displayPages = computed(() => {
  const pages = [];
  const total = props.totalPages;
  const current = props.currentPage;

  if (total <= 7) {
    // 如果總頁數小於等於 7，顯示所有頁碼
    for (let i = 1; i <= total; i++) {
      pages.push(i);
    }
  } else {
    // 總是顯示第一頁
    pages.push(1);

    if (current > 3) {
      pages.push('...');
    }

    // 顯示當前頁面附近的頁碼
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (current < total - 2) {
      pages.push('...');
    }

    // 總是顯示最後一頁
    pages.push(total);
  }

  return pages;
});

function changePage(page) {
  if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
    emit('page-change', page);
    // 滾動到頁面頂部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
</script>

<style scoped lang="scss">
.pagination-wrapper {
  margin-top: 3rem;
  margin-bottom: 2rem;

  .pagination {
    .page-item {
      margin: 0 0.25rem;

      &.disabled .page-link {
        cursor: not-allowed;
        opacity: 0.5;
      }

      &.active .page-link {
        background-color: var(--egg-yellow);
        border-color: var(--egg-yellow);
        color: var(--dark);
        font-weight: 700;
        box-shadow: 0 2px 8px rgba(255, 220, 100, 0.4);
      }

      .page-link {
        color: #495057;
        border: 2px solid #dee2e6;
        border-radius: 8px;
        padding: 0.5rem 0.75rem;
        transition: all 0.3s ease;
        font-weight: 600;
        min-width: 40px;
        text-align: center;

        &:hover:not(.disabled) {
          background-color: #f8f9fa;
          border-color: var(--egg-yellow);
          color: var(--dark);
          transform: translateY(-2px);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        &:focus {
          box-shadow: 0 0 0 0.2rem rgba(255, 220, 100, 0.25);
        }

        i {
          font-size: 0.875rem;
        }
      }
    }
  }
}

@media (max-width: 576px) {
  .pagination-wrapper {
    .pagination {
      .page-item {
        margin: 0 0.125rem;

        .page-link {
          padding: 0.375rem 0.5rem;
          font-size: 0.875rem;
          min-width: 35px;
        }
      }
    }
  }
}
</style>
