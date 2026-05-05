import { cancelBorrowDemandRepo, type CancelBorrowDemandReq } from '@/domain/repository'

export async function cancelBorrowDemandUsecase(req: CancelBorrowDemandReq) {
  return cancelBorrowDemandRepo(req)
}
