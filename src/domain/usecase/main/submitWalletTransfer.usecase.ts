import { submitWalletTransferRepo, type SubmitWalletTransferReq } from '@/domain/repository'

export async function submitWalletTransferUsecase(req: SubmitWalletTransferReq) {
  return submitWalletTransferRepo(req)
}
