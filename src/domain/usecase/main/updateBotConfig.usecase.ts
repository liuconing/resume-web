import { updateBotConfigRepo, type UpdateBotConfigReq } from '@/domain/repository'

export async function updateBotConfigUsecase(req: UpdateBotConfigReq) {
  return updateBotConfigRepo(req)
}
