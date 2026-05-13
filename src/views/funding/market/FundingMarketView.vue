<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useQuery } from '@/lib/vue-query'
import { ElNotification } from '@/lib/element-plus'
import { getFundingsMarketUsecase } from '@/domain/usecase'

const MARKET_LEN = 25

const selectedCurrencyRef = ref('TESTUSDT')
const currencyOptions = ['TESTUSDT', 'TESTUSD', 'USDT', 'USD']

const diagnosticDialogVisibleRef = ref(false)
/** 預留：接上診斷 usecase 後改為明確 DTO 型別 */
const diagnosticRef = ref<any>(null)
const diagnosticModeRef = ref('LIVE')

const diagnosticUnavailableHint = '診斷 API／usecase 尚未接上，無法使用'

const marketQuery = useQuery({
  queryKey: computed(() => ['fundingsMarket', selectedCurrencyRef.value, MARKET_LEN]),
  queryFn: () =>
    getFundingsMarketUsecase({
      currency: selectedCurrencyRef.value,
      len: MARKET_LEN,
    }),
  refetchOnWindowFocus: false,
  retry: false,
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
 * 從錯誤物件取出可供顯示的訊息字串。
 *
 * @param params - `error` 為 API 或執行期錯誤。
 * @returns 使用者可讀的錯誤說明。
 */
const readError = ({ error }: { error: unknown }): string => {
  const err = error as { response?: { data?: { message?: string } }; message?: string }
  return err?.response?.data?.message || err?.message || '操作失敗'
}

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
    message: readError({ error }),
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
 * 將數值格式化為帶百分比的顯示字串。
 *
 * @param params - `value` 為原始數值，`digits` 為小數位數。
 * @returns 例如 `1.23%`。
 */
const formatPct = ({ value, digits = 2 }: { value: number; digits?: number }): string => {
  return `${Number(value || 0).toFixed(digits)}%`
}

/**
 * 將金額格式化為繁中地區分隔顯示。
 *
 * @param params - `value` 為金額，預設依 0 處理。
 * @returns 地區化數字字串。
 */
const formatAmount = ({ value = 0 }: { value?: number }): string => {
  return Number(value || 0).toLocaleString('zh-TW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })
}

/**
 * 將 0–1 機率轉成百分比顯示。
 *
 * @param params - `value` 為機率。
 * @returns 百分比字串。
 */
const formatProbability = ({ value }: { value: number }): string => {
  return `${(Number(value || 0) * 100).toFixed(2)}%`
}

/**
 * 將分鐘數格式化為可讀時間描述。
 *
 * @param params - `value` 為分鐘數。
 * @returns 如「分鐘」「小時」或「極長時間」。
 */
const formatMinutes = ({ value }: { value: number }): string => {
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
 * 將時間戳（毫秒）格式化為本地日期時間字串。
 *
 * @param params - `value` 為毫秒時間戳。
 * @returns `YYYY-MM-DD HH:mm:ss` 或 `-`。
 */
const formatDateTime = ({ value }: { value: number }): string => {
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
 * 將策略模式代碼轉為中文標籤。
 *
 * @param params - `value` 為後端策略模式字串。
 * @returns 中文模式名稱。
 */
const strategyModeLabel = ({ value }: { value?: string }): string => {
  return String(value || '').toUpperCase() === 'HIGH_RATE_WAIT' ? '高利率等待模式' : '最佳成交模式'
}

/**
 * 重新請求市場資料並依選項顯示提示。
 *
 * @param params - `showSuccess` 為真時顯示重新整理成功通知。
 */
const loadMarket = async ({ showSuccess = false }: { showSuccess?: boolean } = {}): Promise<void> => {
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
          <template #default="{ row }">{{ formatPct({ value: row.rateAprPct, digits: 2 }) }}</template>
        </el-table-column>
        <el-table-column prop="period" label="天期" width="100" />
        <el-table-column prop="count" label="筆數" width="100" />
        <el-table-column label="金額" min-width="140">
          <template #default="{ row }">{{ formatAmount({ value: row.amount }) }}</template>
        </el-table-column>
        <el-table-column label="操作" width="220" fixed="right">
          <template #default>
            <div class="action-buttons">
              <el-tooltip :content="diagnosticUnavailableHint" placement="top">
                <span class="tooltip-trigger-wrap">
                  <el-button size="small" disabled>策略診斷</el-button>
                </span>
              </el-tooltip>
              <el-tooltip :content="diagnosticUnavailableHint" placement="top">
                <span class="tooltip-trigger-wrap">
                  <el-button size="small" type="success" disabled>模擬診斷</el-button>
                </span>
              </el-tooltip>
            </div>
          </template>
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
          <template #default="{ row }">{{ formatPct({ value: row.rateAprPct, digits: 2 }) }}</template>
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

    <el-dialog
      v-model="diagnosticDialogVisibleRef"
      :title="diagnosticModeRef === 'SIMULATION' ? '模擬 Bot 策略診斷' : 'Bot 策略診斷'"
      width="960px"
      destroy-on-close
    >
      <div>
        <template v-if="diagnosticRef">
          <el-alert
            v-if="diagnosticRef.mode === 'SIMULATION'"
            type="info"
            :closable="false"
            show-icon
            title="模擬模式：忽略 botEnabled / autoRelist / ACTIVE 掛單 / 實際餘額，只看現行策略會不會選中這筆需求。"
            class="section-alert"
          />

          <el-alert
            :type="diagnosticRef.gate?.canPlaceNow ? 'success' : 'warning'"
            :closable="false"
            show-icon
            :title="
              diagnosticRef.mode === 'SIMULATION'
                ? diagnosticRef.gate?.canPlaceNow
                  ? '模擬結果：這筆需求會被現行策略選中。'
                  : '模擬結果：這筆需求不會被現行策略選中。'
                : diagnosticRef.gate?.canPlaceNow
                  ? '目前 bot 會考慮承接這筆借款需求。'
                  : '目前 bot 不會承接這筆借款需求。'
            "
          />

          <el-timeline class="section-mini" v-if="(diagnosticRef.assumptions || []).length">
            <el-timeline-item v-for="item in diagnosticRef.assumptions" :key="item" type="primary">
              {{ item }}
            </el-timeline-item>
          </el-timeline>

          <el-descriptions :column="3" border class="section">
            <el-descriptions-item label="策略模式">
              {{ strategyModeLabel({ value: diagnosticRef.bot?.strategyMode }) }}
            </el-descriptions-item>
            <el-descriptions-item label="Bot 幣種（僅顯示）">
              {{ diagnosticRef.bot?.configuredCurrency || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="本次診斷幣種">
              {{ diagnosticRef.bot?.diagnosticCurrency || diagnosticRef.target?.currency || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="目標幣種">
              {{ diagnosticRef.target?.currency || '-' }}
            </el-descriptions-item>
            <el-descriptions-item label="Funding 可用餘額">
              {{ formatAmount({ value: diagnosticRef.bot?.available }) }}
            </el-descriptions-item>
            <el-descriptions-item label="可用下單餘額">
              {{ formatAmount({ value: diagnosticRef.bot?.effectiveAvailable }) }}
            </el-descriptions-item>
            <el-descriptions-item label="有效最小金額">
              {{ formatAmount({ value: diagnosticRef.bot?.effectiveMinAmount }) }}
            </el-descriptions-item>
            <el-descriptions-item label="歷史送單次數">
              {{ diagnosticRef.bot?.submittedCount || 0 }}
            </el-descriptions-item>
            <el-descriptions-item label="ACTIVE 掛單數量">
              {{ diagnosticRef.bot?.activeOffersCount || 0 }}
            </el-descriptions-item>
            <el-descriptions-item label="autoRelist">
              {{ diagnosticRef.bot?.autoRelist ? '開啟' : '關閉' }}
            </el-descriptions-item>
          </el-descriptions>

          <div class="section">
            <h3>目標借款需求</h3>
            <el-descriptions :column="4" border>
              <el-descriptions-item label="日利率">
                {{
                  formatPct({
                    value: (diagnosticRef.target?.rateDaily || 0) * 100,
                    digits: 6,
                  })
                }}
              </el-descriptions-item>
              <el-descriptions-item label="年化率">
                {{ formatPct({ value: diagnosticRef.target?.rateAprPct || 0, digits: 2 }) }}
              </el-descriptions-item>
              <el-descriptions-item label="天期">
                {{ diagnosticRef.target?.period || 0 }}
              </el-descriptions-item>
              <el-descriptions-item label="金額">
                {{ formatAmount({ value: diagnosticRef.target?.amount }) }}
              </el-descriptions-item>
            </el-descriptions>
          </div>

          <div class="section">
            <h3>阻擋原因</h3>
            <el-empty
              v-if="!(diagnosticRef.gate?.blockers || []).length"
              description="目前沒有阻擋原因。"
            />
            <el-timeline v-else>
              <el-timeline-item
                v-for="item in diagnosticRef.gate.blockers"
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
              v-if="!diagnosticRef.planner?.selectedContext"
              description="目前沒有可用的 planner context。"
            />
            <el-descriptions v-else :column="3" border>
              <el-descriptions-item label="選中天期">
                {{ diagnosticRef.planner.selectedContext.period }} 天
              </el-descriptions-item>
              <el-descriptions-item label="選中日利率">
                {{
                  formatPct({
                    value: diagnosticRef.planner.selectedContext.bestRateDaily * 100,
                    digits: 6,
                  })
                }}
              </el-descriptions-item>
              <el-descriptions-item label="選中年化率">
                {{
                  formatPct({
                    value: diagnosticRef.planner.selectedContext.bestRateAprPct,
                    digits: 2,
                  })
                }}
              </el-descriptions-item>
              <el-descriptions-item label="最佳金額">
                {{ formatAmount({ value: diagnosticRef.planner.selectedContext.bestAmountUsd }) }}
              </el-descriptions-item>
              <el-descriptions-item label="預估成交機率">
                {{
                  formatProbability({
                    value: diagnosticRef.planner.selectedContext.fillProbability,
                  })
                }}
              </el-descriptions-item>
              <el-descriptions-item label="預估成交時間">
                {{
                  formatMinutes({
                    value: diagnosticRef.planner.selectedContext.expectedFillMinutes,
                  })
                }}
              </el-descriptions-item>
              <el-descriptions-item label="Planner 結論">
                {{ diagnosticRef.planner.selectedContext.shouldPlace ? '應下單' : '不下單' }}
              </el-descriptions-item>
              <el-descriptions-item label="最佳借款日利率">
                {{
                  formatPct({
                    value: diagnosticRef.planner.selectedContext.bestTakeableRate * 100,
                    digits: 6,
                  })
                }}
              </el-descriptions-item>
              <el-descriptions-item label="評估天期範圍">
                {{ (diagnosticRef.planner?.planningPeriods || []).join(' / ') }}
              </el-descriptions-item>
            </el-descriptions>
            <p class="reason-text" v-if="diagnosticRef.planner?.selectedContext?.reason">
              {{ diagnosticRef.planner.selectedContext.reason }}
            </p>
          </div>

          <div class="section">
            <h3>預計掛單預覽</h3>
            <el-empty
              v-if="!(diagnosticRef.planner?.ladderPreview || []).length"
              description="目前沒有預計掛單。"
            />
            <el-table v-else :data="diagnosticRef.planner.ladderPreview" size="small" border>
              <el-table-column prop="rung" label="階層" width="80" />
              <el-table-column label="金額" min-width="140">
                <template #default="{ row }">{{ formatAmount({ value: row.amountUsd }) }}</template>
              </el-table-column>
              <el-table-column label="日利率" min-width="140">
                <template #default="{ row }">{{
                  formatPct({ value: row.rate * 100, digits: 6 })
                }}</template>
              </el-table-column>
              <el-table-column label="年化率" min-width="140">
                <template #default="{ row }">{{
                  formatPct({ value: row.rate * 365 * 100, digits: 2 })
                }}</template>
              </el-table-column>
              <el-table-column prop="period" label="天期" width="100" />
            </el-table>
          </div>

          <div class="section">
            <h3>與目標需求的匹配結果</h3>
            <el-descriptions :column="3" border>
              <el-descriptions-item label="幣種相符">
                {{ diagnosticRef.targetEvaluation?.compatibleCurrency ? '是' : '否' }}
              </el-descriptions-item>
              <el-descriptions-item label="天期相符">
                {{ diagnosticRef.targetEvaluation?.compatiblePeriod ? '是' : '否' }}
              </el-descriptions-item>
              <el-descriptions-item label="利率相符">
                {{ diagnosticRef.targetEvaluation?.compatibleRate ? '是' : '否' }}
              </el-descriptions-item>
              <el-descriptions-item label="可匹配掛單數量">
                {{ diagnosticRef.targetEvaluation?.matchableOrderCount || 0 }}
              </el-descriptions-item>
              <el-descriptions-item label="可承接金額">
                {{ formatAmount({ value: diagnosticRef.targetEvaluation?.targetFillableUsd }) }}
              </el-descriptions-item>
              <el-descriptions-item label="是否可全部承接">
                {{ diagnosticRef.targetEvaluation?.fullyConsumesTarget ? '是' : '否' }}
              </el-descriptions-item>
            </el-descriptions>

            <el-timeline
              class="section-mini"
              v-if="(diagnosticRef.targetEvaluation?.notes || []).length"
            >
              <el-timeline-item
                v-for="note in diagnosticRef.targetEvaluation.notes"
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
