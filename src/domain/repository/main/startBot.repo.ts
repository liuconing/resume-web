import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface StartBotRes {
  // bot 啟動後回傳的狀態資料。
  [key: string]: unknown
}

export const startBotRepo = async (): Promise<StartBotRes> => {
  const res = await axiosBase.post<PpsApiReturn<StartBotRes>>('/bot/start', null)
  return res.data.data
}
