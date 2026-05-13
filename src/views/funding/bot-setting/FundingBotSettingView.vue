<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { ElNotification } from '@/lib/element-plus'
import { useFetch, useMutation } from '@/hooks'
import { formatAmount, formatTime, formatRate } from '@/utils'
import {
  getFundingsSettingsUsecase,
  getFundingsBotStatusUsecase,
  getFundingsBotLogsUsecase,
  updateFundingsSettingsUsecase,
  updateFundingsBotEnabledUsecase,
  updateFundingsReserveAmountUsecase,
  updateFundingsBotConfigUsecase,
} from '@/domain/usecase'

// 支援的 funding 幣種顯示清單。
const currencyOptions = ['TESTUSDT', 'TESTUSD', 'USDT', 'USD']
const strategyModeOptions = [
  { value: 'BEST_EXECUTION', label: '最佳成交模式' },
  { value: 'HIGH_RATE_WAIT', label: '高利率等待模式' },
]

const settingsDataReactive = reactive({
  apiKey: '',
  apiSecret: '',
  botConfig: {
    strategyId: '',
    strategyMode: '',
    currency: '',
    minAmount: 0,
    period: 0,
    minDailyRate: 0,
    autoRelist: false,
    tickIntervalSec: 0,
  },
  botEnabled: false,
  hasCredentials: false,
  reserveAmount: 0,
  updatedAt: '',
})

const botStatusReactive = reactive({
  status: 'STOPPED',
  dryRun: true,
  hasCredentials: false,
  activeOffersCount: 0,
  lastTickAt: null,
  nextTickAt: null,
  lastSuccessAt: null,
  updatedAt: null,
  lastAction: {
    at: '',
    message: '',
    source: '',
    type: '',
  },
  lastError: {
    at: '',
    message: '',
  },
  metrics: {
    submittedCount: 0,
    available: 0,
    effectiveAvailable: 0,
  },
  config: {
    strategyId: 'market-best-executable-apy-v2',
    strategyMode: 'BEST_EXECUTION',
    currency: 'TESTUSD',
    minAmount: 150,
    period: 120,
    minDailyRate: 0.000001,
    autoRelist: false,
    tickIntervalSec: 30,
  },
})

const logsPaginationReactive = reactive({
  page: 1,
  limit: 25,
  total: 0,
})

const { refetch: refetchFundingsBotSettings } = useFetch(getFundingsSettingsUsecase, null, {
  onSuccess: (data) => {
    Object.assign(settingsDataReactive, data)
  },
})

const { refetch: refetchFundingsBotStatus } = useFetch(getFundingsBotStatusUsecase, null, {
  onSuccess: (data) => {
    Object.assign(botStatusReactive, data)
  },
})

const { data: botLogs, refetch: refetchFundingsBotLogs } = useFetch(
  getFundingsBotLogsUsecase,
  { page: logsPaginationReactive.page, limit: logsPaginationReactive.limit },
  {
    onSuccess: (data) => {
      console.log(data)
      logsPaginationReactive.total = data.total
    },
    queryKey: ['botLogs', logsPaginationReactive.page, logsPaginationReactive.limit],
  },
)

const { mutate: updateFundingsSettings } = useMutation(updateFundingsSettingsUsecase)
const { mutate: updateFundingsBotEnabled } = useMutation(updateFundingsBotEnabledUsecase)
const { mutate: updateFundingsReserveAmount } = useMutation(updateFundingsReserveAmountUsecase)
const { mutate: updateFundingsBotConfig } = useMutation(updateFundingsBotConfigUsecase)

