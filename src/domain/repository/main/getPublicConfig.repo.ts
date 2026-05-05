import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得公開設定 API 回傳格式 */
export interface GetPublicConfigRes {
  /** Bitfinex API base URL */
  bitfinexBaseUrl: string
  /** 後端是否已設定 Bitfinex API 憑證 */
  hasApiCredentials: boolean
  /** bot 是否只模擬、不實際送單 */
  dryRun: boolean
  /** 預設放貸幣種 */
  loanCurrency: string
  /** 預設放貸金額 */
  loanAmount: number
  /** 目前啟用的策略 ID */
  activeStrategyId: string
}

/**
 * 取得後端公開設定資料
 */
export async function getPublicConfig(): Promise<GetPublicConfigRes> {
  const res = await axiosBase.get<PpsApiReturn<GetPublicConfigRes>>('/config/public')
  return res.data.data
}
