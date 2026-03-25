import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '@/views/Home'
import { FortuneView } from '@/views/Fortune'
import { AirQualityView } from '@/views/AirQuality'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/fortune',
      name: 'fortune',
      component: FortuneView,
    },
    {
      path: '/airQuality',
      name: 'airQuality',
      component: AirQualityView,
    },
  ],
})

export default router
