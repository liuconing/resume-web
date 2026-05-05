import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface RunFundingsBotManualTickRes {
  // 手動 bot tick 執行結果。
  [key: string]: unknown
}

export const runFundingsBotManualTickRepo = async (): Promise<RunFundingsBotManualTickRes> => {
  const res = await axiosBase.post<PpsApiReturn<RunFundingsBotManualTickRes>>('/fundings/bot/manual-tick', null)
  return res.data.data
}
