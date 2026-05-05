import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface FundingsBotConfig {
  // bot 策略 ID。
  strategyId: string
  // 策略模式（最佳成交 / 高利率等待）。
  strategyMode: string
  // bot 操作幣種。
  currency: string
  // 單次最小放貸金額。
  minAmount: number
  // 放貸天期。
  period: number
  // 最低每日利率。
  minDailyRate: number
  // 是否自動重新掛單。
  autoRelist: boolean
  // bot tick 間隔秒數。
  tickIntervalSec: number
}

export interface GetFundingsSettingsRes {
  // 目前使用者的 Bitfinex API key。
  apiKey: string
  // 目前使用者的 Bitfinex API secret。
  apiSecret: string
  // 是否同時具備 API key 與 API secret。
  hasCredentials: boolean
  // 使用者放貸 bot 是否啟用。
  botEnabled: boolean
  // 保留不投入自動放貸的資金金額。
  reserveAmount: number
  // 使用者目前的 bot 策略與執行設定。
  botConfig: FundingsBotConfig
  // 設定最後更新時間。
  updatedAt: string | null
}

export const getFundingsSettingsRepo = async (): Promise<GetFundingsSettingsRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsSettingsRes>>('/fundings/settings')
  return res.data.data
}
