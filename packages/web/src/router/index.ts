import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/todos/index.vue'

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
      component: () => import('../views/todos/_todoId.vue')
    },
    {
      path: '/tags',
      name: 'tags',
      component: () => import('../views/tags/index.vue')
    },
    {
      path: '/tags/:tagId',
      name: 'tag',
      component: () => import('../views/tags/_tagId.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/projects/index.vue')
    },
    {
      path: '/projects/:projectId',
      name: 'project',
      component: () => import('../views/projects/_projectId.vue')
    },
    {
      path: '/contexts',
      name: 'contexts',
      component: () => import('../views/contexts/index.vue')
    },
    {
      path: '/contexts/:contextId',
      name: 'context',
      component: () => import('../views/contexts/_contextId.vue')
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
