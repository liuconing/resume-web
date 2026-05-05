import { getFundingBookRepo, type GetFundingBookReq } from '@/domain/repository'

export async function getFundingBookUsecase(req?: GetFundingBookReq) {
  return getFundingBookRepo(req as GetFundingBookReq)
}
