import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user';
import HomeView from '../views/HomeView.vue'
import NotesView from '../views/NotesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useUserStore()

  if (to.name !== 'home' && !store.getUserToken) next({ name: 'home' })
  else next()
})

export default router
