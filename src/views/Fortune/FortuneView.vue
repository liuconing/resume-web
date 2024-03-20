<script setup lang="ts">
import { ref } from 'vue'
import { useNavigator } from '@/hook/useNavigator'
useNavigator()
const HomePAGE = ref<boolean>(true)
const StartPAGE = ref<boolean>(true)
const FortuneText = ref<boolean>(true)
const FortuneContent = ref<boolean>(true)
const FortuneNumber = ref<number>(0)
const FortuneName = ref<string>('')
const category = ref<Array<string>>([
  '網站上線',
  '感情姻緣',
  '事業工作',
  '家庭生活',
  '求財運勢',
  '參選總統'
])
const focusCategory = ref<number>(0)

const Anime = () => {
  if (!focusCategory.value) return
  HomePAGE.value = !HomePAGE.value
  StartPAGE.value = !StartPAGE.value
  FortuneNumber.value = Math.floor(Math.random() * 100)
  if (FortuneNumber.value === 0) {
    FortuneNumber.value = FortuneNumber.value + 1
  }
  if (FortuneNumber.value <= 33) FortuneName.value = '小 吉'
  else if (FortuneNumber.value <= 66) FortuneName.value = '中 吉'
  else if (FortuneNumber.value <= 100) FortuneName.value = '大 吉'
  setTimeout(() => {
    FortuneText.value = !FortuneText.value
    setTimeout(() => {
      FortuneText.value = !FortuneText.value
      setTimeout(() => {
        FortuneContent.value = !FortuneContent.value
      }, 2000)
    }, 3000)
  }, 3000)
}
const ReAnime = () => {
  HomePAGE.value = true
  StartPAGE.value = true
  FortuneContent.value = true
}
</script>
<template>
  <div id="Fortune">
    <Transition name="Home">
      <div class="Home" v-if="HomePAGE">
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
              v-for="(n, key) in category"
              @click="
                () => {
                  if (focusCategory === key + 1) {
                    focusCategory = 0
                    return
                  }
                  focusCategory = key + 1
                }
              "
              :class="{ active: focusCategory == key + 1 }"
              :key="key"
            >
              {{ n }}
            </li>
          </ul>
        </div>
      </div>
    </Transition>
    <Transition name="Start">
      <div class="Start" v-if="!StartPAGE">
        <div class="Start_border">
          <p>線</p>
          <p>上</p>
          <p>求</p>
          <p>籤</p>
          <div v-for="n in 4" :key="n" class="line"></div>
        </div>
        <Transition name="FortuneText">
          <div class="fortune_text" v-if="!FortuneText">
            <p class="text_top">第 {{ FortuneNumber }} 籤</p>
            <p class="text_content">{{ FortuneName }}</p>
            <p class="text_bottom">【 戊辛 】</p>
          </div>
        </Transition>
        <Transition name="FortuneContent">
          <div class="fortune_content" v-if="!FortuneContent">
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
              <div class="Rebutton_box" @click="ReAnime">重新求籤</div>
            </div>
            <div class="content_right">
              <h3>第 {{ FortuneNumber }} 籤 【 戊 辛 】 {{ FortuneName }}</h3>
              <p>登 山 涉 水 正 天 寒</p>
              <p>兄 弟 姻 親 那 得 安</p>
              <p>不 遇 虎 頭 人 一 喚</p>
              <p>全 家 誰 保 汝 重 歡</p>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
    <div class="button_box" :class="{ button_boxAnime: !HomePAGE }">
      <p class="box_start" @click="Anime">開始求籤</p>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@import './Fortune.scss';
</style>
