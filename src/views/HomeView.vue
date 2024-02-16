<script setup lang="ts">
import GitHubSvg from '@/assets/image/github.svg'
import LinkedInSvg from '@/assets/image/linkedin.svg'
import { ref } from 'vue'
const linkList = ref([
  {
    url: 'https://github.com/liuconing',
    svg: GitHubSvg
  },
  {
    url: 'https://www.linkedin.com/in/ellis-liu-0199a814a/',
    svg: LinkedInSvg
  }
])
</script>

<template>
  <main class="bg-gray-100">
    <section class="py-10 md:py-16">
      <div class="container max-w-screen-xl mx-auto px-4">
        <div class="text-center">
          <div class="flex justify-center mb-16">
            <!-- <img src="@/assets/image/home-img.png" alt="Image" /> -->
            <img
              class="rounded-full w-64 h-64"
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

    <!-- <section class="py-10 md:py-16">
      <div class="container max-w-screen-xl mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <div class="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
              <i data-feather="activity"></i>
            </div>

            <h4 class="font-medium text-gray-700 text-lg mb-4">High experience</h4>

            <p class="font-normal text-gray-500 text-md">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <div class="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
              <i data-feather="codesandbox"></i>
            </div>

            <h4 class="font-medium text-gray-700 text-lg mb-4">Useful sandboxes</h4>

            <p class="font-normal text-gray-500 text-md">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <div class="bg-gray-50 px-8 py-10 rounded-md">
            <div class="w-20 py-6 flex justify-center bg-gray-100 rounded-md mb-4">
              <i data-feather="coffee"></i>
            </div>

            <h4 class="font-medium text-gray-700 text-lg mb-4">Success side projects</h4>

            <p class="font-normal text-gray-500 text-md">
              Lorem ipsum dolor sit amet, consectetur <br />
              adipiscing elit, sed do eiusmod tempor <br />
              incididunt ut labore et dolore magna aliqua.
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-10 md:py-16">
      <div class="container max-w-screen-xl mx-auto px-4">
        <div class="flex flex-col lg:flex-row justify-between">
          <div class="mb-10 lg:mb-0">
            <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Portfolio</h1>

            <p class="font-normal text-gray-500 text-xs md:text-base">
              I have brought here my biggest and favorite works <br />
              as a professional.
            </p>
          </div>

          <div class="space-y-24">
            <div class="flex space-x-6">
              <h1 class="font-normal text-gray-700 text-3xl md:text-4xl">01</h1>

              <span class="w-28 h-0.5 bg-gray-300 mt-5"></span>

              <div>
                <h1 class="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                  Demo API Generator
                </h1>

                <p class="font-normal text-gray-500 text-sm md:text-base">
                  A dummy data free and documented API generator to facilitate <br />
                  the process of testing the front-end portion of projects.
                </p>
              </div>
            </div>

            <div class="flex space-x-6">
              <h1 class="font-normal text-gray-700 text-3xl md:text-4xl">02</h1>

              <span class="w-28 h-0.5 bg-gray-300 mt-5"></span>

              <div>
                <h1 class="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                  Demo API Generator
                </h1>

                <p class="font-normal text-gray-500 text-sm md:text-base">
                  A dummy data free and documented API generator to facilitate <br />
                  the process of testing the front-end portion of projects.
                </p>
              </div>
            </div>

            <div class="flex space-x-6">
              <h1 class="font-normal text-gray-700 text-3xl md:text-4xl">03</h1>

              <span class="w-28 h-0.5 bg-gray-300 mt-5"></span>

              <div>
                <h1 class="font-normal text-gray-700 text-3xl md:text-4xl mb-5">
                  Demo API Generator
                </h1>

                <p class="font-normal text-gray-500 text-sm md:text-base">
                  A dummy data free and documented API generator to facilitate <br />
                  the process of testing the front-end portion of projects.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section> -->

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
        <div class="text-center">
          <h1
            class="font-normal text-gray-300 text-3xl md:text-6xl lg:text-7xl mb-20 md:mb-32 lg:mb-48"
          >
            Please do not measure your skills in <br />
            percentages!
          </h1>

          <p class="font-medium text-gray-700 text-xs md:text-base">
            In my many years of experience, I use @laravel for backend projects and @vuejs for
            <br />
            front-end projects. I’m an avid programmer, so I create designs based on the <br />
            weekend @figmadesign.
          </p>
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
        <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Brands</h1>

        <p class="font-normal text-gray-500 text-xs md:text-base mb-10 md:mb-20">
          Below is a summary of the places I studied
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <img src="@/assets/image/brand-1.png" alt="Image" />

          <img src="@/assets/image/brand-2.png" alt="Image" />

          <img src="@/assets/image/brand-3.png" alt="Image" />

          <img src="@/assets/image/brand-4.png" alt="Image" />

          <img src="@/assets/image/brand-5.png" alt="Image" />

          <img src="@/assets/image/brand-6.png" alt="Image" />
        </div>
      </div>
    </section>

    <section class="py-10 md:py-16">
      <div class="container max-w-screen-xl mx-auto px-4">
        <h1 class="font-medium text-gray-700 text-3xl md:text-4xl mb-5">Testimonial</h1>

        <p class="font-normal text-gray-500 text-xs md:text-base mb-10 md:mb-20">
          Below is a summary of the places I studied
        </p>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

    <footer class="py-10 md:py-16 mb-20 md:mb-40 lg::mb-52">
      <div class="container max-w-screen-xl mx-auto px-4">
        <div class="text-center">
          <h1 class="font-medium text-gray-700 text-4xl md:text-5xl mb-5">Testimonial</h1>

          <p class="font-normal text-gray-400 text-md md:text-lg mb-20">
            I’m not currently taking on new client work but feel free to contact me for any <br />
            other inquiries.
          </p>

          <div class="flex items-center justify-center space-x-8">
            <a
              href="#"
              class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
            >
              <i
                data-feather="twitter"
                class="text-gray-500 hover:text-gray-800 transition ease-in-out duration-500"
              ></i>
            </a>

            <a
              href="#"
              class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
            >
              <i
                data-feather="dribbble"
                class="text-gray-500 hover:text-gray-700 transition ease-in-out duration-500"
              ></i>
            </a>

            <a
              href="#"
              class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
            >
              <i
                data-feather="facebook"
                class="text-gray-500 hover:text-gray-700 transition ease-in-out duration-500"
              ></i>
            </a>

            <a
              href="#"
              class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
            >
              <i
                data-feather="codepen"
                class="text-gray-500 hover:text-gray-700 transition ease-in-out duration-500"
              ></i>
            </a>

            <a
              href="#"
              class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
            >
              <i
                data-feather="at-sign"
                class="text-gray-500 hover:text-gray-700 transition ease-in-out duration-500"
              ></i>
            </a>

            <a
              href="#"
              class="w-16 h-16 flex items-center justify-center rounded-full hover:bg-gray-200 transition ease-in-out duration-500"
            >
              <i
                data-feather="instagram"
                class="text-gray-500 hover:text-gray-700 transition ease-in-out duration-500"
              ></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  </main>
</template>
