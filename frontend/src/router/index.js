import { createRouter, createWebHistory } from 'vue-router'
import RegisterView from '../views/RegisterView.vue'
import ParticipantsView from '../views/ParticipantsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'register', component: RegisterView },
    { path: '/participants', name: 'participants', component: ParticipantsView }
  ]
})

export default router