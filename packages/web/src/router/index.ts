import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/todos/:todoId',
      name: 'todo',
      component: () => import('../views/_todo.vue')
    },
    {
      path: '/projects/:projectId',
      name: 'project',
      component: () => import('../views/_project.vue')
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
