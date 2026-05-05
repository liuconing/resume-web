import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 手動觸發 bot tick API 回傳格式 */
export interface RunFundingsBotManualTickRes {
  /** 手動 bot tick 執行結果 */
  [key: string]: unknown
}

/**
 * 手動觸發放貸 bot 執行一次 tick
 */
export async function runFundingsBotManualTick(): Promise<RunFundingsBotManualTickRes> {
  const res = await axiosBase.post<PpsApiReturn<RunFundingsBotManualTickRes>>('/fundings/bot/manual-tick', null)
  return res.data.data
}
