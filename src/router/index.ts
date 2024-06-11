import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/views/pages/HomePage.vue'),
    },
    {
      path: '/about/:id',
      name: 'About',
      component: () => import('@/views/pages/AboutPage.vue'),
    },
  ],
})

export default router
