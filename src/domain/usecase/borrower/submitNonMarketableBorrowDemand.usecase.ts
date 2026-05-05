import { submitNonMarketableBorrowDemandRepo, type SubmitNonMarketableBorrowDemandReq } from '@/domain/repository'

export async function submitNonMarketableBorrowDemandUsecase(req?: SubmitNonMarketableBorrowDemandReq) {
  return submitNonMarketableBorrowDemandRepo(req as SubmitNonMarketableBorrowDemandReq)
}
