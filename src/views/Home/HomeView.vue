<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { markRaw } from 'vue'
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
      '使用 React 與 Next.js 製作遊戲入口平台且串接遊戲API，基礎功能包括註冊登入、充值、提領、查詢交易紀錄、切換貨幣、貨幣帶入遊戲內。',
      '使用 React Native 製作遊戲入口平台的手機版本。',
    ],
    seniority: 1,
  },
])
</script>

<template>
  <main class="bg-gray-100">
    <section class="py-10 md:py-16">
      <div class="container mx-auto px-4">
        <div class="text-center">
          <div class="flex justify-center mb-16">
            <img
              class="size-16 rounded-full"
              src="https://i.imgur.com/vTWoB7o.png"
              alt="劉文華（Ellis）"
            />
          </div>

          <h6 class="font-medium text-gray-600 text-lg md:text-2xl uppercase mb-8">劉文華 Ellis</h6>

          <h1 class="font-normal text-gray-900 text-4xl md:text-7xl leading-none mb-8">
            Front End Developer
          </h1>

          <p class="font-normal text-gray-600 text-md md:text-xl mb-16">
            有相關前端實務4年多經驗，經常使用Vue.js/React.js
            做為開發前端工具，具備良好的團隊溝通，喜歡與同事們互相分享技術經驗或新知。
          </p>
          <div class="flex items-center justify-center">
            <a
              v-for="item in links"
              :key="item.url"
              :href="item.url"
              target="_blank"
              class="mx-2 px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-400 transition ease-linear duration-500"
            >
              <img class="size-6" :src="item.svg" :alt="item.url" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 md:py-16">
      <div class="container mx-auto px-4">
        <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">專業技能</h1>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <h4 class="font-medium text-gray-700 text-lg mb-4">HTML</h4>

            <ul class="font-normal text-gray-500 text-md mb-4 list-disc">
              <li>理解 HTML 的基本結構和語義。</li>
              <li>
                掌握使用 HTML5 新增的元素和屬性，如語義化標籤、表單輸入類型、影片和音樂元素等。
              </li>
            </ul>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <h4 class="font-medium text-gray-700 text-lg mb-4">CSS</h4>

            <ul class="font-normal text-gray-500 text-md mb-4 list-disc">
              <li>掌握基礎的 CSS，包括選擇器、盒模型、布局（如浮動、定位）、字體和顏色。</li>
              <li>熟悉 CSS3 的新特性，如動畫、過渡、變形、彈性盒子布局（Flexbox）等。</li>
              <li>響應式和自適應設計（Responsive Web Design）</li>
              <li>掌握 SCSS 預處理器</li>
            </ul>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <h4 class="font-medium text-gray-700 text-lg mb-4">JavaScript</h4>

            <ul class="font-normal text-gray-500 text-md mb-4 list-disc">
              <li>掌握 JavaScript 基礎，包括數據類型、控制結構、函數、對象和數組。</li>
              <li>理解事件處理、DOM 操作和異步編程（如 Promises、async/await）。</li>
              <li>熟悉 ECMAScript 的最新標準和特性。</li>
            </ul>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <h4 class="font-medium text-gray-700 text-lg mb-4">前端框架</h4>

            <ul class="font-normal text-gray-500 text-md mb-4 list-disc">
              <li>熟練使用主流的前端框架（React、Vue3、React Native）</li>
              <li>
                熟悉 Vue3 Composition API 與 React Hooks、Context API、Redux
                等現代狀態管理與組件架構，具備 React
                路由（Router）、效能優化、SEO、無障礙設計（Accessibility）、國際化、測試、部署及監控等完整開發與最佳化經驗。
              </li>
            </ul>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <h4 class="font-medium text-gray-700 text-lg mb-4">GIT</h4>

            <ul class="font-normal text-gray-500 text-md mb-4 list-disc">
              <li>理解版本控制的基本概念，熟練使用 Git 進行代碼管理和協作。</li>
              <li>熟悉 Git Flow 協作流程</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 md:py-16">
      <div class="container mx-auto px-4">
        <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">職務經歷</h1>

        <p class="font-normal text-gray-500 text-xs md:text-base mb-20">
          以下是我在各公司的職務經歷
        </p>
        <div>
          <div class="flex flex-row justify-between">
            <h6 class="w-full font-medium text-gray-400 text-base uppercase">公司名稱</h6>
            <h6 class="w-1/3 font-medium text-gray-400 text-center text-base uppercase">職務</h6>
            <h6 class="w-1/3 font-medium text-gray-400 text-center text-base uppercase">
              任職時間（年）
            </h6>
          </div>
          <div class="flex flex-col justify-between">
            <div
              class="flex justify-between my-5"
              v-for="item in workExperiences.reverse()"
              :key="item.companyName"
            >
              <div class="w-full">
                <h4 class="font-medium text-gray-700 text-lg mb-2 inline">
                  {{ item.companyName }}
                </h4>
                <span class="font-normal text-gray-300">/ {{ item.duration }}</span>
                <ul class="list-inside list-disc ml-3">
                  <li
                    class="mt-3 text-sm text-gray-800"
                    v-for="items in item.responsibilities"
                    :key="items"
                  >
                    {{ items }}
                  </li>
                </ul>
              </div>
              <p class="w-1/3 font-normal text-gray-400 text-center text-base">
                Front-End Developer
              </p>
              <p class="w-1/3 font-normal text-gray-400 text-center text-base">
                {{ item.seniority }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-5 md:py-16">
      <div class="container mx-auto px-4">
        <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">作品</h1>

        <p class="font-normal text-gray-500 text-xs md:text-base mb-10 md:mb-20">應用展示區</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[500px]">
          <RouterLink class="bg-gray-50 px-8 py-10 rounded-md h-full" to="/airQuality">
            <h6 class="font-semibold text-gray-500 text-md mb-4">空氣品質觀測網站</h6>
            <ul class="font-normal text-gray-500 text-md mb-4 list-disc pl-4">
              <li>使用 Vue3</li>
              <li>使用 Axios http requests</li>
              <li>使用 環境資料開放平臺 資料</li>
              <li>使用 TanStack Query 管理資料狀態</li>
            </ul>
          </RouterLink>
          <RouterLink class="bg-gray-50 px-8 py-10 rounded-md h-full" to="/friendlyrestaurant">
            <h6 class="font-semibold text-gray-500 text-md mb-4">友善店家查詢網站</h6>
            <ul class="font-normal text-gray-500 text-md mb-4 list-disc pl-4">
              <li>使用 Vue3</li>
              <li>使用 Axios http requests</li>
              <li>使用 政府資料開放平臺 資料</li>
              <li>使用 TanStack Query 管理資料狀態</li>
              <li>使用 OpenStreetMap 製作 Map 畫面</li>
              <li>Node.js 處理 CORS 問題</li>
            </ul>
          </RouterLink>

          <RouterLink class="bg-gray-50 px-8 py-10 rounded-md h-full" to="/fortune">
            <h6 class="font-semibold text-gray-500 text-md mb-4">神明求籤</h6>
            <p class="text-gray-500 text-sm mb-4">祈福抽籤，神明指引未來方向</p>
            <ul class="font-normal text-gray-500 text-md mb-4 list-disc pl-4">
              <li>使用 Vue3</li>
              <li>使用 Vue transition 與 CSS 動畫切換效果</li>
            </ul>
          </RouterLink>

          <RouterLink class="bg-gray-50 px-8 py-10 rounded-md h-full" to="/funding-overview">
            <h6 class="font-semibold text-gray-500 text-md mb-4">放貸機器人</h6>
            <p class="text-gray-500 text-sm mb-4">以自動化策略管理資金配置</p>
            <ul class="font-normal text-gray-500 text-md mb-4 list-disc pl-4">
              <li>使用 Vue3</li>
              <li>使用 Element Plus</li>
              <li>使用 TanStack Query 管理資料狀態</li>
            </ul>
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>
