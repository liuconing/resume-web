import { startBotRepo } from '@/domain/repository'

export async function startBotUsecase() {
  return startBotRepo()
}
