<script setup lang="ts">
import { ref } from 'vue'
import { useNavigator } from '@/hooks'
import { delay } from '@/utils'

useNavigator()

// Constants
const FORTUNE_CATEGORIES = [
  '網站上線',
  '感情姻緣',
  '事業工作',
  '家庭生活',
  '求財運勢',
  '參選總統',
] as const

const FORTUNE_LEVELS = [
  { max: 33, name: '小 吉' },
  { max: 66, name: '中 吉' },
  { max: 100, name: '大 吉' },
] as const

const ANIMATION_DELAYS = {
  TEXT_FIRST: 3000,
  TEXT_SECOND: 3000,
  CONTENT: 2000,
} as const

const getFortuneName = (num: number) =>
  FORTUNE_LEVELS.find(({ max }) => num <= max)?.name ?? '大 吉'

// State
const isHomeVisible = ref(true)
const isStartVisible = ref(true)
const isFortuneTextVisible = ref(true)
const isFortuneContentVisible = ref(true)
const fortuneNumber = ref(0)
const fortuneName = ref('')
const selectedCategoryIndex = ref(0)
const isAnimating = ref(false)

const handleStartFortune = async () => {
  if (!selectedCategoryIndex.value || isAnimating.value) return
  isAnimating.value = true
  isHomeVisible.value = !isHomeVisible.value
  isStartVisible.value = !isStartVisible.value
  fortuneNumber.value = Math.floor(Math.random() * 100) + 1
  fortuneName.value = getFortuneName(fortuneNumber.value)

  try {
    await delay(ANIMATION_DELAYS.TEXT_FIRST)
    isFortuneTextVisible.value = !isFortuneTextVisible.value
    await delay(ANIMATION_DELAYS.TEXT_SECOND)
    isFortuneTextVisible.value = !isFortuneTextVisible.value
    await delay(ANIMATION_DELAYS.CONTENT)
    isFortuneContentVisible.value = !isFortuneContentVisible.value
  } finally {
    isAnimating.value = false
  }
}

const handleResetFortune = () => {
  isHomeVisible.value = true
  isStartVisible.value = true
  isFortuneTextVisible.value = true
  isFortuneContentVisible.value = true
}
</script>

<template>
  <div id="Fortune">
    <Transition name="Home">
      <div class="Home" v-if="isHomeVisible">
        <h1>
          線上求籤
          <p>。</p>
        </h1>
        <div class="Fortune_step">
          <h2>求籤步驟</h2>
          <p>請依照以下步驟進行線上求籤</p>
          <p>① 請虔誠地在心中默念您的姓名、出生年月日、住址</p>
          <p>② 選擇欲請教的求籤類別後，誠心地在心中詳細說明</p>
          <p>③ 說明完後即可點選「開始求籤」按鈕進行線上求籤</p>
          <p>④ 求籤完後，請誠心地默念「感謝神明」</p>
        </div>
        <div class="Fortune_category">
          <h2>求籤類別</h2>
          <ul>
            <li
              v-for="(n, key) in FORTUNE_CATEGORIES"
              @click="
                () => {
                  if (selectedCategoryIndex === key + 1) {
                    selectedCategoryIndex = 0
                    return
                  }
                  selectedCategoryIndex = key + 1
                }
              "
              :class="{ active: selectedCategoryIndex == key + 1 }"
              :key="key"
            >
              {{ n }}
            </li>
          </ul>
        </div>
      </div>
    </Transition>
    <Transition name="Start">
      <div class="Start" v-if="!isStartVisible">
        <div class="Start_border">
          <p>線</p>
          <p>上</p>
          <p>求</p>
          <p>籤</p>
          <div v-for="n in 4" :key="n" class="line"></div>
        </div>
        <Transition name="FortuneText">
          <div class="fortune_text" v-if="!isFortuneTextVisible">
            <p class="text_top">第 {{ fortuneNumber }} 籤</p>
            <p class="text_content">{{ fortuneName }}</p>
            <p class="text_bottom">【 戊辛 】</p>
          </div>
        </Transition>
        <Transition name="FortuneContent">
          <div class="fortune_content" v-if="!isFortuneContentVisible">
            <div class="content_left">
              <p class="left_title">聖意</p>
              <p class="left_content" style="width: 215px">
                遇貴者 訟和平 病驚險 莫求名 財物耗 婚宜停 逢寅字 事漸亨
              </p>
              <p class="left_title">解曰</p>
              <p class="left_content">
                此籤家道不安 須防人口舌 怨恨臨門 財有失 逢貴人提挈方保 漸亨不成 多口舌 問婚訟平
                病有驚 財物耗散 名利空虛 只宜守舊 不利遠行 防親人侵損也
              </p>
              <div class="Rebutton_box" @click="handleResetFortune">重新求籤</div>
            </div>
            <div class="content_right">
              <h3>第 {{ fortuneNumber }} 籤 【 戊 辛 】 {{ fortuneName }}</h3>
              <p>登 山 涉 水 正 天 寒</p>
              <p>兄 弟 姻 親 那 得 安</p>
              <p>不 遇 虎 頭 人 一 喚</p>
              <p>全 家 誰 保 汝 重 歡</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
    <div class="button_box" :class="{ button_boxAnime: !isHomeVisible }">
      <p class="box_start" @click="handleStartFortune">開始求籤</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use './Fortune.scss';
</style>
