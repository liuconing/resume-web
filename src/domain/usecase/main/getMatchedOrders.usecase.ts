import { getMatchedOrdersRepo, type GetMatchedOrdersReq } from '@/domain/repository'

export async function getMatchedOrdersUsecase(req?: GetMatchedOrdersReq) {
  return getMatchedOrdersRepo(req as GetMatchedOrdersReq)
}
