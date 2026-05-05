import { getWalletBalancesRepo, type GetWalletBalancesReq } from '@/domain/repository'

export async function getWalletBalancesUsecase(req?: GetWalletBalancesReq) {
  return getWalletBalancesRepo(req as GetWalletBalancesReq)
}
