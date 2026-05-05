import { submitBorrowDemand } from '@/domain/repository'
import type { SubmitBorrowDemandParams, SubmitBorrowDemandRes } from '@/domain/repository'

export interface SubmitBorrowDemandDto extends SubmitBorrowDemandRes {}
export interface SubmitBorrowDemandParamsDto extends SubmitBorrowDemandParams {}

/**
 * 送出借款需求掛單
 * @param params - 傳入參數，包含幣種、金額、利率與天期
 */
export async function submitBorrowDemandUsecase(
  params: SubmitBorrowDemandParamsDto,
): Promise<SubmitBorrowDemandDto> {
  return submitBorrowDemand(params)
}
