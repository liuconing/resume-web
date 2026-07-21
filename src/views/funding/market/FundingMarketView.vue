<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useFetch } from '@/hooks'
import { ElNotification } from '@/lib/element-plus'
import { getFundingsMarketUsecase } from '@/domain/usecase'
import {
  formatDateTime,
  formatDisplayAmount as formatAmount,
  formatMinutes,
  formatPercent as formatPct,
  formatProbability,
  formatStrategyModeLabel as strategyModeLabel,
  readErrorMessage,
} from '@/utils'

const MARKET_LEN = 25

const selectedCurrencyRef = ref('TESTUSDT')
const currencyOptions = ['TESTUSDT', 'TESTUSD', 'USDT', 'USD']

const marketQueryParams = computed(() => ({
  currency: selectedCurrencyRef.value,
  len: MARKET_LEN,
}))

const marketQuery = useFetch(getFundingsMarketUsecase, marketQueryParams, {
  queryKey: ['fundingsMarket'],
})

const { data, isFetching: loadingMarket, refetch } = marketQuery

const marketSummary = computed(() => {
  const d = data.value
  if (!d) {
    return {
      symbol: '',
      annualizedPct: 0,
      bestRateDaily: 0,
      demandAmount: 0,
    }
  }
  return {
    symbol: d.symbol,
    annualizedPct: d.annualizedPct,
    bestRateDaily: d.bestRateDaily,
    demandAmount: d.demandAmount,
  }
})

const borrowRows = computed(() => data.value?.borrowDemands ?? [])

const tradeRows = computed(() => {
  const raw = data.value as { trades?: unknown[] } | undefined
  const trades = raw?.trades
  return Array.isArray(trades) ? trades : []
})

/**
 * 顯示成功通知。
 *
 * @param params - `title`、`message` 為通知標題與內文。
 */
const notifySuccess = ({ title, message }: { title: string; message: string }): void => {
  ElNotification({
    title,
    message,
    type: 'success',
  })
}

/**
 * 顯示錯誤通知。
 *
 * @param params - `title` 為標題，`error` 為錯誤物件。
 */
const notifyError = ({ title, error }: { title: string; error: unknown }): void => {
  ElNotification({
    title,
    message: readErrorMessage({ error }),
    type: 'error',
  })
}

/**
 * 市場 query 錯誤時顯示通知。
 *
 * @param err - Query 回傳的錯誤，若為空則不動作。
 */
const handleMarketQueryError = (err: Error | null | undefined): void => {
  if (!err) {
    return
  }
  notifyError({ title: '讀取市場資料失敗', error: err })
}

watch(
  () => marketQuery.error.value,
  (err) => {
    handleMarketQueryError(err)
  },
)

/**
 * 重新請求市場資料並依選項顯示提示。
 *
 * @param params - `showSuccess` 為真時顯示重新整理成功通知。
 */
const loadMarket = async ({
  showSuccess = false,
}: { showSuccess?: boolean } = {}): Promise<void> => {
  const result = await refetch()
  if (result.error) {
    return
  }
  const payload = result.data
  if (showSuccess && payload) {
    notifySuccess({
      title: '重新整理完成',
      message: `${selectedCurrencyRef.value} 市場資料已更新。`,
    })
  }
  if (payload?.usedFallback) {
    ElNotification({
      title: '市場資料切換',
      message: `${selectedCurrencyRef.value} 無法直接取得資料，已改用 ${payload.symbol} 的公開市場資料。`,
      type: 'warning',
    })
  }
}

/**
 * 處理手動重新整理（reFetch）按鈕點擊。
 */
const handleRefetchMarketClick = (): void => {
  void loadMarket({ showSuccess: true })
}

/**
 * 處理幣種切換按鈕點擊。
 *
 * @param params - `currency` 為選取之幣種代號。
 */
