import { stopBotRepo } from '@/domain/repository'

export async function stopBotUsecase() {
  return stopBotRepo()
}
