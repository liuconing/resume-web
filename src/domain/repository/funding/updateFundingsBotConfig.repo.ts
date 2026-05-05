import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { FundingsBotConfig } from './getFundingsSettings.repo'

export interface UpdateFundingsBotConfigReq extends Partial<FundingsBotConfig> {
  // bot 策略 ID。
  strategyId?: string
  // bot 操作幣種。
  currency?: string
  // 單次最小放貸金額。
  minAmount?: number
  // 放貸天期。
  period?: number
  // 最低每日利率。
  minDailyRate?: number
  // 是否自動重新掛單。
  autoRelist?: boolean
  // bot tick 間隔秒數。
  tickIntervalSec?: number
}

export interface UpdateFundingsBotConfigRes {
  // 使用者目前的 bot 策略與執行設定。
  botConfig: FundingsBotConfig
  // 設定更新時間。
  updatedAt: string
}

export const updateFundingsBotConfigRepo = async (
  req: UpdateFundingsBotConfigReq,
): Promise<UpdateFundingsBotConfigRes> => {
  const res = await axiosBase.put<PpsApiReturn<UpdateFundingsBotConfigRes>>('/fundings/settings/bot-config', req)
  return res.data.data
}
