import { updateFundingsSettingsRepo, type UpdateFundingsSettingsReq } from '@/domain/repository'

export async function updateFundingsSettingsUsecase(req: UpdateFundingsSettingsReq) {
  return updateFundingsSettingsRepo(req)
}
