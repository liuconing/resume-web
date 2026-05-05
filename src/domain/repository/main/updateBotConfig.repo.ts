import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 更新 bot 設定所需傳入參數 */
export interface UpdateBotConfigParams {
  /** 要更新的 bot 設定欄位 */
  [key: string]: unknown
}

/** 更新 bot 設定 API 回傳格式 */
export interface UpdateBotConfigRes {
  /** 更新後的 bot 設定資料 */
  [key: string]: unknown
}

/**
 * 更新 bot 執行設定
 * @param params - 傳入參數，包含要更新的設定欄位
 */
export async function updateBotConfig(params: UpdateBotConfigParams): Promise<UpdateBotConfigRes> {
  const res = await axiosBase.put<PpsApiReturn<UpdateBotConfigRes>>('/bot/config', params)
  return res.data.data
}
