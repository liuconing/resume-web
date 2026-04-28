import { createRouter, createWebHistory } from 'vue-router'
import { HomeView } from '@/views/home'
import { FortuneView } from '@/views/fortune'
import { AirQualityView } from '@/views/air-quality'
import { FundingOverviewView } from '@/views/funding-overview'
import { FundingLayout } from '@/views/funding'
import { FundingHomeView } from '@/views/funding/home'
import { FundingBotSettingView } from '@/views/funding/bot-setting'
import { FundingMarketView } from '@/views/funding/market'
import { FundingLoansView } from '@/views/funding/loans'

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
      children: [
        { path: '/funding/home', component: FundingHomeView },
        { path: '/funding/bot-settings', component: FundingBotSettingView },
        { path: '/funding/market', component: FundingMarketView },
        { path: '/funding/loans', component: FundingLoansView },
      ],
    },
  ],
})

export default router
