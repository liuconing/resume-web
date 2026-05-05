import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface TickBotRes {
  // 單次 bot tick 執行結果。
  [key: string]: unknown
}

export const tickBotRepo = async (): Promise<TickBotRes> => {
  const res = await axiosBase.post<PpsApiReturn<TickBotRes>>('/bot/tick', null)
  return res.data.data
}
