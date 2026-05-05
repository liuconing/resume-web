import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { FundingsBotConfig } from './getFundingsSettings.repo'

/** 更新放貸 bot 設定所需傳入參數 */
export interface UpdateFundingsBotConfigParams extends Partial<FundingsBotConfig> {
  /** bot 策略 ID */
  strategyId?: string
  /** bot 操作幣種 */
  currency?: string
  /** 單次最小放貸金額 */
  minAmount?: number
  /** 放貸天期 */
  period?: number
  /** 最低每日利率 */
  minDailyRate?: number
  /** 是否自動重新掛單 */
  autoRelist?: boolean
  /** bot tick 間隔秒數 */
  tickIntervalSec?: number
}

/** 更新放貸 bot 設定 API 回傳格式 */
export interface UpdateFundingsBotConfigRes {
  /** 使用者目前的 bot 策略與執行設定 */
  botConfig: FundingsBotConfig
  /** 設定更新時間 */
  updatedAt: string
}

/**
 * 更新放貸 bot 執行設定
 * @param params - 傳入參數，包含要更新的 bot 設定欄位
 */
export async function updateFundingsBotConfig(params: UpdateFundingsBotConfigParams): Promise<UpdateFundingsBotConfigRes> {
  const res = await axiosBase.put<PpsApiReturn<UpdateFundingsBotConfigRes>>('/fundings/settings/bot-config', params)
  return res.data.data
}
