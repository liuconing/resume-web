import { cancelFundingOfferRepo, type CancelFundingOfferReq } from '@/domain/repository'

export async function cancelFundingOfferUsecase(req: CancelFundingOfferReq) {
  return cancelFundingOfferRepo(req)
}
