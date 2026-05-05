import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 啟動 bot API 回傳格式 */
export interface StartBotRes {
  /** bot 啟動後回傳的狀態資料 */
  [key: string]: unknown
}

/**
 * 啟動 bot
 */
export async function startBot(): Promise<StartBotRes> {
  const res = await axiosBase.post<PpsApiReturn<StartBotRes>>('/bot/start', null)
  return res.data.data
}