const handleSwitchCurrency = ({ currency }: { currency: string }): void => {
  if (selectedCurrencyRef.value === currency) {
    return
  }
  selectedCurrencyRef.value = currency
}
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <div>
        <h2>市場行情</h2>
        <p class="toolbar-desc">
          查看目前借款需求、最近公開成交紀錄，並診斷目前 bot 是否會承接指定需求。
        </p>
      </div>
      <el-button type="primary" :loading="loadingMarket" @click="handleRefetchMarketClick"
        >reFetch</el-button
      >
    </div>

    <el-card shadow="never">
      <div class="currency-switch">
        <span class="switch-label">幣種</span>
        <el-button
          v-for="currency in currencyOptions"
          :key="currency"
          size="small"
          :type="selectedCurrencyRef === currency ? 'primary' : 'default'"
          :disabled="loadingMarket"
          @click="handleSwitchCurrency({ currency })"
        >
          {{ currency }}
        </el-button>
      </div>
    </el-card>

    <el-card shadow="never">
      <el-descriptions :column="3" border>
        <el-descriptions-item label="幣種">{{ selectedCurrencyRef }}</el-descriptions-item>
        <el-descriptions-item label="Market Symbol">
          {{ marketSummary.symbol || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="最佳借款年化">
          {{ formatPct({ value: marketSummary.annualizedPct, digits: 2 }) }}
        </el-descriptions-item>
        <el-descriptions-item label="最佳借款日利率">
          {{ formatPct({ value: marketSummary.bestRateDaily * 100, digits: 6 }) }}
        </el-descriptions-item>
        <el-descriptions-item label="借款需求總量">
          {{ formatAmount({ value: marketSummary.demandAmount }) }}
        </el-descriptions-item>
        <el-descriptions-item label="借款需求筆數">{{ borrowRows.length }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <template #header>{{ selectedCurrencyRef }} 借款需求列表</template>

      <el-table :data="borrowRows" stripe v-loading="loadingMarket">
        <el-table-column label="#" width="70">
          <template #default="{ $index }">{{ $index + 1 }}</template>
        </el-table-column>
        <el-table-column label="日利率" min-width="120">
          <template #default="{ row }">{{
            formatPct({ value: row.rateDaily * 100, digits: 6 })
          }}</template>
        </el-table-column>
        <el-table-column label="年化率" min-width="120">
          <template #default="{ row }">{{
            formatPct({ value: row.rateAprPct, digits: 2 })
          }}</template>
        </el-table-column>
        <el-table-column prop="period" label="天期" width="100" />
        <el-table-column prop="count" label="筆數" width="100" />
        <el-table-column label="金額" min-width="140">
          <template #default="{ row }">{{ formatAmount({ value: row.amount }) }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never">
      <template #header>已成交紀錄（{{ selectedCurrencyRef }}）</template>

      <el-table :data="tradeRows" stripe v-loading="loadingMarket">
        <el-table-column label="方向" width="120">
          <template #default="{ row }">
            <el-tag :type="row.direction === 'BORROW' ? 'danger' : 'success'" effect="dark" round>
              {{ row.direction === 'BORROW' ? '借入' : '出借' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="利率" min-width="120">
          <template #default="{ row }">{{
            formatPct({ value: row.rateAprPct, digits: 2 })
          }}</template>
        </el-table-column>
        <el-table-column label="金額" min-width="140">
          <template #default="{ row }">{{ formatAmount({ value: row.amount }) }}</template>
        </el-table-column>
        <el-table-column prop="period" label="天期" width="100" />
        <el-table-column label="時間" min-width="190">
          <template #default="{ row }">{{ formatDateTime({ value: row.mts }) }}</template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<style scoped>
.page {
  display: grid;
  gap: 16px;
}

.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  flex-wrap: wrap;
}

.toolbar h2 {
  margin: 0 0 6px;
}

.toolbar-desc {
  margin: 0;
  color: #64748b;
  font-size: 14px;
}

.currency-switch {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.switch-label {
  color: #4b5563;
}

.section {
  margin-top: 18px;
}

.section h3 {
  margin: 0 0 12px;
}

.section-mini {
  margin-top: 12px;
}

.section-alert {
  margin-bottom: 12px;
}

.action-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.tooltip-trigger-wrap {
  display: inline-flex;
  vertical-align: middle;
}

.reason-text {
  margin: 12px 0 0;
  color: #475569;
  line-height: 1.7;
}
</style>
