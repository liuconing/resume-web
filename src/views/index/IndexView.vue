<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { markRaw } from 'vue'
import GitHubSvg from '@/assets/image/github.svg'
import LinkedInSvg from '@/assets/image/linkedin.svg'
import type { linkListType, workExperienceListType } from './type'

const linkList = markRaw<linkListType>([
  {
    url: 'https://github.com/liuconing',
    svg: GitHubSvg
  },
  {
    url: 'https://www.linkedin.com/in/ellis-liu-0199a814a/',
    svg: LinkedInSvg
  }
])
const workExperienceList = markRaw<workExperienceListType>([
  {
    companyName: '思偉達創新科技股份有限公司',
    position: 'Front-End Developer',
    duration: '2018年4月 - 2020年2月',
    responsibilities: [
      '建立乙太坊交易所和與智能合約串接製作區塊鏈相關產品。',
      '使用Vue / Nuxt.js製作區塊鏈相關網站。',
      '使用web3.js與各種生態鏈跟區塊鏈合約進行溝通與操作。'
    ]
  },
  {
    companyName: '樹人科技有限公司',
    position: 'Front-End Developer',
    duration: '2020年3月 - 2021年4月',
    responsibilities: [
      '串接H5遊戲API並製作手機版本的入口網站。',
      '製作後台管理網站，針對使用者資料進行操作。',
      '使用nuxt.js製作SSR網站，具有SEO效果。'
    ]
  },
  {
    companyName: '氪龍有限公司',
    position: 'Front-End Developer',
    duration: '2021年7月 - 2022年6月',
    responsibilities: [
      '使用React / Next.js製作區塊鏈網站。',
      '為前端團隊分享串接合約跟區塊鏈遇到的問題。',
      '使用ant-pro框架來管理相關後台類型網站。'
    ]
  },
  {
    companyName: '拓荒資本股份有限公司',
    position: 'Front-End Developer',
    duration: '2022年7月 - 2022年3月',
    responsibilities: [
      '負責公司官方網站的架設、更新和維護，確保網站可用性和優秀用戶體驗。',
      '參與從零開始的React Native應用開發項目，與團隊成員成功上架區塊練錢包應用程式，實現了良好的市場反饋和用戶體驗。',
      '與團隊合作建立和優化敏捷開發流程，提高了項目交付效率和質量。'
    ]
  }
])
</script>

