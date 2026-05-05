import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface StopBotRes {
  // bot 停止後回傳的狀態資料。
  [key: string]: unknown
}

export const stopBotRepo = async (): Promise<StopBotRes> => {
  const res = await axiosBase.post<PpsApiReturn<StopBotRes>>('/bot/stop', null)
  return res.data.data
}
