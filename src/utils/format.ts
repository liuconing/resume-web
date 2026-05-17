import { BigNumber } from '@/lib/bigNumber'

export interface FormatDisplayAmountParams {
  /** 要格式化的金額 */
  value: number | null | undefined
}

export interface FormatPercentParams {
  /** 已是百分比尺度的數值，例如 1.23 代表 1.23% */
  value: number | null | undefined
  /** 小數位數 */
  digits?: number
}

export interface FormatProbabilityParams {
  /** 0 到 1 的機率值 */
  value: number | null | undefined
}

export interface FormatMinutesParams {
  /** 分鐘數 */
  value: number | null | undefined
}

export interface FormatTimestampParams {
  /** 毫秒時間戳或可被 Date 解析的字串 */
  value: number | string | null | undefined
}

export interface ReadErrorMessageParams {
  /** API 或執行期錯誤 */
  error: unknown
}

export interface FormatStrategyModeLabelParams {
  /** 後端回傳的策略模式代碼 */
  value?: string | null
}

/**
 * 格式化金額
 * @param value - 金額
 * @param decimalPlaces - 小數位數
 * @returns 格式化後的金額
 */
export const formatAmount = (value: number, decimalPlaces: number = 2) => {
  return BigNumber(value || 0).toFormat(decimalPlaces, BigNumber.ROUND_HALF_UP)
}

/**
 * 格式化時間
 * @param value - 時間
 * @returns 格式化後的時間
 */
export const formatTime = (value: string | null) => {
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
 * 格式化format Rate內容供顯示或輸出。
 * @param value - 輸入值。
 */

export const formatRate = (value: number) => {
  return `${(Number(value || 0) * 100).toFixed(6)}%`
}

/**
 * 將金額格式化為繁中地區數字顯示。
 *
 * @param params - `value` 為原始金額。
 * @returns 格式化後的金額字串。
 */
export const formatDisplayAmount = ({ value }: FormatDisplayAmountParams): string => {
  return Number(value || 0).toLocaleString('zh-TW', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  })
}

/**
 * 將百分比尺度數值格式化為固定小數位顯示。
 *
 * @param params - `value` 已是百分比尺度，`digits` 為小數位數。
 * @returns 例如 `1.234567%`。
 */
export const formatPercent = ({ value, digits = 6 }: FormatPercentParams): string => {
  return `${Number(value || 0).toFixed(digits)}%`
}

/**
 * 將 0 到 1 的機率值格式化為百分比顯示。
 *
 * @param params - `value` 為機率值。
 * @returns 例如 `12.34%`。
 */
export const formatProbability = ({ value }: FormatProbabilityParams): string => {
  return `${(Number(value || 0) * 100).toFixed(2)}%`
}

/**
 * 將分鐘數格式化為可讀時間描述。
 *
 * @param params - `value` 為分鐘數。
 * @returns 如「分鐘」「小時」或「極長時間」。
 */
export const formatMinutes = ({ value }: FormatMinutesParams): string => {
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
 * 將時間值格式化為本地日期時間字串。
 *
 * @param params - `value` 為毫秒時間戳或可被 Date 解析的字串。
 * @returns `YYYY-MM-DD HH:mm:ss` 或 `-`。
 */
export const formatDateTime = ({ value }: FormatTimestampParams): string => {
  if (!value) {
    return '-'
  }
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) {
    return '-'
  }
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

/**
 * 從錯誤物件取出可供畫面顯示的訊息。
 *
 * @param params - `error` 為 API 或執行期錯誤。
 * @returns 使用者可讀的錯誤文字。
 */
export const readErrorMessage = ({ error }: ReadErrorMessageParams): string => {
  const err = error as { response?: { data?: { message?: string } }; message?: string }
  return err?.response?.data?.message || err?.message || '操作失敗'
}

/**
 * 將 funding bot 策略模式代碼轉為中文標籤。
 *
 * @param params - `value` 為後端策略模式字串。
 * @returns 中文模式名稱。
 */
export const formatStrategyModeLabel = ({ value }: FormatStrategyModeLabelParams): string => {
  const text = String(value || '').toUpperCase()
  if (text === 'HIGH_RATE_WAIT' || text === 'SEMI_AUTO') {
    return '高利率等待模式'
  }
  return '最佳成交模式'
}

/**
 * 將 bot 狀態代碼轉為 Element Plus tag type。
 *
 * @param params - `value` 為後端狀態字串。
 * @returns tag type 名稱。
 */
export const getStatusTagType = ({
  value,
}: {
  /** 後端狀態字串 */
  value: string | null | undefined
}): 'danger' | 'info' | 'success' | 'warning' | 'primary' => {
  const text = String(value || '').toUpperCase()
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
