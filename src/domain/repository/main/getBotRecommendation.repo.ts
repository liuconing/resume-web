import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得 bot 策略建議 API 回傳格式 */
export interface GetBotRecommendationRes {
  /** bot 策略建議資料 */
  [key: string]: unknown
}

/**
 * 取得 bot 策略建議
 */
export async function getBotRecommendation(): Promise<GetBotRecommendationRes> {
  const res = await axiosBase.get<PpsApiReturn<GetBotRecommendationRes>>('/bot/recommendation')
  return res.data.data
}
