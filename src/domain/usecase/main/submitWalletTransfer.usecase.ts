import { submitWalletTransfer } from '@/domain/repository'
import type { SubmitWalletTransferParams, SubmitWalletTransferRes } from '@/domain/repository'

export interface SubmitWalletTransferDto extends SubmitWalletTransferRes {}
export interface SubmitWalletTransferParamsDto extends SubmitWalletTransferParams {}

/**
 * 送出錢包轉帳
 * @param params - 傳入參數，包含幣種、金額與來源/目標錢包
 */
export async function submitWalletTransferUsecase(
  params: SubmitWalletTransferParamsDto,
): Promise<SubmitWalletTransferDto> {
  return submitWalletTransfer(params)
}
