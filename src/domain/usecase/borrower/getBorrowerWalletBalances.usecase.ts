import { getBorrowerWalletBalancesRepo, type GetBorrowerWalletBalancesReq } from '@/domain/repository'

export async function getBorrowerWalletBalancesUsecase(req?: GetBorrowerWalletBalancesReq) {
  return getBorrowerWalletBalancesRepo(req as GetBorrowerWalletBalancesReq)
}
