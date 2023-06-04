import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/todos/index.vue'

const router = createRouter({
  history: createWebHashHistory(),
  // history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:project(\\+\\S+)',
      name: 'project',
      component: () => import('../views/projects/_id.vue')
    },
    {
      path: '/:context(@\\S+)',
      name: 'context',
      component: () => import('../views/contexts/_id.vue')
    },
    {
      path: '/:priority(\\([A-Z]\\\\))',
      name: 'priority',
      component: () => import('../views/priorities/_id.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/about.vue')
    }
  ]
})

export default router
