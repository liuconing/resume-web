import { submitBorrowerWalletTransfer } from '@/domain/repository'
import type {
  SubmitBorrowerWalletTransferParams,
  SubmitBorrowerWalletTransferRes,
} from '@/domain/repository'

export interface SubmitBorrowerWalletTransferDto extends SubmitBorrowerWalletTransferRes {}
export interface SubmitBorrowerWalletTransferParamsDto extends SubmitBorrowerWalletTransferParams {}

/**
 * 送出借款方錢包轉帳
 * @param params - 傳入參數，包含幣種、金額與來源/目標錢包
 */
export async function submitBorrowerWalletTransferUsecase(
  params: SubmitBorrowerWalletTransferParamsDto,
): Promise<SubmitBorrowerWalletTransferDto> {
  return submitBorrowerWalletTransfer(params)
}
