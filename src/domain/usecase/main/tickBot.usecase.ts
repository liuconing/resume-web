import { tickBotRepo } from '@/domain/repository'

export async function tickBotUsecase() {
  return tickBotRepo()
}
