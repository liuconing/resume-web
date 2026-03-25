import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '@/views/Home'
import { FortuneView } from '@/views/Fortune'
import { AirQualityView } from '@/views/AirQuality'
import { FundingView } from '@/views/Funding'

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
    {
      path: '/funding',
      name: 'funding',
      component: FundingView,
      children: [
        // {
        //   path: '/funding/list',
        //   name: 'fundingList',
        //   component: FundingListView,
        // },
      ],
    },
  ],
})

export default router
