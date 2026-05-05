import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetPublicConfigRes {
  // Bitfinex API base URL。
  bitfinexBaseUrl: string
  // 後端是否已設定 Bitfinex API 憑證。
  hasApiCredentials: boolean
  // bot 是否只模擬、不實際送單。
  dryRun: boolean
  // 預設放貸幣種。
  loanCurrency: string
  // 預設放貸金額。
  loanAmount: number
  // 目前啟用的策略 ID。
  activeStrategyId: string
}

export const getPublicConfigRepo = async (): Promise<GetPublicConfigRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetPublicConfigRes>>('/config/public')
  return res.data.data
}
