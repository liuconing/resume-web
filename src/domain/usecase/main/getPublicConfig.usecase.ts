import { getPublicConfigRepo } from '@/domain/repository'

export async function getPublicConfigUsecase() {
  return getPublicConfigRepo()
}
