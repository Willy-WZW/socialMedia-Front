import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../views/LogInPage.vue'

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
      path: '/signInPage',
      name: 'signInPage',
      component: () => import('../views/SignInPage.vue')
    },
  ]
})

export default router
