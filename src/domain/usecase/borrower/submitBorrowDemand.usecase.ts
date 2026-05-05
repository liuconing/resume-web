import { submitBorrowDemandRepo, type SubmitBorrowDemandReq } from '@/domain/repository'

export async function submitBorrowDemandUsecase(req: SubmitBorrowDemandReq) {
  return submitBorrowDemandRepo(req)
}
