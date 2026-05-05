<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'
import { useFetch } from '@/hooks'
import { getAirQualityIndexUsecase } from '@/domain/usecase'
import type { AirQualityIndexDto } from '@/domain/usecase'

type AqiStyle = { bg: string; status: string }
type AirQualityAreaRow = AirQualityIndexDto & { aqiStyle: AqiStyle }

const targetElement = ref<HTMLElement | null>(null)
const selectCounty = ref<string>('')
const selectedArea = ref<AirQualityAreaRow | null>(null)

const { data: airQualityData, isLoading } = useFetch(getAirQualityIndexUsecase, null)

// 依 AQI 數值回傳對應背景色與狀態（須在 areas 之前定義）
const getAqiStyle = (aqi: string) => {
  const num = parseInt(aqi, 10) || 0
  if (num <= 50) return { bg: '#95f084', status: '良好' }
  if (num <= 100) return { bg: '#ffe695', status: '普通' }
  if (num <= 150) return { bg: '#ffaf6a', status: '對敏感族群不健康' }
  if (num <= 200) return { bg: '#ff5757', status: '對所有族群不健康' }
  if (num <= 300) return { bg: '#9777ff', status: '非常不健康' }
  return { bg: '#ad1774', status: '危害' }
}

// 列出所有城市
const citys = computed(() => {
  if (!airQualityData.value) return []
  return [...new Set(airQualityData.value.map((item) => item.county))].sort()
})

// 選定城市後的地區列表（含每列 AQI 樣式，避免 template 重複計算）
const areas = computed(() => {
  if (!airQualityData.value || !selectCounty.value) return []
  return airQualityData.value
    .filter((item) => item.county === selectCounty.value)
    .map((item) => ({
      ...item,
      aqiStyle: getAqiStyle(item.aqi),
    }))
})

