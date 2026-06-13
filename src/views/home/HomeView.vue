<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed, markRaw } from 'vue'
import type { Links, WorkExperienceList } from './type'

const links = markRaw<Links[]>([
  {
    url: 'https://github.com/liuconing',
    svg: 'https://cdn.simpleicons.org/github/fff',
  },
  {
    url: 'https://www.linkedin.com/in/ellis-liu-0199a814a/',
    svg: 'https://cdn.simpleicons.org/inspire/fff',
  },
])
const workExperiences = markRaw<WorkExperienceList[]>([
  {
    companyName: '思偉達創新科技股份有限公司',
    position: 'Front-End Developer',
    duration: '2018年4月 - 2020年2月',
    responsibilities: [
      '建立乙太坊交易所和與智能合約串接製作區塊鏈相關產品。',
      '使用Vue / Nuxt.js製作區塊鏈相關網站。',
      '使用web3.js與各種生態鏈跟區塊鏈合約進行溝通與操作。',
    ],
    seniority: 1.5,
  },
  {
    companyName: '樹人科技有限公司',
    position: 'Front-End Developer',
    duration: '2020年3月 - 2021年4月',
    responsibilities: [
      '串接H5遊戲API並製作手機版本的入口網站。',
      '製作後台管理網站，針對使用者資料進行操作。',
      '使用nuxt.js製作SSR網站，具有SEO效果。',
    ],
    seniority: 1,
  },
  {
    companyName: '氪龍有限公司',
    position: 'Front-End Developer',
    duration: '2021年7月 - 2022年6月',
    responsibilities: [
      '使用React / Next.js製作區塊鏈網站。',
      '為前端團隊分享串接合約跟區塊鏈遇到的問題。',
      '使用ant-pro框架來管理相關後台類型網站。',
    ],
    seniority: 1,
  },
  {
    companyName: '拓荒資本股份有限公司',
    position: 'Front-End Developer',
    duration: '2022年7月 - 2024年3月',
    responsibilities: [
      '負責公司官方網站的架設、更新和維護，確保網站可用性和優秀用戶體驗。',
      '參與從零開始的React Native應用開發項目，與團隊成員成功上架區塊練錢包應用程式，實現了良好的市場反饋和用戶體驗。',
      '與團隊合作建立和優化敏捷開發流程，提高了項目交付效率和質量。',
    ],
    seniority: 2,
  },
  {
    companyName: '碼力科技有限公司',
    position: 'Front-End Developer',
    duration: '2024年7月 - 2026年1月',
    responsibilities: [
      '使用 React、React Native 與 Next.js 開發跨平台 Web 與 Mobile 應用，提升前端程式碼共用性與開發效率。',
      '協助團隊遊戲入口平台核心功能開發，完成會員註冊、登入驗證、個人資料管理與會員中心功能建置。',
      '建置儲值與會員帳務系統，串接後端交易 API，實現即時交易資訊與會員資料查詢功能。',
    ],
    seniority: 1.5,
  },
])

/** 履歷顯示為新到舊，不突變原陣列（避免 template 內 reverse() 重複改動資料）。 */
const workExperiencesNewestFirst = computed(() => [...workExperiences].reverse())
</script>

