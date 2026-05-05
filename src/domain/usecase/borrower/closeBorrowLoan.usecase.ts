import { closeBorrowLoan } from '@/domain/repository'
import type { CloseBorrowLoanParams, CloseBorrowLoanRes } from '@/domain/repository'

export interface CloseBorrowLoanDto extends CloseBorrowLoanRes {}
export interface CloseBorrowLoanParamsDto extends CloseBorrowLoanParams {}

/**
 * 提前還款指定借款 loan
 * @param params - 傳入參數，包含 loan ID 與還款類型
 */
export async function closeBorrowLoanUsecase(
  params: CloseBorrowLoanParamsDto,
): Promise<CloseBorrowLoanDto> {
  return closeBorrowLoan(params)
}
