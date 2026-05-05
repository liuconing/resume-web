import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 單次 bot tick API 回傳格式 */
export interface TickBotRes {
  /** 單次 bot tick 執行結果 */
  [key: string]: unknown
}

/**
 * 執行單次 bot tick
 */
export async function tickBot(): Promise<TickBotRes> {
  const res = await axiosBase.post<PpsApiReturn<TickBotRes>>('/bot/tick', null)
  return res.data.data
}
