import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import URLReader from '../components/URLReader.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: URLReader
    },
    {
      path: '/baja/',
      name: 'baja',
      component: () => import('../views/Baja.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
