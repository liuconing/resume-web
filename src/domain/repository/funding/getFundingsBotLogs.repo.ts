import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetFundingsBotLogsReq {
  // 目前頁碼。
  page?: number
  // 每頁回傳筆數。
  limit?: number
}

export interface GetFundingsBotLogsRes {
  // bot 執行紀錄列表。
  items: unknown[]
  // 符合條件的紀錄總筆數。
  total: number
  // 目前頁碼。
  page: number
  // 每頁回傳筆數。
  limit: number
}

export const getFundingsBotLogsRepo = async (
  req: GetFundingsBotLogsReq = {},
): Promise<GetFundingsBotLogsRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsBotLogsRes>>('/fundings/bot/logs', { params: req })
  return res.data.data
}
