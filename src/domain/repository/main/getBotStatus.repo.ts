import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetBotStatusRes {
  // bot runtime 狀態資料。
  [key: string]: unknown
}

export const getBotStatusRepo = async (): Promise<GetBotStatusRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetBotStatusRes>>('/bot/status')
  return res.data.data
}
