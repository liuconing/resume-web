import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得 bot 執行狀態 API 回傳格式 */
export interface GetBotStatusRes {
  /** bot runtime 狀態資料 */
  [key: string]: unknown
}

/**
 * 取得 bot 目前執行狀態
 */
export async function getBotStatus(): Promise<GetBotStatusRes> {
  const res = await axiosBase.get<PpsApiReturn<GetBotStatusRes>>('/bot/status')
  return res.data.data
}
