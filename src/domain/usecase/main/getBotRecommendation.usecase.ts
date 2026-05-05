import { getBotRecommendation } from '@/domain/repository'
import type { GetBotRecommendationRes } from '@/domain/repository'

export interface GetBotRecommendationDto extends GetBotRecommendationRes {}

/**
 * 取得 bot 策略建議
 */
export async function getBotRecommendationUsecase(): Promise<GetBotRecommendationDto> {
  return getBotRecommendation()
}
