import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface UpdateBotConfigReq {
  // 要更新的 bot 設定欄位。
  [key: string]: unknown
}

export interface UpdateBotConfigRes {
  // 更新後的 bot 設定資料。
  [key: string]: unknown
}

export const updateBotConfigRepo = async (
  req: UpdateBotConfigReq,
): Promise<UpdateBotConfigRes> => {
  const res = await axiosBase.put<PpsApiReturn<UpdateBotConfigRes>>('/bot/config', req)
  return res.data.data
}
