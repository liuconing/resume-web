<script setup lang="ts">
import { loginUsecase, type LoginUsecaseDto } from '@/domain/usecase'
import { Button } from '@/components'
import { useFundingDialogs, useMutation } from '@/hooks'
import { LoginDialog, RegisterDialog } from './components'

const { openDialog } = useFundingDialogs()

const { mutate: loginMutation } = useMutation(loginUsecase)

const handelLogin = async (data: LoginUsecaseDto) => {
  await loginMutation(data)
}

const handelRegister = async () => {
  await new Promise((r) => setTimeout(r, 600))
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
      <article
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
      >
        <div
          class="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5.5 w-5.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
            />
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
        </div>
        <h3 class="mb-2 text-lg font-bold text-slate-900">策略化放貸</h3>
        <p class="text-[0.9375rem] leading-relaxed text-slate-500">
          可設定資金幣種、最小放貸金額、利率與期數，讓機器人持續運行。
        </p>
      </article>
      <article
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
      >
        <div
          class="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5.5 w-5.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
            />
          </svg>
        </div>
        <h3 class="mb-2 text-lg font-bold text-slate-900">即時市場行情</h3>
        <p class="text-[0.9375rem] leading-relaxed text-slate-500">
          快速檢視各市場參考利率，掌握不同幣種資金投放機會。
        </p>
      </article>
      <article
        class="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(15,23,42,0.1)]"
      >
        <div
          class="mb-4 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500"
          aria-hidden="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="h-5.5 w-5.5"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
            />
          </svg>
        </div>
        <h3 class="mb-2 text-lg font-bold text-slate-900">可視化資產報表</h3>
        <p class="text-[0.9375rem] leading-relaxed text-slate-500">
          在管理頁查看總資產、閒置資金與利息收入，清楚掌握營運成效。
        </p>
      </article>
    </section>

    <LoginDialog :onSubmit="handelLogin" />
    <RegisterDialog :onSubmit="handelRegister" />
  </div>
</template>
