import { updateFundingsBotEnabledRepo, type UpdateFundingsBotEnabledReq } from '@/domain/repository'

export async function updateFundingsBotEnabledUsecase(req: UpdateFundingsBotEnabledReq) {
  return updateFundingsBotEnabledRepo(req)
}