<template>
  <main class="home min-h-screen bg-[#0a0a0b] text-zinc-100">
    <section class="py-16 md:py-28">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <div class="reveal flex justify-center mb-10">
            <img
              class="size-20 rounded-full ring-1 ring-emerald-400/40 shadow-[0_0_30px_-8px] shadow-emerald-400/40"
              src="https://i.imgur.com/vTWoB7o.png"
              alt="劉文華（Ellis）"
            />
          </div>

          <p
            class="reveal font-mono text-xs md:text-sm tracking-[0.35em] uppercase text-emerald-400/80 mb-6"
            style="animation-delay: 80ms"
          >
            // 劉文華 · Ellis
          </p>

          <h1
            class="reveal font-semibold text-5xl md:text-8xl leading-[1.05] mb-8 bg-linear-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent"
            style="animation-delay: 160ms"
          >
            Front End Developer
          </h1>

          <p
            class="reveal w-full md:w-3/4 mx-auto font-normal text-zinc-400 text-base md:text-xl leading-relaxed mb-12"
            style="animation-delay: 240ms"
          >
            有相關前端實務4年多經驗，經常使用 React 做為開發前端工具，也有自我挑戰使用 Vue3
            做為開發前端工具，使用 Cursor 跟 Codex 輔助專案的開發、除錯、優化，並在使用人工 Review
            程式碼以免出錯。
          </p>
          <div class="reveal flex items-center justify-center" style="animation-delay: 320ms">
            <a
              v-for="item in links"
              :key="item.url"
              :href="item.url"
              target="_blank"
              class="mx-2 px-7 py-3 md:px-9 md:py-4 bg-white/3 border border-white/10 text-zinc-50 text-sm rounded-lg hover:border-emerald-400/50 hover:bg-emerald-400/10 transition duration-300"
            >
              <img class="size-6" :src="item.svg" :alt="item.url" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20">
      <div class="container mx-auto px-4">
        <p class="reveal font-mono text-xs tracking-[0.3em] uppercase text-emerald-400/80 mb-3">
          // skills
        </p>
        <h2 class="reveal font-semibold text-zinc-100 text-3xl md:text-4xl mb-10">專業技能</h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="reveal card">
            <h4 class="font-medium text-zinc-100 text-lg mb-4">
              <span class="text-emerald-400">#</span> 前端框架
            </h4>

            <ul class="font-normal text-zinc-400 text-sm leading-relaxed mb-1 list-disc pl-4">
              <li>熟練使用主流的前端框架（React、Vue3、React Native）</li>
              <li>
                熟悉 Vue3 Composition API 與 React Hooks、Context API、Redux
                等現代狀態管理與組件架構，具備 React
                路由（Router）、效能優化、SEO、無障礙設計（Accessibility）、國際化、測試、部署及監控等完整開發與最佳化經驗。
              </li>
            </ul>
          </div>

          <div class="reveal card" style="animation-delay: 60ms">
            <h4 class="font-medium text-zinc-100 text-lg mb-4">
              <span class="text-emerald-400">#</span> AI 輔助開發
            </h4>

            <ul class="font-normal text-zinc-400 text-sm leading-relaxed mb-1 list-disc pl-4">
              <li>使用 Cursor 手動針對程式碼進行優化、除錯、最佳化。</li>
              <li>使用 Codex 輔助撰寫程式碼。</li>
              <li>建立個人或公司的開發規範，限制AI的行為。</li>
            </ul>
          </div>

          <div class="reveal card" style="animation-delay: 120ms">
            <h4 class="font-medium text-zinc-100 text-lg mb-4">
              <span class="text-emerald-400">#</span> HTML
            </h4>

            <ul class="font-normal text-zinc-400 text-sm leading-relaxed mb-1 list-disc pl-4">
              <li>理解 HTML 的基本結構和語義。</li>
              <li>
                掌握使用 HTML5 新增的元素和屬性，如語義化標籤、表單輸入類型、影片和音樂元素等。
              </li>
            </ul>
          </div>

          <div class="reveal card" style="animation-delay: 180ms">
            <h4 class="font-medium text-zinc-100 text-lg mb-4">
              <span class="text-emerald-400">#</span> CSS
            </h4>

            <ul class="font-normal text-zinc-400 text-sm leading-relaxed mb-1 list-disc pl-4">
              <li>掌握基礎的 CSS，包括選擇器、盒模型、布局（如浮動、定位）、字體和顏色。</li>
              <li>熟悉 CSS3 的新特性，如動畫、過渡、變形、彈性盒子布局（Flexbox）等。</li>
              <li>響應式和自適應設計（Responsive Web Design）</li>
              <li>掌握 SCSS 預處理器</li>
            </ul>
          </div>

          <div class="reveal card" style="animation-delay: 240ms">
            <h4 class="font-medium text-zinc-100 text-lg mb-4">
              <span class="text-emerald-400">#</span> JavaScript
            </h4>

            <ul class="font-normal text-zinc-400 text-sm leading-relaxed mb-1 list-disc pl-4">
              <li>掌握 JavaScript 基礎，包括數據類型、控制結構、函數、對象和數組。</li>
              <li>理解事件處理、DOM 操作和異步編程（如 Promises、async/await）。</li>
              <li>熟悉 ECMAScript 的最新標準和特性。</li>
            </ul>
          </div>

          <div class="reveal card" style="animation-delay: 300ms">
            <h4 class="font-medium text-zinc-100 text-lg mb-4">
              <span class="text-emerald-400">#</span> GIT
            </h4>

            <ul class="font-normal text-zinc-400 text-sm leading-relaxed mb-1 list-disc pl-4">
              <li>理解版本控制的基本概念，熟練使用 Git 進行代碼管理和協作。</li>
              <li>熟悉 Git Flow 協作流程</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-20">
      <div class="container mx-auto px-4">
        <p class="reveal font-mono text-xs tracking-[0.3em] uppercase text-emerald-400/80 mb-3">
          // experience
        </p>
        <h2 class="reveal font-semibold text-zinc-100 text-3xl md:text-4xl mb-3">職務經歷</h2>

        <p class="reveal font-normal text-zinc-500 text-sm md:text-base mb-12">
          以下是我在各公司的職務經歷
        </p>

        <div class="flex flex-col gap-5">
          <div
            class="reveal card md:flex md:items-start md:gap-8"
            v-for="item in workExperiencesNewestFirst"
            :key="item.companyName"
          >
            <div class="md:w-56 md:shrink-0 mb-4 md:mb-0">
              <p class="font-mono text-xs text-emerald-400/80 mb-2">{{ item.duration }}</p>
              <p class="text-zinc-300 text-sm">{{ item.position }}</p>
              <p class="font-mono text-xs text-zinc-500 mt-1">{{ item.seniority }} 年</p>
            </div>
            <div class="w-full md:border-l md:border-white/10 md:pl-8">
              <h4 class="font-medium text-zinc-100 text-lg mb-3">
                {{ item.companyName }}
              </h4>
              <ul class="list-disc pl-4 space-y-2">
                <li
                  class="text-sm text-zinc-400 leading-relaxed"
                  v-for="items in item.responsibilities"
                  :key="items"
                >
                  {{ items }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-12 md:py-24">
      <div class="container mx-auto px-4">
        <p class="reveal font-mono text-xs tracking-[0.3em] uppercase text-emerald-400/80 mb-3">
          // works
        </p>
        <h2 class="reveal font-semibold text-zinc-100 text-3xl md:text-4xl mb-3">作品</h2>

        <p class="reveal font-normal text-zinc-500 text-sm md:text-base mb-12">應用展示區</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink class="reveal card card-link h-full" to="/airQuality">
            <h6 class="font-semibold text-zinc-100 text-lg mb-2">空氣品質觀測網站</h6>
            <p class="text-zinc-500 text-sm mb-5">即時空氣品質資料視覺化</p>
            <div class="flex flex-wrap gap-2">
              <span class="tag">Vue3</span>
              <span class="tag">Axios</span>
              <span class="tag">環境資料開放平臺</span>
              <span class="tag">TanStack Query</span>
            </div>
          </RouterLink>

          <RouterLink
            class="reveal card card-link h-full"
            to="/fortune"
            style="animation-delay: 80ms"
          >
            <h6 class="font-semibold text-zinc-100 text-lg mb-2">神明求籤</h6>
            <p class="text-zinc-500 text-sm mb-5">祈福抽籤，神明指引未來方向</p>
            <div class="flex flex-wrap gap-2">
              <span class="tag">Vue3</span>
              <span class="tag">Vue transition</span>
              <span class="tag">CSS 動畫</span>
            </div>
          </RouterLink>

          <RouterLink
            class="reveal card card-link h-full"
            to="/funding-overview"
            style="animation-delay: 160ms"
          >
            <h6 class="font-semibold text-zinc-100 text-lg mb-2">放貸機器人</h6>
            <p class="text-zinc-500 text-sm mb-5">以自動化策略管理資金配置</p>
            <div class="flex flex-wrap gap-2">
              <span class="tag">Vue3</span>
              <span class="tag">Element Plus</span>
              <span class="tag">TanStack Query</span>
            </div>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.card {
  border-radius: 0.75rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  background-color: rgb(255 255 255 / 0.03);
  padding: 2rem;
  transition:
    border-color 0.3s ease,
    transform 0.3s ease,
    box-shadow 0.3s ease;
}

.card:hover {
  border-color: rgb(52 211 153 / 0.4);
  transform: translateY(-4px);
  box-shadow: 0 18px 40px -24px rgb(52 211 153 / 0.5);
}

.card-link {
  display: block;
}

.tag {
  font-family:
    ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New',
    monospace;
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.25rem 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid rgb(255 255 255 / 0.1);
  color: rgb(212 212 216);
}

.reveal {
  opacity: 0;
  animation: fadeInUp 0.7s ease forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(24px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    animation: none;
  }

  .card:hover {
    transform: none;
  }
}
</style>