const strategyModeHint = computed(() =>
  settingsDataReactive.botConfig.strategyMode === 'HIGH_RATE_WAIT'
    ? '高利率等待模式會提高利率權重、放寬等待時間，偏向掛在較高年化價位等待市場追價成交。'
    : '最佳成交模式會優先考慮成交機率與等待時間，選擇目前較容易成交的最佳方案。',
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
 * 處理strategy Mode Label邏輯。
 * @param value - 輸入值。
 */

function strategyModeLabel(value: string) {
  // 舊資料中的 SEMI_AUTO 仍要映射到新模式。
  let text = String(value || '').toUpperCase()
  if (text === 'HIGH_RATE_WAIT' || text === 'SEMI_AUTO') {
    text = 'HIGH_RATE_WAIT'
  }
  text = 'BEST_EXECUTION'

  return text === 'HIGH_RATE_WAIT' ? '高利率等待模式' : '最佳成交模式'
}

/**
 * 處理status Tag Type邏輯。
 * @param input - 輸入值。
 */

function statusTagType(input: string) {
  const text = String(input || '').toUpperCase()
  if (text === 'ERROR') {
    return 'danger'
  }
  if (text === 'STOPPED') {
    return 'info'
  }
  if (text === 'RUNNING') {
    return 'success'
  }
  if (text.includes('WAIT') || text.includes('PAUSED')) {
    return 'warning'
  }
  return 'primary'
}

/**
 * 取得load Bot Logs相關資料。
 * @param page - 分頁或筆數參數。
 * @param notify - 函式輸入參數。
 */

// async function loadBotLogs(page = logsPagination.page, notify = false) {
//   loadingLogs.value = true
//   try {
//     const response = await fetchFundingsBotLogs({
//       page,
//       limit: logsPagination.limit,
//     })
//     const data = response?.data || {}
//     logs.value = Array.isArray(data.items) ? data.items : []
//     logsPagination.page = Number(data.page || page || 1)
//     logsPagination.limit = Number(data.limit || logsPagination.limit)
//     logsPagination.total = Number(data.total || 0)
//     if (notify) {
//       notifySuccess('讀取完成', '最近執行紀錄已更新。')
//     }
//   } catch (error) {
//     notifyError('讀取紀錄失敗', error)
//   } finally {
//     loadingLogs.value = false
//   }
// }

/**
 * 處理handle Logs Page Change流程。
 * @param page - 分頁或筆數參數。
 */

function handleLogsPageChange(page: number) {
  logsPaginationReactive.page = page
}

/** 儲存 Bitfinex API 憑證 */
const handleSaveSettings = async () => {
  await updateFundingsSettings({
    apiKey: settingsDataReactive.apiKey,
    apiSecret: settingsDataReactive.apiSecret,
  })

  notifySuccess('儲存完成', 'API 憑證已更新。')
}

const handelReFetchData = async () => {
  await Promise.all([refetchFundingsBotSettings(), refetchFundingsBotStatus()])
}

/**
 * 更新save Bot Enabled相關資料。
 */
async function handelSwitchBotEnabled(enabled: boolean) {
  try {
    await updateFundingsBotEnabled({ enabled })
    await refetchFundingsBotSettings()
    notifySuccess('儲存完成', `機器人已${enabled ? '啟用' : '停用'}。`)
  } catch (error) {
    notifyError('更新啟用狀態失敗', error)
  }
}

/**
 * 更新save Reserve Amount相關資料。
 */

const handelSaveReserveAmount = async () => {
  if (Number(settingsDataReactive.reserveAmount) <= 0) {
    ElNotification({
      title: '儲存失敗',
      message: '保留金額不得小於 0。',
      type: 'error',
    })
    return
  }

  if (Number(settingsDataReactive.reserveAmount) <= 150) {
    ElNotification({
      title: '儲存失敗',
      message: '保留金額不得小於 150。',
      type: 'error',
    })
    return
  }

  try {
    await updateFundingsReserveAmount({ reserveAmount: Number(settingsDataReactive.reserveAmount) })
    notifySuccess('儲存完成', '保留金額已更新。')
  } catch (error) {
    notifyError('儲存保留金額失敗', error)
  }
}

/**
 * 更新save Bot Config相關資料。
 */

const handelSaveBotConfig = async () => {
  try {
    await updateFundingsBotConfig({
      strategyId: settingsDataReactive.botConfig.strategyId,
      strategyMode: settingsDataReactive.botConfig.strategyMode,
      currency: settingsDataReactive.botConfig.currency,
      minAmount: Number(settingsDataReactive.botConfig.minAmount || 0),
      period: Number(settingsDataReactive.botConfig.period || 120),
      minDailyRate: Number(settingsDataReactive.botConfig.minDailyRate || 0.000001),
      autoRelist: Boolean(settingsDataReactive.botConfig.autoRelist),
      tickIntervalSec: Number(settingsDataReactive.botConfig.tickIntervalSec || 30),
    })
    notifySuccess('儲存完成', 'Bot 策略設定已更新。')
    await refetchFundingsBotSettings()
  } catch (error) {
    notifyError('儲存 Bot 設定失敗', error)
  }
}
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <div>
        <h2>機器人設定</h2>
        <p class="toolbar-desc">管理 Bitfinex API 憑證、bot 啟用狀態、策略模式與最近執行紀錄。</p>
      </div>
      <div class="inline-row">
        <el-button @click="handelReFetchData">重新取得資料</el-button>
      </div>
    </div>

    <el-card shadow="never">
      <template #header>Bitfinex API 憑證</template>
      <el-form :model="settingsDataReactive" label-position="top">
        <el-form-item label="API Key">
          <el-input v-model="settingsDataReactive.apiKey" placeholder="輸入 Bitfinex API Key" />
        </el-form-item>
        <el-form-item label="API Secret">
          <el-input
            v-model="settingsDataReactive.apiSecret"
            placeholder="輸入 Bitfinex API Secret"
          />
        </el-form-item>
        <el-button type="primary" @click="handleSaveSettings"> 儲存 API 憑證 </el-button>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <template #header>機器人啟用與資金保留</template>
      <el-form :model="settingsDataReactive" label-position="top">
        <el-form-item label="啟用自動放貸機器人">
          <div class="inline-row">
            <el-switch v-model="settingsDataReactive.botEnabled" @change="handelSwitchBotEnabled" />
            <span>{{ settingsDataReactive.botEnabled ? '目前為啟用' : '目前為關閉' }}</span>
          </div>
        </el-form-item>

        <el-form-item label="保留金額">
          <div class="inline-row">
            <el-input-number
              v-model="settingsDataReactive.reserveAmount"
              :min="0"
              :step="1"
              controls-position="right"
            />
            <el-button type="primary" @click="handelSaveReserveAmount"> 儲存保留金額 </el-button>
          </div>
        </el-form-item>
        <div class="field-tip">當 funding 可用餘額小於或等於保留金額時，bot 不會再送出新單。</div>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <template #header>Bot 策略設定</template>
      <el-form :model="settingsDataReactive.botConfig" label-position="top">
        <el-row :gutter="16">
          <el-col :xs="24" :md="8">
            <el-form-item label="策略模式">
              <el-select v-model="settingsDataReactive.botConfig.strategyMode">
                <el-option
                  v-for="item in strategyModeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="field-tip">{{ strategyModeHint }}</div>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="策略 ID">
              <el-input v-model="settingsDataReactive.botConfig.strategyId" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="顯示幣種">
              <el-select v-model="settingsDataReactive.botConfig.currency">
                <el-option
                  v-for="currency in currencyOptions"
                  :key="currency"
                  :label="currency"
                  :value="currency"
                />
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="放貸天數（由策略動態決定）">
              <el-input-number
                v-model="settingsDataReactive.botConfig.period"
                :min="2"
                :max="120"
                :step="1"
                :disabled="true"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="最小放貸金額（Bitfinex 最低 150）">
              <el-input-number
                v-model="settingsDataReactive.botConfig.minAmount"
                :min="150"
                :step="1"
                :precision="8"
                :disabled="true"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="最低日利率（由策略動態決定）">
              <el-input-number
                v-model="settingsDataReactive.botConfig.minDailyRate"
                :min="0.000001"
                :step="0.000001"
                :precision="8"
                :disabled="true"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="輪詢秒數">
              <el-input-number
                v-model="settingsDataReactive.botConfig.tickIntervalSec"
                :min="5"
                :max="3600"
                :step="5"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="自動重新掛單">
              <el-switch v-model="settingsDataReactive.botConfig.autoRelist" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-button type="primary" @click="handelSaveBotConfig"> 儲存 Bot 設定 </el-button>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <template #header>目前 Bot 狀態</template>
      <el-descriptions :column="3" border>
        <el-descriptions-item label="狀態">
          <el-tag :type="statusTagType(botStatusReactive.status)">{{
            botStatusReactive.status || '-'
          }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Dry Run">{{
          botStatusReactive.dryRun ? '是' : '否'
        }}</el-descriptions-item>
        <el-descriptions-item label="已設定 API 憑證">{{
          botStatusReactive.hasCredentials ? '是' : '否'
        }}</el-descriptions-item>
        <el-descriptions-item label="策略模式">{{
          strategyModeLabel(botStatusReactive.config.strategyMode)
        }}</el-descriptions-item>
        <el-descriptions-item label="顯示幣種">{{
          botStatusReactive.config.currency || '-'
        }}</el-descriptions-item>
        <el-descriptions-item label="ACTIVE 掛單數量">{{
          botStatusReactive.activeOffersCount
        }}</el-descriptions-item>
        <el-descriptions-item label="歷史送單次數">{{
          botStatusReactive.metrics.submittedCount
        }}</el-descriptions-item>
        <el-descriptions-item label="Funding 可用餘額">{{
          formatAmount(botStatusReactive.metrics.available)
        }}</el-descriptions-item>
        <el-descriptions-item label="扣除保留後可用">{{
          formatAmount(botStatusReactive.metrics.effectiveAvailable)
        }}</el-descriptions-item>
        <el-descriptions-item label="策略參考 period"
          >{{ botStatusReactive.config.period || '-' }} 天</el-descriptions-item
        >
        <el-descriptions-item label="策略參考最低日利率">{{
          formatRate(botStatusReactive.config.minDailyRate)
        }}</el-descriptions-item>
        <el-descriptions-item label="輪詢秒數"
          >{{ botStatusReactive.config.tickIntervalSec || '-' }} 秒</el-descriptions-item
        >
        <el-descriptions-item label="下次執行時間">{{
          formatTime(botStatusReactive.nextTickAt)
        }}</el-descriptions-item>
        <el-descriptions-item label="最近執行時間">{{
          formatTime(botStatusReactive.lastTickAt)
        }}</el-descriptions-item>
        <el-descriptions-item label="最近成功時間">{{
          formatTime(botStatusReactive.lastSuccessAt)
        }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="card-header-row">
          <span>最近執行紀錄</span>
          <el-button @click="refetchFundingsBotLogs">reFetch</el-button>
        </div>
      </template>

      <el-table :data="botLogs?.items || []" stripe>
        <el-table-column label="時間" min-width="180">
          <template #default="{ row }">{{ formatTime(row.createdAt) }}</template>
        </el-table-column>
        <el-table-column prop="level" label="等級" width="100" />
        <el-table-column prop="event" label="事件" width="220" />
        <el-table-column prop="message" label="訊息" min-width="360" />
      </el-table>

      <div class="pagination-wrap">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :current-page="logsPaginationReactive.page"
          :page-size="logsPaginationReactive.limit"
          :total="logsPaginationReactive.total"
          @current-change="handleLogsPageChange"
        />
      </div>
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

.inline-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.field-tip {
  margin-top: 8px;
  color: #64748b;
  font-size: 13px;
  line-height: 1.6;
}

.card-header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.pagination-wrap {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

.status-block {
  margin-top: 16px;
}

.status-block h4 {
  margin: 0 0 8px;
}

.status-block p {
  margin: 0;
}

.error-text {
  color: #dc2626;
}
</style>
