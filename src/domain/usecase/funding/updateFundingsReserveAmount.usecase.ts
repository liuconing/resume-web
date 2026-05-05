import { updateFundingsReserveAmountRepo, type UpdateFundingsReserveAmountReq } from '@/domain/repository'

export async function updateFundingsReserveAmountUsecase(req: UpdateFundingsReserveAmountReq) {
  return updateFundingsReserveAmountRepo(req)
}
