import { submitBorrowerWalletTransferRepo, type SubmitBorrowerWalletTransferReq } from '@/domain/repository'

export async function submitBorrowerWalletTransferUsecase(req: SubmitBorrowerWalletTransferReq) {
  return submitBorrowerWalletTransferRepo(req)
}
