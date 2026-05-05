import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得放貸 bot 狀態 API 回傳格式 */
export interface GetFundingsBotStatusRes {
  /** 使用者 bot runtime 狀態資料 */
  [key: string]: unknown
}

/**
 * 取得放貸 bot 目前執行狀態
 */
export async function getFundingsBotStatus(): Promise<GetFundingsBotStatusRes> {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsBotStatusRes>>('/fundings/bot/status')
  return res.data.data
}
