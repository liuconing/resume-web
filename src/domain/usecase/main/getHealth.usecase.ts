import { getHealthRepo } from '@/domain/repository'

export async function getHealthUsecase() {
  return getHealthRepo()
}
