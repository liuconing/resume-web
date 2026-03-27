import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '@/views/home'
import { FortuneView } from '@/views/fortune'
import { AirQualityView } from '@/views/air-quality'
import { FundingOverviewView } from '@/views/funding-overview'
import { FundingLayout } from '@/views/funding'
import { FundingHomeView } from '@/views/funding/home'

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
      path: '/funding-overview',
      name: 'fundingOverview',
      component: FundingOverviewView,
    },
    {
      path: '/funding',
      component: FundingLayout,
      children: [{ path: '/funding/home', component: FundingHomeView }],
    },
  ],
})

export default router
