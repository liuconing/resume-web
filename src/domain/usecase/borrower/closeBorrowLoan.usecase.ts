import { closeBorrowLoanRepo, type CloseBorrowLoanReq } from '@/domain/repository'

export async function closeBorrowLoanUsecase(req: CloseBorrowLoanReq) {
  return closeBorrowLoanRepo(req)
}