const scrollToElement = () => {
  nextTick(() => {
    targetElement.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

const handleSelectArea = (item: AirQualityAreaRow) => {
  selectedArea.value = item
  scrollToElement()
}
</script>
<template>
  <div class="cute-page">
    <div class="cute-container">
      <!-- Header -->
      <header class="cute-header">
        <h1 class="cute-title">🌤️ 空氣品質指標 (AQI)</h1>
        <div class="cute-header-row">
          <div class="cute-select-wrap">
            <label for="county-select" class="cute-label">選擇縣市</label>
            <select
              id="county-select"
              v-model="selectCounty"
              class="cute-select"
              :disabled="isLoading"
            >
              <option value="">請選擇縣市</option>
              <option v-for="city in citys" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>
          <div class="cute-legend-wrap">
            <table class="cute-legend">
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
        </div>
      </header>

      <!-- Loading -->
      <div v-if="isLoading" class="cute-loading">
        <div class="cute-spinner" />
        <p class="cute-loading-text">載入中...</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="!selectCounty" class="cute-empty">
        <p class="cute-empty-title">請先選擇縣市</p>
        <p class="cute-empty-desc">選擇上方縣市後即可查看各地區空氣品質指標</p>
      </div>

      <!-- Table content -->
      <template v-else>
        <div class="cute-subheader">
          <h2 class="cute-subtitle">{{ selectCounty }}</h2>
        </div>

        <div class="cute-table-wrap" ref="targetElement">
          <table class="cute-table">
            <thead>
              <tr>
                <th>測站</th>
                <th>AQI</th>
                <th>狀態</th>
                <th>O3</th>
                <th>PM10</th>
                <th>PM2.5</th>
                <th>CO</th>
                <th>SO2</th>
                <th>NO2</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="item in areas"
                :key="item.siteid"
                class="cute-table-row"
                :class="{ 'cute-table-row--active': selectedArea?.siteid === item.siteid }"
                :style="{ '--aqi-bg': item.aqiStyle.bg }"
                @click="handleSelectArea(item)"
              >
                <td class="cute-cell-name">{{ item.sitename }}</td>
                <td class="cute-cell-aqi">{{ item.aqi }}</td>
                <td class="cute-cell-status">{{ item.aqiStyle.status }}</td>
                <td>{{ item.o3 }}</td>
                <td>{{ item.pm10 }}</td>
                <td>{{ item['pm2.5'] }}</td>
                <td>{{ item.co }}</td>
                <td>{{ item.so2 }}</td>
                <td>{{ item.no2 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </template>
    </div>
    <footer class="cute-footer">
      <p>
        資料來源：<a href="https://data.moenv.gov.tw/" target="_blank">環境部 - 環境資料開放平臺</a>
      </p>
      <p>Copyright © 2019 HexSchool. All rights reserved.</p>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
$pastel-pink: #ffd6e8;
$pastel-mint: #c8f4e0;
$pastel-lavender: #e8d5ff;
$pastel-peach: #ffe4d4;
$pastel-sky: #d4eeff;
$cute-border: #f0b4c8;
$cute-text: #5a4a6a;
$cute-shadow: 0 4px 12px rgba(240, 180, 200, 0.25);

* {
  font-family: 'Nunito', 'Noto Sans CJK TC', 'Noto Sans TC', sans-serif;
}

.cute-page {
  min-height: 100vh;
  background: linear-gradient(180deg, #fff5f8 0%, #f8f0ff 50%, #f0f8ff 100%);
  padding: 1.5rem 1rem 2rem;
}

.cute-container {
  max-width: 64rem;
  margin: 0 auto;
}

.cute-header {
  margin-bottom: 1.5rem;
}

.cute-title {
  font-size: 1.75rem;
  font-weight: 800;
  color: $cute-text;
  margin-bottom: 1rem;
  letter-spacing: -0.02em;
}

.cute-header-row {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: stretch;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}

.cute-select-wrap {
  flex-shrink: 0;
}

.cute-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: $cute-text;
  margin-bottom: 0.375rem;
  opacity: 0.9;
}

.cute-select {
  width: 100%;
  max-width: 16rem;
  padding: 0.625rem 1rem;
  border: 2px solid $cute-border;
  border-radius: 1rem;
  background: white;
  font-size: 0.9375rem;
  font-weight: 600;
  color: $cute-text;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: $cute-shadow;

  &:hover:not(:disabled) {
    border-color: #e89ab4;
    box-shadow: 0 6px 16px rgba(240, 180, 200, 0.35);
  }

  &:focus {
    outline: none;
    border-color: #e89ab4;
    box-shadow: 0 0 0 3px rgba(240, 180, 200, 0.3);
  }
}

.cute-legend-wrap {
  overflow-x: auto;
}

.cute-legend {
  border-collapse: separate;
  border-spacing: 0;
  box-shadow: $cute-shadow;

  th,
  td {
    padding: 0.5rem 0.75rem;
    font-size: 0.75rem;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.8);
  }

  th {
    font-weight: 700;
    color: $cute-text;
  }

  td {
    font-weight: 600;
    color: $cute-text;
    opacity: 0.9;
  }

  th:nth-of-type(1) {
    background: linear-gradient(135deg, #b8f0c8, #95f084);
  }
  th:nth-of-type(2) {
    background: linear-gradient(135deg, #ffe8a8, #ffe695);
  }
  th:nth-of-type(3) {
    background: linear-gradient(135deg, #ffc99a, #ffaf6a);
  }
  th:nth-of-type(4) {
    background: linear-gradient(135deg, #ff8a8a, #ff5757);
  }
  th:nth-of-type(5) {
    background: linear-gradient(135deg, #b8a0ff, #9777ff);
  }
  th:nth-of-type(6) {
    background: linear-gradient(135deg, #e08ab8, #ad1774);
  }
}

.cute-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  gap: 1rem;
}

.cute-spinner {
  width: 3rem;
  height: 3rem;
  border: 3px solid $pastel-pink;
  border-top-color: $cute-border;
  border-radius: 50%;
  animation: cute-spin 0.8s linear infinite;
}

@keyframes cute-spin {
  to {
    transform: rotate(360deg);
  }
}

.cute-loading-text {
  font-size: 0.9375rem;
  font-weight: 600;
  color: $cute-text;
  opacity: 0.8;
}

.cute-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 1rem;
  text-align: center;
}

.cute-empty-emoji {
  font-size: 3rem;
  margin-bottom: 0.75rem;
  filter: drop-shadow(0 2px 4px rgba(240, 180, 200, 0.3));
}

.cute-empty-title {
  font-size: 1.125rem;
  font-weight: 700;
  color: $cute-text;
  margin-bottom: 0.375rem;
}

.cute-empty-desc {
  font-size: 0.875rem;
  color: $cute-text;
  opacity: 0.75;
}

.cute-subheader {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    flex-direction: row;
    align-items: flex-end;
  }
}

.cute-subtitle {
  font-size: 1.25rem;
  font-weight: 800;
  color: $cute-text;
}

.cute-update {
  font-size: 0.8125rem;
  color: $cute-text;
  opacity: 0.8;
}

.cute-table-wrap {
  overflow-x: auto;
  box-shadow: $cute-shadow;
  background: transparent;
}

.cute-table {
  width: 100%;
  min-width: 42rem;
  border-collapse: collapse;
  font-size: 0.875rem;

  thead {
    background: linear-gradient(135deg, $pastel-lavender, $pastel-pink);
    color: $cute-text;

    th {
      padding: 0.875rem 0.75rem;
      font-weight: 700;
      text-align: center;
      border-bottom: 2px solid $cute-border;
      white-space: nowrap;

      &:first-child {
        border-radius: 1.25rem 0 0 0;
        text-align: left;
        padding-left: 1rem;
      }

      &:last-child {
        border-radius: 0 1.25rem 0 0;
      }
    }
  }

  tbody tr {
    transition: all 0.2s ease;
    cursor: pointer;

    &:hover {
      background: rgba(248, 240, 255, 0.6);
    }

    &:nth-child(even) {
      background: rgba(255, 255, 255, 0.5);

      &:hover {
        background: rgba(248, 240, 255, 0.6);
      }
    }
  }

  td {
    padding: 0.75rem;
    text-align: center;
    border-bottom: 1px solid rgba(240, 180, 200, 0.3);
    font-weight: 600;
    color: $cute-text;

    &:first-child {
      text-align: left;
      padding-left: 1rem;
      font-weight: 700;
    }
  }
}

.cute-table-row {
  &.cute-table-row--active {
    background: linear-gradient(90deg, var(--aqi-bg), rgba(255, 255, 255, 0.9)) !important;
    box-shadow: inset 0 0 0 3px $cute-border;
  }
}

.cute-cell-name {
  font-weight: 700 !important;
}

.cute-cell-aqi {
  font-size: 1rem;
  font-weight: 800;
}

.cute-cell-status {
  font-size: 0.75rem;
  max-width: 6rem;
}

.cute-footer {
  margin-top: 2rem;
  padding: 1rem 0;
  text-align: center;
  font-size: 0.875rem;
  color: $cute-text;
  opacity: 0.8;

  a {
    color: #b87a9e;
    font-weight: 600;
    text-decoration: underline;
    text-underline-offset: 2px;

    &:hover {
      color: #9a6a82;
    }
  }
}
</style>
