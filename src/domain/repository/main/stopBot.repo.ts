import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 停止 bot API 回傳格式 */
export interface StopBotRes {
  /** bot 停止後回傳的狀態資料 */
  [key: string]: unknown
}

/**
 * 停止 bot
 */
export async function stopBot(): Promise<StopBotRes> {
  const res = await axiosBase.post<PpsApiReturn<StopBotRes>>('/bot/stop', null)
  return res.data.data
}
