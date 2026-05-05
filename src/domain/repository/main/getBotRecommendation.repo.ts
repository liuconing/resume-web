import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetBotRecommendationRes {
  // bot 策略建議資料。
  [key: string]: unknown
}

export const getBotRecommendationRepo = async (): Promise<GetBotRecommendationRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetBotRecommendationRes>>('/bot/recommendation')
  return res.data.data
}
