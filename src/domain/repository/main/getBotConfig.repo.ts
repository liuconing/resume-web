import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetBotConfigRes {
  // bot 設定資料。
  [key: string]: unknown
}

export const getBotConfigRepo = async (): Promise<GetBotConfigRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetBotConfigRes>>('/bot/config')
  return res.data.data
}
