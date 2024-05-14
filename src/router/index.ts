import { createRouter, createWebHashHistory } from 'vue-router'
import IndexView from '@/views/index/IndexView.vue'
import AirQualityView from '@/views/AirQuality/AirQualityView.vue'
import FriendlyRestaurantView from '@/views/FriendlyRestaurant/FriendlyRestaurantView.vue'
import FortuneView from '@/views/Fortune/FortuneView.vue'
import SolitaireView from '@/views/Solitaire/SolitaireView.vue'

export const createAppRouter = () => {
  const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
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
      },
      {
        path: '/friendlyrestaurant',
        name: 'FriendlyRestaurant',
        component: FriendlyRestaurantView
      },
      {
        path: '/fortune',
        name: 'Fortune',
        component: FortuneView
      },
      {
        path: '/solitaire',
        name: 'Solitaire',
        component: SolitaireView
      }
    ]
  })
  return router
}
