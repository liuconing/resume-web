import { getMyOffersRepo, type GetMyOffersReq } from '@/domain/repository'

export async function getMyOffersUsecase(req?: GetMyOffersReq) {
  return getMyOffersRepo(req as GetMyOffersReq)
}
