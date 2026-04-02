<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  loginUsecase,
  registerUsecase,
  type LoginUsecaseDto,
} from '@/domain/usecase'
import type { RegisterReq } from '@/domain/repository'
import { Button } from '@/components'
import { useFundingDialogs, useMutation } from '@/hooks'
import {
  FundingOverviewFeatureCard,
  type FundingFeatureIcon,
  LoginDialog,
  RegisterDialog,
} from './components'

const { openDialog } = useFundingDialogs()
const router = useRouter()

const { mutate: loginMutation } = useMutation(loginUsecase)
const { mutate: registerMutation } = useMutation(registerUsecase)

const featureCards: {
  title: string
  description: string
  icon: FundingFeatureIcon
}[] = [
  {
    title: '策略化放貸',
    description: '可設定資金幣種、最小放貸金額、利率與期數，讓機器人持續運行。',
    icon: 'strategy',
  },
  {
    title: '即時市場行情',
    description: '快速檢視各市場參考利率，掌握不同幣種資金投放機會。',
    icon: 'market',
  },
  {
    title: '可視化資產報表',
    description: '在管理頁查看總資產、閒置資金與利息收入，清楚掌握營運成效。',
    icon: 'report',
  },
]

const handleLogin = async (data: LoginUsecaseDto) => {
  await loginMutation(data)
  await router.push('/funding')
}

const handleRegister = async (data: RegisterReq) => {
  await registerMutation(data)
}
</script>

<template>
  <div class="relative min-h-screen overflow-hidden px-5 pb-16 pt-10">
    <div
      class="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(99,102,241,0.18),transparent),radial-gradient(ellipse_60%_40%_at_100%_50%,rgba(14,165,233,0.12),transparent),linear-gradient(180deg,#f8fafc_0%,#f1f5f9_100%)]"
      aria-hidden="true"
    />

    <section class="relative z-10 mx-auto max-w-6xl pb-12 text-center">
      <p
        class="mb-4 inline-block rounded-full bg-indigo-500/12 px-3.5 py-1.5 text-xs font-semibold tracking-wider text-indigo-700"
      >
        DeFi · 自動化
      </p>
      <h1 class="mb-4 text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-slate-900">
        智能放貸機器人
      </h1>
      <p class="mx-auto mb-8 max-w-xl text-[1.0625rem] leading-relaxed text-slate-600">
        以自動化策略管理資金配置，追蹤市場利率與放貸績效，協助你在不同幣種市場中提升資金使用效率。
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <Button variant="primary" @click="openDialog('login')">登入</Button>
        <Button variant="secondary" @click="openDialog('register')">註冊</Button>
      </div>
    </section>

    <section
      class="relative z-10 mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3"
    >
      <FundingOverviewFeatureCard
        v-for="card in featureCards"
        :key="card.title"
        :title="card.title"
        :description="card.description"
        :icon="card.icon"
      />
    </section>

    <LoginDialog :onSubmit="handleLogin" />
    <RegisterDialog :onSubmit="handleRegister" />
  </div>
</template>
