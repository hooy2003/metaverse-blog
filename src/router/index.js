import { createRouter, createWebHistory } from 'vue-router'

import Index from '../views/Index.vue'
import Page from '../views/Page.vue'
import Header from '../components/Header.vue';

const routes = [
  {
    path: '/',
    name: 'Index',
    components: {
      default: Index,
      header: Header
    }
  },
  {
    path: '/page',
    name: 'Page',
    components: {
      default: Page,
      header: Header
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
