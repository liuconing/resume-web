<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { ElNotification } from 'element-plus'

// 支援的 funding 幣種顯示清單。
const currencyOptions = ['TESTUSDT', 'TESTUSD', 'USDT', 'USD']
const strategyModeOptions = [
  { value: 'BEST_EXECUTION', label: '最佳成交模式' },
  { value: 'HIGH_RATE_WAIT', label: '高利率等待模式' },
]

const loadingRead = ref(false)
const loadingSaveApi = ref(false)
const loadingSaveBotEnabled = ref(false)
const loadingSaveReserve = ref(false)
const loadingSaveBotConfig = ref(false)
const loadingRuntime = ref(false)
const loadingLogs = ref(false)
const loadingManualTick = ref(false)

const form = reactive({
  apiKey: '',
  apiSecret: '',
  botEnabled: false,
  reserveAmount: 0,
  botConfig: {
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

const status = reactive({
  status: 'STOPPED',
  dryRun: true,
  hasCredentials: false,
  activeOffersCount: 0,
  lastTickAt: null,
  nextTickAt: null,
  lastSuccessAt: null,
  updatedAt: null,
  lastAction: null,
  lastError: null,
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

const logs = ref([])
const logsPagination = reactive({
  page: 1,
  limit: 25,
  total: 0,
})

// 舊資料中的 SEMI_AUTO 仍要映射到新模式。
function normalizeStrategyMode(value) {
  const text = String(value || '').toUpperCase()
  if (text === 'HIGH_RATE_WAIT' || text === 'SEMI_AUTO') {
    return 'HIGH_RATE_WAIT'
  }
  return 'BEST_EXECUTION'
}

const strategyModeHint = computed(() =>
  form.botConfig.strategyMode === 'HIGH_RATE_WAIT'
    ? '高利率等待模式會提高利率權重、放寬等待時間，偏向掛在較高年化價位等待市場追價成交。'
    : '最佳成交模式會優先考慮成交機率與等待時間，選擇目前較容易成交的最佳方案。',
)

/**
 * 清理clear Whitespace相關資料。
 * @param value - 輸入值。
 */

function clearWhitespace(value) {
  return String(value || '').replace(/\s+/g, '')
}

/**
 * 處理sanitize Setting Field邏輯。
 * @param field - 函式輸入參數。
 */

function sanitizeSettingField(field) {
  form[field] = clearWhitespace(form[field])
}

/**
 * 取得read Error相關資料。
 * @param error - 錯誤物件。
 */

function readError(error) {
  return error?.response?.data?.message || error?.message || '操作失敗'
}

/**
 * 處理notify Success邏輯。
 * @param title - 函式輸入參數。
 * @param message - 函式輸入參數。
 */

function notifySuccess(title, message) {
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

function notifyError(title, error) {
  ElNotification({
    title,
    message: readError(error),
    type: 'error',
  })
}

/**
 * 格式化format Amount內容供顯示或輸出。
 * @param value - 輸入值。
 */

function formatAmount(value) {
  return Number(value || 0).toLocaleString('zh-TW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })
}

/**
 * 格式化format Rate內容供顯示或輸出。
 * @param value - 輸入值。
 */

function formatRate(value) {
  return `${(Number(value || 0) * 100).toFixed(6)}%`
}

/**
 * 格式化format Time內容供顯示或輸出。
 * @param value - 輸入值。
 */

function formatTime(value) {
  if (!value) {
    return '-'
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }
  return date.toLocaleString('zh-TW', { hour12: false })
}

/**
 * 處理strategy Mode Label邏輯。
 * @param value - 輸入值。
 */

function strategyModeLabel(value) {
  return normalizeStrategyMode(value) === 'HIGH_RATE_WAIT' ? '高利率等待模式' : '最佳成交模式'
}

/**
 * 處理status Tag Type邏輯。
 * @param input - 輸入值。
 */

function statusTagType(input) {
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

// 將設定 API 回傳資料同步到前端表單。
function applySettings(data = {}) {
  form.apiKey = clearWhitespace(data.apiKey)
  form.apiSecret = clearWhitespace(data.apiSecret)
  form.botEnabled = Boolean(data.botEnabled)
  form.reserveAmount = Number(data.reserveAmount || 0)
  form.botConfig = {
    strategyId: String(data.botConfig?.strategyId || 'market-best-executable-apy-v2'),
    strategyMode: normalizeStrategyMode(data.botConfig?.strategyMode || 'BEST_EXECUTION'),
    currency: String(data.botConfig?.currency || 'TESTUSD'),
    minAmount: Number(data.botConfig?.minAmount || 150),
    period: Number(data.botConfig?.period || 120),
    minDailyRate: Number(data.botConfig?.minDailyRate || 0.000001),
    autoRelist: Boolean(data.botConfig?.autoRelist),
    tickIntervalSec: Number(data.botConfig?.tickIntervalSec || 30),
  }
}

// 將 runtime API 回傳資料同步到狀態卡片。
function applyStatus(statusData = {}) {
  status.status = String(statusData.status || 'STOPPED')
  status.dryRun = Boolean(statusData.dryRun)
  status.hasCredentials = Boolean(statusData.hasCredentials)
  status.activeOffersCount = Number(statusData.activeOffersCount || 0)
  status.lastTickAt = statusData.lastTickAt || null
  status.nextTickAt = statusData.nextTickAt || null
  status.lastSuccessAt = statusData.lastSuccessAt || null
  status.updatedAt = statusData.updatedAt || null
  status.lastAction = statusData.lastAction || null
  status.lastError = statusData.lastError || null
  status.metrics = {
    submittedCount: Number(statusData.metrics?.submittedCount || 0),
    available: Number(statusData.metrics?.available || 0),
    effectiveAvailable: Number(statusData.metrics?.effectiveAvailable || 0),
  }
  status.config = {
    strategyId: String(statusData.config?.strategyId || 'market-best-executable-apy-v2'),
    strategyMode: normalizeStrategyMode(statusData.config?.strategyMode || 'BEST_EXECUTION'),
    currency: String(statusData.config?.currency || 'TESTUSD'),
    minAmount: Number(statusData.config?.minAmount || 150),
    period: Number(statusData.config?.period || 120),
    minDailyRate: Number(statusData.config?.minDailyRate || 0.000001),
    autoRelist: Boolean(statusData.config?.autoRelist),
    tickIntervalSec: Number(statusData.config?.tickIntervalSec || 30),
  }
}

/**
 * 取得load Settings相關資料。
 * @param notify - 函式輸入參數。
 */

async function loadSettings(notify = false) {
  loadingRead.value = true
  try {
    const response = await fetchFundingsSettings()
    applySettings(response?.data || {})
    if (notify) {
      notifySuccess('讀取完成', '機器人設定已更新。')
    }
  } catch (error) {
    notifyError('讀取設定失敗', error)
  } finally {
    loadingRead.value = false
  }
}

/**
 * 取得load Bot Status相關資料。
 * @param notify - 函式輸入參數。
 */

async function loadBotStatus(notify = false) {
  loadingRuntime.value = true
  try {
    const response = await fetchFundingsBotStatus()
    applyStatus(response?.data || {})
    if (notify) {
      notifySuccess('讀取完成', 'Bot 狀態已更新。')
    }
  } catch (error) {
    notifyError('讀取狀態失敗', error)
  } finally {
    loadingRuntime.value = false
  }
}

/**
 * 取得load Bot Logs相關資料。
 * @param page - 分頁或筆數參數。
 * @param notify - 函式輸入參數。
 */

async function loadBotLogs(page = logsPagination.page, notify = false) {
  loadingLogs.value = true
  try {
    const response = await fetchFundingsBotLogs({
      page,
      limit: logsPagination.limit,
    })
    const data = response?.data || {}
    logs.value = Array.isArray(data.items) ? data.items : []
    logsPagination.page = Number(data.page || page || 1)
    logsPagination.limit = Number(data.limit || logsPagination.limit)
    logsPagination.total = Number(data.total || 0)
    if (notify) {
      notifySuccess('讀取完成', '最近執行紀錄已更新。')
    }
  } catch (error) {
    notifyError('讀取紀錄失敗', error)
  } finally {
    loadingLogs.value = false
  }
}

/**
 * 取得load Bot Runtime相關資料。
 * @param notify - 函式輸入參數。
 */

async function loadBotRuntime(notify = false) {
  await Promise.all([loadBotStatus(notify), loadBotLogs(logsPagination.page, notify)])
}

/**
 * 處理handle Logs Page Change流程。
 * @param page - 分頁或筆數參數。
 */

async function handleLogsPageChange(page) {
  await loadBotLogs(page, false)
}

/**
 * 處理refresh Logs邏輯。
 */

async function refreshLogs() {
  await loadBotLogs(logsPagination.page, true)
}

/**
 * 更新save Settings相關資料。
 */

async function saveSettings() {
  sanitizeSettingField('apiKey')
  sanitizeSettingField('apiSecret')
  loadingSaveApi.value = true
  try {
    await updateFundingsSettings({
      apiKey: form.apiKey,
      apiSecret: form.apiSecret,
    })
    notifySuccess('儲存完成', 'API 憑證已更新。')
    await loadBotRuntime(false)
  } catch (error) {
    notifyError('儲存 API 憑證失敗', error)
  } finally {
    loadingSaveApi.value = false
  }
}

/**
 * 更新save Bot Enabled相關資料。
 */

async function saveBotEnabled() {
  loadingSaveBotEnabled.value = true
  try {
    await updateFundingsBotEnabled(Boolean(form.botEnabled))
    notifySuccess('儲存完成', `機器人已${form.botEnabled ? '啟用' : '停用'}。`)
    await loadBotRuntime(false)
  } catch (error) {
    notifyError('更新啟用狀態失敗', error)
  } finally {
    loadingSaveBotEnabled.value = false
  }
}

/**
 * 更新save Reserve Amount相關資料。
 */

async function saveReserveAmount() {
  if (Number(form.reserveAmount) < 0) {
    ElNotification({
      title: '儲存失敗',
      message: '保留金額不得小於 0。',
      type: 'error',
    })
    return
  }

  loadingSaveReserve.value = true
  try {
    await updateFundingsReserveAmount(Number(form.reserveAmount || 0))
    notifySuccess('儲存完成', '保留金額已更新。')
    await loadBotRuntime(false)
  } catch (error) {
    notifyError('儲存保留金額失敗', error)
  } finally {
    loadingSaveReserve.value = false
  }
}

/**
 * 更新save Bot Config相關資料。
 */

async function saveBotConfig() {
  loadingSaveBotConfig.value = true
  try {
    await updateFundingsBotConfig({
      strategyId: form.botConfig.strategyId,
      strategyMode: form.botConfig.strategyMode,
      currency: form.botConfig.currency,
      minAmount: Number(form.botConfig.minAmount || 0),
      period: Number(form.botConfig.period || 120),
      minDailyRate: Number(form.botConfig.minDailyRate || 0.000001),
      autoRelist: Boolean(form.botConfig.autoRelist),
      tickIntervalSec: Number(form.botConfig.tickIntervalSec || 30),
    })
    notifySuccess('儲存完成', 'Bot 策略設定已更新。')
    await Promise.all([loadSettings(false), loadBotRuntime(false)])
  } catch (error) {
    notifyError('儲存 Bot 設定失敗', error)
  } finally {
    loadingSaveBotConfig.value = false
  }
}

/**
 * 處理run Manual Tick邏輯。
 */

async function runManualTick() {
  loadingManualTick.value = true
  try {
    await runFundingsBotManualTick()
    notifySuccess('執行完成', '已手動觸發一次 bot。')
    await loadBotRuntime(false)
  } catch (error) {
    notifyError('手動執行失敗', error)
  } finally {
    loadingManualTick.value = false
  }
}

onMounted(async () => {
  await Promise.all([loadSettings(false), loadBotRuntime(false)])
})
</script>

<template>
  <div class="page">
    <div class="toolbar">
      <div>
        <h2>機器人設定</h2>
        <p class="toolbar-desc">管理 Bitfinex API 憑證、bot 啟用狀態、策略模式與最近執行紀錄。</p>
      </div>
      <div class="inline-row">
        <el-button :loading="loadingRead" @click="loadSettings(true)">重新整理設定</el-button>
        <el-button :loading="loadingRuntime" @click="loadBotRuntime(true)">重新整理狀態</el-button>
        <el-button type="primary" :loading="loadingManualTick" @click="runManualTick"
          >手動執行一次</el-button
        >
      </div>
    </div>

    <el-card shadow="never">
      <template #header>Bitfinex API 憑證</template>
      <el-form :model="form" label-position="top">
        <el-form-item label="API Key">
          <el-input
            v-model="form.apiKey"
            placeholder="輸入 Bitfinex API Key"
            @input="sanitizeSettingField('apiKey')"
          />
        </el-form-item>
        <el-form-item label="API Secret">
          <el-input
            v-model="form.apiSecret"
            type="password"
            show-password
            placeholder="輸入 Bitfinex API Secret"
            @input="sanitizeSettingField('apiSecret')"
          />
        </el-form-item>
        <el-button type="primary" :loading="loadingSaveApi" @click="saveSettings"
          >儲存 API 憑證</el-button
        >
      </el-form>
    </el-card>

    <el-card shadow="never">
      <template #header>機器人啟用與資金保留</template>
      <el-form :model="form" label-position="top">
        <el-form-item label="啟用自動放貸機器人">
          <div class="inline-row">
            <el-switch
              v-model="form.botEnabled"
              :loading="loadingSaveBotEnabled"
              @change="saveBotEnabled"
            />
            <span>{{ form.botEnabled ? '目前為啟用' : '目前為關閉' }}</span>
          </div>
        </el-form-item>

        <el-form-item label="保留金額">
          <div class="inline-row">
            <el-input-number
              v-model="form.reserveAmount"
              :min="0"
              :step="1"
              :precision="8"
              controls-position="right"
            />
            <el-button type="primary" :loading="loadingSaveReserve" @click="saveReserveAmount"
              >儲存保留金額</el-button
            >
          </div>
          <div class="field-tip">當 funding 可用餘額小於或等於保留金額時，bot 不會再送出新單。</div>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card shadow="never">
      <template #header>Bot 策略設定</template>
      <el-form :model="form.botConfig" label-position="top">
        <el-row :gutter="16">
          <el-col :xs="24" :md="8">
            <el-form-item label="策略模式">
              <el-select v-model="form.botConfig.strategyMode">
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
              <el-input v-model="form.botConfig.strategyId" />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="顯示幣種">
              <el-select v-model="form.botConfig.currency">
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
                v-model="form.botConfig.period"
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
                v-model="form.botConfig.minAmount"
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
                v-model="form.botConfig.minDailyRate"
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
                v-model="form.botConfig.tickIntervalSec"
                :min="5"
                :max="3600"
                :step="5"
              />
            </el-form-item>
          </el-col>

          <el-col :xs="24" :md="8">
            <el-form-item label="自動重新掛單">
              <el-switch v-model="form.botConfig.autoRelist" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-button type="primary" :loading="loadingSaveBotConfig" @click="saveBotConfig"
          >儲存 Bot 設定</el-button
        >
      </el-form>
    </el-card>

    <el-card shadow="never">
      <template #header>目前 Bot 狀態</template>
      <el-descriptions :column="3" border v-loading="loadingRuntime">
        <el-descriptions-item label="狀態">
          <el-tag :type="statusTagType(status.status)">{{ status.status || '-' }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Dry Run">{{
          status.dryRun ? '是' : '否'
        }}</el-descriptions-item>
        <el-descriptions-item label="已設定 API 憑證">{{
          status.hasCredentials ? '是' : '否'
        }}</el-descriptions-item>
        <el-descriptions-item label="策略模式">{{
          strategyModeLabel(status.config.strategyMode)
        }}</el-descriptions-item>
        <el-descriptions-item label="顯示幣種">{{
          status.config.currency || '-'
        }}</el-descriptions-item>
        <el-descriptions-item label="ACTIVE 掛單數量">{{
          status.activeOffersCount
        }}</el-descriptions-item>
        <el-descriptions-item label="歷史送單次數">{{
          status.metrics.submittedCount
        }}</el-descriptions-item>
        <el-descriptions-item label="Funding 可用餘額">{{
          formatAmount(status.metrics.available)
        }}</el-descriptions-item>
        <el-descriptions-item label="扣除保留後可用">{{
          formatAmount(status.metrics.effectiveAvailable)
        }}</el-descriptions-item>
        <el-descriptions-item label="策略參考 period"
          >{{ status.config.period || '-' }} 天</el-descriptions-item
        >
        <el-descriptions-item label="策略參考最低日利率">{{
          formatRate(status.config.minDailyRate)
        }}</el-descriptions-item>
        <el-descriptions-item label="輪詢秒數"
          >{{ status.config.tickIntervalSec || '-' }} 秒</el-descriptions-item
        >
        <el-descriptions-item label="下次執行時間">{{
          formatTime(status.nextTickAt)
        }}</el-descriptions-item>
        <el-descriptions-item label="最近執行時間">{{
          formatTime(status.lastTickAt)
        }}</el-descriptions-item>
        <el-descriptions-item label="最近成功時間">{{
          formatTime(status.lastSuccessAt)
        }}</el-descriptions-item>
      </el-descriptions>

      <div class="status-block">
        <h4>最近動作</h4>
        <p>{{ status.lastAction?.message || '-' }}</p>
      </div>

      <div class="status-block" v-if="status.lastError?.message">
        <h4>最近錯誤</h4>
        <p class="error-text">{{ status.lastError.message }}</p>
      </div>
    </el-card>

    <el-card shadow="never">
      <template #header>
        <div class="card-header-row">
          <span>最近執行紀錄</span>
          <el-button :loading="loadingLogs" @click="refreshLogs">reFetch</el-button>
        </div>
      </template>

      <el-table :data="logs" stripe v-loading="loadingLogs">
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
          :current-page="logsPagination.page"
          :page-size="logsPagination.limit"
          :total="logsPagination.total"
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
