import { getBotConfigRepo } from '@/domain/repository'

export async function getBotConfigUsecase() {
  return getBotConfigRepo()
}
