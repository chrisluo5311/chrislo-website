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
  routes
})

export default router