<template>
  <main class="bg-gray-100">
    <section class="py-10 md:py-16">
      <div class="container max-w-screen-xl mx-auto px-4">
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
              v-for="item in linkList"
              :key="item.url"
              :href="item.url"
              target="_blank"
              class="mx-2 px-7 py-3 md:px-9 md:py-4 font-medium md:font-semibold bg-gray-700 text-gray-50 text-sm rounded-md hover:bg-gray-50 hover:text-gray-700 transition ease-linear duration-500"
            >
              <component :is="item.svg" />
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 md:py-16">
      <div class="container max-w-screen-xl mx-auto px-4">
        <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">專業技能</h1>

        <p class="font-normal text-gray-500 text-xs md:text-base mb-20">以下是專業技能的總結</p>

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
              <li>熟練使用主流的前端框架（React、Vue）</li>
              <li>理解該框架生命週期與API使用方式。</li>
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
      <div class="container max-w-screen-xl mx-auto px-4">
        <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Experience</h1>

        <p class="font-normal text-gray-500 text-xs md:text-base mb-20">
          Below is a summary of the places I studied
        </p>
        <div class="flex flex-col lg:flex-row justify-between">
          <div class="space-y-8 md:space-y-16 mb-16 md:mb-0">
            <h6 class="font-medium text-gray-400 text-base uppercase">Company</h6>

            <p class="font-semibold text-gray-600 text-base">
              Massa Fames <span class="font-normal text-gray-300">/ New York</span>
            </p>

            <p class="font-semibold text-gray-600 text-base">
              Massa Fames <span class="font-normal text-gray-300">/ New York</span>
            </p>

            <p class="font-semibold text-gray-600 text-base">
              Massa Fames <span class="font-normal text-gray-300">/ New York</span>
            </p>

            <p class="font-semibold text-gray-600 text-base">
              Massa Fames <span class="font-normal text-gray-300">/ New York</span>
            </p>

            <p class="font-semibold text-gray-600 text-base">
              Massa Fames <span class="font-normal text-gray-300">/ New York</span>
            </p>
          </div>

          <div class="space-y-8 md:space-y-16 mb-16 md:mb-0">
            <h6 class="font-medium text-gray-400 text-base uppercase">Position</h6>

            <p class="font-normal text-gray-400 text-base">Junior Front-End Developer</p>

            <p class="font-normal text-gray-400 text-base">Junior Front-End Developer</p>

            <p class="font-normal text-gray-400 text-base">Junior Front-End Developer</p>

            <p class="font-normal text-gray-400 text-base">Junior Front-End Developer</p>

            <p class="font-normal text-gray-400 text-base">Junior Front-End Developer</p>
          </div>

          <div class="space-y-8 md:space-y-16">
            <h6 class="font-medium text-gray-400 text-base uppercase">Year</h6>

            <p class="font-normal text-gray-400 text-base">2016</p>

            <p class="font-normal text-gray-400 text-base">2016</p>

            <p class="font-normal text-gray-400 text-base">2016</p>

            <p class="font-normal text-gray-400 text-base">2016</p>

            <p class="font-normal text-gray-400 text-base">2016</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 md:py-16">
      <div class="container max-w-screen-xl mx-auto px-4">
        <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">作品</h1>

        <p class="font-normal text-gray-500 text-xs md:text-base mb-10 md:mb-20">應用展示區</p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <RouterLink to="/airQuality">
            <div class="bg-gray-50 px-8 py-10 rounded-md">
              <h6 class="font-semibold text-gray-500 text-md mb-4">空氣品質觀測網站</h6>
              <ul class="font-normal text-gray-500 text-md mb-4 list-disc pl-4">
                <li>使用 Vue3</li>
                <li>使用 Axios http requests</li>
                <li>使用 環境資料開放平臺 資料</li>
                <li>使用 TanStack Query 管理資料狀態</li>
              </ul>
            </div>
          </RouterLink>
          <RouterLink to="/friendlyrestaurant">
            <div class="bg-gray-50 px-8 py-10 rounded-md">
              <h6 class="font-semibold text-gray-500 text-md mb-4">友善店家查詢網站</h6>
              <ul class="font-normal text-gray-500 text-md mb-4 list-disc pl-4">
                <li>使用 Vue3</li>
                <li>使用 Axios http requests</li>
                <li>使用 政府資料開放平臺 資料</li>
                <li>使用 TanStack Query 管理資料狀態</li>
                <li>使用 OpenStreetMap 製作 Map 畫面</li>
                <li>Node.js 處理 CORS 問題</li>
              </ul>
            </div>
          </RouterLink>

          <a href="http://amelia.ellisliu.website" target="_blank" rel="noopener">
            <div class="bg-gray-50 px-8 py-10 rounded-md">
              <h6 class="font-semibold text-gray-500 text-md mb-4">Amelia DAO</h6>
              <ul class="font-normal text-gray-500 text-md mb-4 list-disc pl-4">
                <li>使用 Vue2</li>
                <li>使用 ethers 與區塊練合約做溝通</li>
                <li>使用 web3modal 為各種錢包與ethers做為橋樑溝通</li>
                <li>使用 vuetify UI Library</li>
              </ul>
            </div>
          </a>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <p class="font-normal text-gray-500 text-md mb-4">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt ut labore et dolore magna aliqua.
            </p>

            <h6 class="font-semibold text-gray-500 text-md">
              Stephan Clark
              <span class="font-medium text-gray-300 text-sm">- CEO at EarlyBird</span>
            </h6>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <p class="font-normal text-gray-500 text-md mb-4">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt ut labore et dolore magna aliqua.
            </p>

            <h6 class="font-semibold text-gray-500 text-md">
              Stephan Clark
              <span class="font-medium text-gray-300 text-sm">- CEO at EarlyBird</span>
            </h6>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <p class="font-normal text-gray-500 text-md mb-4">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt ut labore et dolore magna aliqua.
            </p>

            <h6 class="font-semibold text-gray-500 text-md">
              Stephan Clark
              <span class="font-medium text-gray-300 text-sm">- CEO at EarlyBird</span>
            </h6>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <p class="font-normal text-gray-500 text-md mb-4">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt ut labore et dolore magna aliqua.
            </p>

            <h6 class="font-semibold text-gray-500 text-md">
              Stephan Clark
              <span class="font-medium text-gray-300 text-sm">- CEO at EarlyBird</span>
            </h6>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
