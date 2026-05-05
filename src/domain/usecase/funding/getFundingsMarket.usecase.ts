import { getFundingsMarketRepo, type GetFundingsMarketReq } from '@/domain/repository'

export async function getFundingsMarketUsecase(req?: GetFundingsMarketReq) {
  return getFundingsMarketRepo(req as GetFundingsMarketReq)
}
