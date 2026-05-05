import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得放貸 bot 執行紀錄所需傳入參數 */
export interface GetFundingsBotLogsParams {
  /** 目前頁碼 */
  page?: number
  /** 每頁回傳筆數 */
  limit?: number
}

/** 取得放貸 bot 執行紀錄 API 回傳格式 */
export interface GetFundingsBotLogsRes {
  /** bot 執行紀錄列表 */
  items: unknown[]
  /** 符合條件的紀錄總筆數 */
  total: number
  /** 目前頁碼 */
  page: number
  /** 每頁回傳筆數 */
  limit: number
}

/**
 * 取得放貸 bot 執行紀錄（分頁）
 * @param params - 傳入參數，包含頁碼與每頁筆數
 */
export async function getFundingsBotLogs(params: GetFundingsBotLogsParams = {}): Promise<GetFundingsBotLogsRes> {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsBotLogsRes>>('/fundings/bot/logs', { params })
  return res.data.data
}
