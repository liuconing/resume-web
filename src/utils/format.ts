import { BigNumber } from '@/lib/bigNumber'

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
