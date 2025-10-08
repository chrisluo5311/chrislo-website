import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PostView from '../views/PostView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/posts',
    name: 'posts',
    component: PostView
  },
  { 
    // temporary fallback
    path: '/:pathMatch(.*)*', 
    name: 'not-found', 
    component: HomeView 
  } 
]

const router = createRouter({
  // 預設值是 /(根路徑)
  history: createWebHistory(process.env.BASE_URL),
  routes,
  // 路由切換時的滾動行為
  scrollBehavior(to, from, savedPosition) {
    // 如果有保存的位置（例如使用瀏覽器的上一頁/下一頁按鈕）
    if (savedPosition) {
      return savedPosition
    } else {
      // 否則滾動到頁面頂部
      return { top: 0, behavior: 'smooth' }
    }
  }
})

export default router
