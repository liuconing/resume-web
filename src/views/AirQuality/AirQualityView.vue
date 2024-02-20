<script setup lang="ts">
import Loading from '@/components/Loading.vue'
import { ref, watchEffect, watch } from 'vue'
import { useAirQuality } from '@/queries/useAirQuality'
import type { callAqiRes } from '@/api/type'
const { data: AirQualityData, isLoading } = useAirQuality()
const targetElement = ref<HTMLElement | null>(null)
const countyMap = ref<string[]>([])
const countyData = ref<callAqiRes[]>([])
const countyPublishTime = ref<string>('')
const areaData = ref<callAqiRes>()
const selectCounty = ref<string>('請選擇地區')
function scrollToElement() {
  if (targetElement.value) {
    console.log(targetElement)
    targetElement.value?.scrollIntoView({ behavior: 'smooth' })
  }
}
watch(selectCounty, () => {
  countyPublishTime.value = AirQualityData.value.find(
    (item: any) => item.county === selectCounty.value
  ).publishtime
  countyData.value = AirQualityData.value.filter((item: any) => item.county === selectCounty.value)
})
watchEffect(() => {
  if (!isLoading.value) {
    countyMap.value = Array.from(new Set(AirQualityData.value.map((item: any) => item.county)))
  }
})
</script>
<template>
  <Loading v-if="isLoading" />
  <div
    v-else
    class="container max-w-screen-sm md:max-w-screen-xl md:mx-auto min-h-screen pt-7 px-4 mb-10"
  >
    <div class="md:flex items-center justify-between mb-12">
      <div class="mb-4 md:mb-0">
        <h1>空氣品質指標 (AQI)</h1>
        <select
          name="QualitySelect"
          class="w-full border-2 border-black p-3"
          v-model="selectCounty"
        >
          <option value="請選擇地區" selected>請選擇地區</option>
          <option v-for="(item, key) in countyMap" :value="item" :key="key">
            {{ item }}
          </option>
        </select>
      </div>
      <table>
        <tbody>
          <tr>
            <th>0～50</th>
            <th>51～100</th>
            <th>101～150</th>
            <th>151～200</th>
            <th>201～300</th>
            <th>301～400</th>
          </tr>
          <tr>
            <td>良好</td>
            <td>普通</td>
            <td>對敏感族群不健康</td>
            <td>對所有族群不健康</td>
            <td>非常不健康</td>
            <td>危害</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-center mb-12">
      <h2 class="min-w-20">{{ selectCounty == '請選擇地區' ? '' : selectCounty }}</h2>
      <hr class="w-full border-2 border-black border-dashed" />
      <div class="md:w-1/4 ml-2">更新時間 {{ countyPublishTime }}</div>
    </div>
    <div class="flex flex-col-reverse md:flex-row items-start justify-center">
      <div class="w-full md:w-1/3 min-h-[535px] border-2 border-black" ref="targetElement">
        <div class="FocusArea">
          <div>
            {{ areaData?.sitename }}
          </div>
          <div>
            {{ areaData?.aqi }}
          </div>
        </div>
        <ul class="AreaList w-full h-full">
          <li>
            <p>
              臭氧
              <span>O3 (ppb)</span>
            </p>
            <p>{{ areaData?.o3 }}</p>
          </li>
          <li>
            <p>
              懸浮微粒
              <span>
                PM
                <span style="font-size: 12px">10</span> (μg/m³)
              </span>
            </p>
            <p>{{ areaData?.pm10 }}</p>
          </li>
          <li>
            <p>
              細懸浮微粒
              <span>
                PM
                <span style="font-size: 12px">2.5</span> (μg/m³)
              </span>
            </p>
            <p>{{ areaData?.['pm2.5'] }}</p>
          </li>
          <li>
            <p>
              一氧化碳
              <span>CO (ppm)</span>
            </p>
            <p>{{ areaData?.co }}</p>
          </li>
          <li>
            <p>
              二氧化硫
              <span>
                SO
                <span style="font-size: 12px">2</span> (ppb)
              </span>
            </p>
            <p>{{ areaData?.so2 }}</p>
          </li>
          <li>
            <p>
              二氧化氮
              <span>
                NO
                <span style="font-size: 12px">2</span> (ppb)
              </span>
            </p>
            <p>{{ areaData?.no2 }}</p>
          </li>
        </ul>
      </div>
      <ul class="ContentSelect">
        <li
          v-for="(item, key) in countyData"
          :key="key"
          @click="
            () => {
              areaData = item
              scrollToElement()
            }
          "
        >
          <p>{{ item.sitename }}</p>
          <p>{{ item.aqi }}</p>
        </li>
      </ul>
    </div>
  </div>
  <footer class="md:flex items-center justify-between p-4 bg-black">
    <p class="text-white">
      資料來源：<a href="https://data.moenv.gov.tw/" target="_blank"> 行政院環境保護署 </a>
    </p>
    <p class="text-white">Copyright © 2019 HexSchool. All rights reserved.</p>
  </footer>
</template>
<style lang="scss" scoped>
* {
  font-family: Noto Sans CJK TC;
  font-weight: bold;
}

table {
  th,
  td {
    @apply text-center w-32 h-14 text-base border-2 border-black;
  }
  th {
    &:nth-of-type(1) {
      background-color: #95f084;
    }
    &:nth-of-type(2) {
      background-color: #ffe695;
    }
    &:nth-of-type(3) {
      background-color: #ffaf6a;
    }
    &:nth-of-type(4) {
      background-color: #ff5757;
    }
    &:nth-of-type(5) {
      background-color: #9777ff;
    }
    &:nth-of-type(6) {
      background-color: #ad1774;
    }
  }
}

.FocusArea {
  div {
    @apply w-full p-5 text-5xl text-center font-bold border-b-2 border-black flex items-center justify-center;
  }
}
ul.AreaList {
  li {
    @apply flex items-center justify-between p-5 border border-black;
    &:last-child {
      border-bottom: none;
    }
    p {
      @apply text-2xl font-bold;
      span {
        @apply font-medium text-base;
      }
    }
  }
}
ul.ContentSelect {
  @apply w-full  md:pl-7 flex flex-wrap items-start justify-between;
  li {
    @apply w-5/12 mb-8 py-4 flex items-center justify-between cursor-pointer;
    border: solid 3px #000;
    &:hover {
      background-color: darken($color: #ffffff, $amount: 20%);
    }
    p {
      @apply w-1/2 h-full text-2xl md:text-5xl text-center flex items-center justify-center;
      &:nth-of-type(1) {
        border-right: solid 3px #000;
      }
    }
  }
}
</style>
