<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useFetch } from '@/hooks'
import { ElNotification } from '@/lib/element-plus'
import {
  getFundingsBotDiagnosticUsecase,
  getFundingsBotSimulationDiagnosticUsecase,
  getFundingsMarketUsecase,
} from '@/domain/usecase'

const loadingMarket = ref(false)
const loadingDiagnostic = ref(false)
const loadingSimulationDiagnostic = ref(false)
const selectedCurrency = ref('TESTUSDT')
const currencyOptions = ['TESTUSDT', 'TESTUSD', 'USDT', 'USD']
const borrowRowsRef = ref<
  {
    rateDaily: number
    rateAprPct: number
    period: number
    count: number
    amount: number
  }[]
>([])
const tradeRowsRef = ref([])
const diagnosticDialogVisible = ref(false)
const diagnostic = ref(null)
const diagnosticMode = ref('LIVE')
const marketReactive = reactive({
  annualizedPct: 0,
  bestRateDaily: 0,
  borrowDemands: [],
  currency: '',
  demandAmount: 0,
  len: 0,
  symbol: '',
  usedFallback: false,
})

const { data: markets } = useFetch(
  getFundingsMarketUsecase,
  {
    currency: 'USD',
    len: 25,
  },
  {
    onSuccess: (data) => {
      Object.assign(marketReactive, data)
      borrowRowsRef.value = data.borrowDemands
      tradeRowsRef.value = data.trades
    },
    queryKey: ['markets', selectedCurrency.value, 25],
  },
)

/**
 * 取得read Error相關資料。
 * @param error - 錯誤物件。
 */

function readError(error: any) {
  return error?.response?.data?.message || error?.message || '操作失敗'
}

/**
 * 處理notify Success邏輯。
 * @param title - 函式輸入參數。
 * @param message - 函式輸入參數。
 */

function notifySuccess(title: string, message: string) {
  ElNotification({
    title,
    message,
    type: 'success',
  })
}

/**
 * 處理notify Error邏輯。
 * @param title - 函式輸入參數。
 * @param error - 錯誤物件。
 */

function notifyError(title: string, error: any) {
  ElNotification({
    title,
    message: readError(error),
    type: 'error',
  })
}

/**
 * 格式化format Pct內容供顯示或輸出。
 * @param value - 輸入值。
 * @param digits - 函式輸入參數。
 */

function formatPct(value: number, digits = 2) {
  return `${Number(value || 0).toFixed(digits)}%`
}

/**
 * 格式化format Amount內容供顯示或輸出。
 * @param value - 輸入值。
 */

