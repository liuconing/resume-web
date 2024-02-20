import { createRouter, createWebHistory } from 'vue-router'
import IndexView from '@/views/index/IndexView.vue'
import AirQualityView from '@/views/AirQuality/AirQualityView.vue'

export const createAppRouter = () => {
  const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: '/',
        name: 'home',
        component: IndexView
      },
      {
        path: '/airQuality',
        name: 'AirQuality',
        component: AirQualityView
      }
    ]
  })
  return router
}
