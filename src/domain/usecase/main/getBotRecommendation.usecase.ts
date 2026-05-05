import { getBotRecommendationRepo } from '@/domain/repository'

export async function getBotRecommendationUsecase() {
  return getBotRecommendationRepo()
}
