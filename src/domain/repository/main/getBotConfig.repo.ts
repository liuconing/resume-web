import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得 bot 設定 API 回傳格式 */
export interface GetBotConfigRes {
  /** bot 設定資料 */
  [key: string]: unknown
}

/**
 * 取得 bot 執行設定
 */
export async function getBotConfig(): Promise<GetBotConfigRes> {
  const res = await axiosBase.get<PpsApiReturn<GetBotConfigRes>>('/bot/config')
  return res.data.data
}
