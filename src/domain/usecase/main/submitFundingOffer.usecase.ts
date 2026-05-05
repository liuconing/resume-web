import { submitFundingOfferRepo, type SubmitFundingOfferReq } from '@/domain/repository'

export async function submitFundingOfferUsecase(req: SubmitFundingOfferReq) {
  return submitFundingOfferRepo(req)
}