function formatAmount(value: number) {
  return Number(value || 0).toLocaleString('zh-TW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })
}

/**
 * 格式化format Probability內容供顯示或輸出。
 * @param value - 輸入值。
 */

function formatProbability(value: number) {
  return `${(Number(value || 0) * 100).toFixed(2)}%`
}

/**
 * 格式化format Minutes內容供顯示或輸出。
 * @param value - 輸入值。
 */

function formatMinutes(value: number) {
  const minutes = Number(value || 0)
  if (!Number.isFinite(minutes) || minutes <= 0) {
    return '-'
  }
  if (minutes >= 1_000_000) {
    return '極長時間'
  }
  if (minutes >= 60) {
    return `${(minutes / 60).toFixed(2)} 小時`
  }
  return `${minutes.toFixed(2)} 分鐘`
}

/**
 * 格式化format Date Time內容供顯示或輸出。
 * @param value - 輸入值。
 */

function formatDateTime(value: number) {
  const ts = Number(value || 0)
  if (!Number.isFinite(ts) || ts <= 0) {
    return '-'
  }
  const date = new Date(ts)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 處理strategy Mode Label邏輯。
 * @param value - 輸入值。
 */

function strategyModeLabel(value: string) {
  return String(value || '').toUpperCase() === 'HIGH_RATE_WAIT' ? '高利率等待模式' : '最佳成交模式'
}

/**
 * 取得load Market相關資料。
 * @param showSuccess - 函式輸入參數。
 */

async function loadMarket(showSuccess: boolean = false) {
  loadingMarket.value = true
  try {
    const response = markets
    const data = response?.data || {}
    market.symbol = String(data.symbol || '')
    market.bestRateDaily = Number(data.bestRateDaily || 0)
    market.annualizedPct = Number(data.annualizedPct || 0)
    market.demandAmount = Number(data.demandAmount || 0)
    borrowRows.value = Array.isArray(data.borrowDemands) ? data.borrowDemands : []
    tradeRows.value = Array.isArray(data.trades) ? data.trades : []

    if (showSuccess) {
      notifySuccess('重新整理完成', `${selectedCurrency.value} 市場資料已更新。`)
    }

    if (data.usedFallback) {
      ElNotification({
        title: '市場資料切換',
        message: `${selectedCurrency.value} 無法直接取得資料，已改用 ${data.symbol} 的公開市場資料。`,
        type: 'warning',
      })
    }
  } catch (error) {
    borrowRows.value = []
    tradeRows.value = []
    market.symbol = ''
    market.bestRateDaily = 0
    market.annualizedPct = 0
    market.demandAmount = 0
    notifyError('讀取市場資料失敗', error)
  } finally {
    loadingMarket.value = false
  }
}

/**
 * 處理on Switch Currency邏輯。
 * @param currency - 幣種或市場代號。
 */

async function onSwitchCurrency(currency: string) {
  if (selectedCurrency.value === currency) {
    return
  }
  selectedCurrency.value = currency
  await loadMarket(true)
}

/**
 * 處理open Diagnostic邏輯。
 * @param row - 函式輸入參數。
 * @param mode - 函式輸入參數。
 */

async function openDiagnostic(row: any, mode: string = 'LIVE') {
  diagnosticMode.value = mode
  diagnosticDialogVisible.value = true
  diagnostic.value = null
  const isSimulation = mode === 'SIMULATION'
  if (isSimulation) {
    loadingSimulationDiagnostic.value = true
  } else {
    loadingDiagnostic.value = true
  }
  try {
    const payload = {
      currency: selectedCurrency.value,
      rateDaily: row.rateDaily,
      amount: row.amount,
      period: row.period,
    }
    const response = isSimulation
      ? await fetchFundingsBotSimulationDiagnostic(payload)
      : await fetchFundingsBotDiagnostic(payload)
    diagnostic.value = response?.data || null
  } catch (error) {
    diagnosticDialogVisible.value = false
    notifyError(isSimulation ? '讀取模擬診斷失敗' : '讀取策略診斷失敗', error)
  } finally {
    if (isSimulation) {
      loadingSimulationDiagnostic.value = false
    } else {
      loadingDiagnostic.value = false
    }
  }
}

// onMounted(async () => {
//   await loadMarket(false)
// })
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
      <el-button type="primary" :loading="loadingMarket" @click="loadMarket(true)"
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
          :type="selectedCurrency === currency ? 'primary' : 'default'"
          :disabled="loadingMarket"
          @click="onSwitchCurrency(currency)"
        >
          {{ currency }}
        </el-button>
      </div>
    </el-card>

    <el-card shadow="never">
      <el-descriptions :column="3" border>
        <el-descriptions-item label="幣種">{{ selectedCurrency }}</el-descriptions-item>
        <el-descriptions-item label="Market Symbol">
          {{ marketReactive.symbol || '-' }}
        </el-descriptions-item>
        <el-descriptions-item label="最佳借款年化">
          {{ formatPct(marketReactive.annualizedPct, 2) }}
        </el-descriptions-item>
        <el-descriptions-item label="最佳借款日利率">
          {{ formatPct(marketReactive.bestRateDaily * 100, 6) }}
        </el-descriptions-item>
        <el-descriptions-item label="借款需求總量">
          {{ formatAmount(marketReactive.demandAmount) }}
        </el-descriptions-item>
        <el-descriptions-item label="借款需求筆數">{{ borrowRowsRef.length }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <template #header>{{ selectedCurrency }} 借款需求列表</template>

      <el-table :data="borrowRowsRef" stripe v-loading="loadingMarket">
        <el-table-column label="#" width="70">
          <template #default="{ $index }">{{ $index + 1 }}</template>
        </el-table-column>
        <el-table-column label="日利率" min-width="120">
          <template #default="{ row }">{{ formatPct(row.rateDaily * 100, 6) }}</template>
        </el-table-column>
        <el-table-column label="年化率" min-width="120">
          <template #default="{ row }">{{ formatPct(row.rateAprPct, 2) }}</template>
        </el-table-column>
        <el-table-column prop="period" label="天期" width="100" />
        <el-table-column prop="count" label="筆數" width="100" />
        <el-table-column label="金額" min-width="140">
          <template #default="{ row }">{{ formatAmount(row.amount) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default="{ row }">
            <div class="action-buttons">
              <el-button
                size="small"
                :loading="loadingDiagnostic"
                @click="openDiagnostic(row, 'LIVE')"
              >
                策略診斷
              </el-button>
              <el-button
                size="small"
                type="success"
                :loading="loadingSimulationDiagnostic"
                @click="openDiagnostic(row, 'SIMULATION')"
              >
                模擬診斷
              </el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-card shadow="never">
      <template #header>已成交紀錄（{{ selectedCurrency }}）</template>

      <el-table :data="tradeRows" stripe v-loading="loadingMarket">
        <el-table-column label="方向" width="120">
          <template #default="{ row }">
            <el-tag :type="row.direction === 'BORROW' ? 'danger' : 'success'" effect="dark" round>
              {{ row.direction === 'BORROW' ? '借入' : '出借' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="利率" min-width="120">
          <template #default="{ row }">{{ formatPct(row.rateAprPct, 2) }}</template>
        </el-table-column>
        <el-table-column label="金額" min-width="140">
          <template #default="{ row }">{{ formatAmount(row.amount) }}</template>
        </el-table-column>
        <el-table-column prop="period" label="天期" width="100" />
        <el-table-column label="時間" min-width="190">
          <template #default="{ row }">{{ formatDateTime(row.mts) }}</template>
        </el-table-column>
      </el-table>
    </el-card>

    <el-dialog
      v-model="diagnosticDialogVisible"
      :title="diagnosticMode === 'SIMULATION' ? '模擬 Bot 策略診斷' : 'Bot 策略診斷'"
      width="960px"
      destroy-on-close
    >
      <div v-loading="loadingDiagnostic || loadingSimulationDiagnostic">
        <template v-if="diagnostic">
          <el-alert
            v-if="diagnostic.mode === 'SIMULATION'"
            type="info"
            :closable="false"
            show-icon
            title="模擬模式：忽略 botEnabled / autoRelist / ACTIVE 掛單 / 實際餘額，只看現行策略會不會選中這筆需求。"
            class="section-alert"
          />

          <el-alert
            :type="diagnostic.gate?.canPlaceNow ? 'success' : 'warning'"
            :closable="false"
            show-icon
            :title="
              diagnostic.mode === 'SIMULATION'
                ? diagnostic.gate?.canPlaceNow
                  ? '模擬結果：這筆需求會被現行策略選中。'
                  : '模擬結果：這筆需求不會被現行策略選中。'
                : diagnostic.gate?.canPlaceNow
                  ? '目前 bot 會考慮承接這筆借款需求。'
                  : '目前 bot 不會承接這筆借款需求。'
            "
          />

          <el-timeline class="section-mini" v-if="(diagnostic.assumptions || []).length">
            <el-timeline-item v-for="item in diagnostic.assumptions" :key="item" type="primary">
              {{ item }}
            </el-timeline-item>
          </el-timeline>

          <el-descriptions :column="3" border class="section">
            <el-descriptions-item label="策略模式">
              {{ strategyModeLabel(diagnostic.bot?.strategyMode) }}
            </el-descriptions-item>
            <el-descriptions-item label="Bot 幣種（僅顯示）">
              {{ diagnostic.bot?.configuredCurrency || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="本次診斷幣種">
              {{ diagnostic.bot?.diagnosticCurrency || diagnostic.target?.currency || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="目標幣種">
              {{ diagnostic.target?.currency || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="Funding 可用餘額">
              {{ formatAmount(diagnostic.bot?.available) }}
            </el-descriptions-item>
            <el-descriptions-item label="可用下單餘額">
              {{ formatAmount(diagnostic.bot?.effectiveAvailable) }}
            </el-descriptions-item>
            <el-descriptions-item label="有效最小金額">
              {{ formatAmount(diagnostic.bot?.effectiveMinAmount) }}
            </el-descriptions-item>
            <el-descriptions-item label="歷史送單次數">
              {{ diagnostic.bot?.submittedCount || 0 }}
            </el-descriptions-item>
            <el-descriptions-item label="ACTIVE 掛單數量">
              {{ diagnostic.bot?.activeOffersCount || 0 }}
            </el-descriptions-item>
            <el-descriptions-item label="autoRelist">
              {{ diagnostic.bot?.autoRelist ? '開啟' : '關閉' }}
            </el-descriptions-item>
          </el-descriptions>

          <div class="section">
            <h3>目標借款需求</h3>
            <el-descriptions :column="4" border>
              <el-descriptions-item label="日利率">
                {{ formatPct((diagnostic.target?.rateDaily || 0) * 100, 6) }}
              </el-descriptions-item>
              <el-descriptions-item label="年化率">
                {{ formatPct(diagnostic.target?.rateAprPct || 0, 2) }}
              </el-descriptions-item>
              <el-descriptions-item label="天期">
                {{ diagnostic.target?.period || 0 }}
              </el-descriptions-item>
              <el-descriptions-item label="金額">
                {{ formatAmount(diagnostic.target?.amount) }}
              </el-descriptions-item>
            </el-descriptions>
          </div>

          <div class="section">
            <h3>阻擋原因</h3>
            <el-empty
              v-if="!(diagnostic.gate?.blockers || []).length"
              description="目前沒有阻擋原因。"
            />
            <el-timeline v-else>
              <el-timeline-item
                v-for="item in diagnostic.gate.blockers"
                :key="`${item.code}-${item.message}`"
                type="warning"
              >
                <strong>{{ item.code }}</strong>
                <div>{{ item.message }}</div>
              </el-timeline-item>
            </el-timeline>
          </div>

          <div class="section">
            <h3>目前選中的最佳方案</h3>
            <el-empty
              v-if="!diagnostic.planner?.selectedContext"
              description="目前沒有可用的 planner context。"
            />
            <el-descriptions v-else :column="3" border>
              <el-descriptions-item label="選中天期">
                {{ diagnostic.planner.selectedContext.period }} 天
              </el-descriptions-item>
              <el-descriptions-item label="選中日利率">
                {{ formatPct(diagnostic.planner.selectedContext.bestRateDaily * 100, 6) }}
              </el-descriptions-item>
              <el-descriptions-item label="選中年化率">
                {{ formatPct(diagnostic.planner.selectedContext.bestRateAprPct, 2) }}
              </el-descriptions-item>
              <el-descriptions-item label="最佳金額">
                {{ formatAmount(diagnostic.planner.selectedContext.bestAmountUsd) }}
              </el-descriptions-item>
              <el-descriptions-item label="預估成交機率">
                {{ formatProbability(diagnostic.planner.selectedContext.fillProbability) }}
              </el-descriptions-item>
              <el-descriptions-item label="預估成交時間">
                {{ formatMinutes(diagnostic.planner.selectedContext.expectedFillMinutes) }}
              </el-descriptions-item>
              <el-descriptions-item label="Planner 結論">
                {{ diagnostic.planner.selectedContext.shouldPlace ? '應下單' : '不下單' }}
              </el-descriptions-item>
              <el-descriptions-item label="最佳借款日利率">
                {{ formatPct(diagnostic.planner.selectedContext.bestTakeableRate * 100, 6) }}
              </el-descriptions-item>
              <el-descriptions-item label="評估天期範圍">
                {{ (diagnostic.planner?.planningPeriods || []).join(' / ') }}
              </el-descriptions-item>
            </el-descriptions>
            <p class="reason-text" v-if="diagnostic.planner?.selectedContext?.reason">
              {{ diagnostic.planner.selectedContext.reason }}
            </p>
          </div>

          <div class="section">
            <h3>預計掛單預覽</h3>
            <el-empty
              v-if="!(diagnostic.planner?.ladderPreview || []).length"
              description="目前沒有預計掛單。"
            />
            <el-table v-else :data="diagnostic.planner.ladderPreview" size="small" border>
              <el-table-column prop="rung" label="階層" width="80" />
              <el-table-column label="金額" min-width="140">
                <template #default="{ row }">{{ formatAmount(row.amountUsd) }}</template>
              </el-table-column>
              <el-table-column label="日利率" min-width="140">
                <template #default="{ row }">{{ formatPct(row.rate * 100, 6) }}</template>
              </el-table-column>
              <el-table-column label="年化率" min-width="140">
                <template #default="{ row }">{{ formatPct(row.rate * 365 * 100, 2) }}</template>
              </el-table-column>
              <el-table-column prop="period" label="天期" width="100" />
            </el-table>
          </div>

          <div class="section">
            <h3>與目標需求的匹配結果</h3>
            <el-descriptions :column="3" border>
              <el-descriptions-item label="幣種相符">
                {{ diagnostic.targetEvaluation?.compatibleCurrency ? '是' : '否' }}
              </el-descriptions-item>
              <el-descriptions-item label="天期相符">
                {{ diagnostic.targetEvaluation?.compatiblePeriod ? '是' : '否' }}
              </el-descriptions-item>
              <el-descriptions-item label="利率相符">
                {{ diagnostic.targetEvaluation?.compatibleRate ? '是' : '否' }}
              </el-descriptions-item>
              <el-descriptions-item label="可匹配掛單數量">
                {{ diagnostic.targetEvaluation?.matchableOrderCount || 0 }}
              </el-descriptions-item>
              <el-descriptions-item label="可承接金額">
                {{ formatAmount(diagnostic.targetEvaluation?.targetFillableUsd) }}
              </el-descriptions-item>
              <el-descriptions-item label="是否可全部承接">
                {{ diagnostic.targetEvaluation?.fullyConsumesTarget ? '是' : '否' }}
              </el-descriptions-item>
            </el-descriptions>

            <el-timeline
              class="section-mini"
              v-if="(diagnostic.targetEvaluation?.notes || []).length"
            >
              <el-timeline-item
                v-for="note in diagnostic.targetEvaluation.notes"
                :key="note"
                type="primary"
              >
                {{ note }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </div>
    </el-dialog>
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

.reason-text {
  margin: 12px 0 0;
  color: #475569;
  line-height: 1.7;
}
</style>
