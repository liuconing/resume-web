import { getWalletsRepo } from '@/domain/repository'

export async function getWalletsUsecase() {
  return getWalletsRepo()
}
