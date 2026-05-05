import { getBorrowLoansRepo, type GetBorrowLoansReq } from '@/domain/repository'

export async function getBorrowLoansUsecase(req?: GetBorrowLoansReq) {
  return getBorrowLoansRepo(req as GetBorrowLoansReq)
}
