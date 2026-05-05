import { getBotStatusRepo } from '@/domain/repository'

export async function getBotStatusUsecase() {
  return getBotStatusRepo()
}
