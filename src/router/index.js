import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/socialPage',
      name: 'socialPage',
      component: () => import('../views/SocialPage.vue')
    },
    {
      path: '/registerPage',
      name: 'registerPage',
      component: () => import('../views/RegisterPage.vue')
    },
  ]
})

export default router
