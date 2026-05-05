import { getBorrowDemandsRepo, type GetBorrowDemandsReq } from '@/domain/repository'

export async function getBorrowDemandsUsecase(req?: GetBorrowDemandsReq) {
  return getBorrowDemandsRepo(req as GetBorrowDemandsReq)
}
