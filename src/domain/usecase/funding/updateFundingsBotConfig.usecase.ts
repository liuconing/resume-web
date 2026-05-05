import { updateFundingsBotConfigRepo, type UpdateFundingsBotConfigReq } from '@/domain/repository'

export async function updateFundingsBotConfigUsecase(req: UpdateFundingsBotConfigReq) {
  return updateFundingsBotConfigRepo(req)
}
