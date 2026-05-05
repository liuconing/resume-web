import { getBorrowLoans } from '@/domain/repository'
import type { GetBorrowLoansParams, GetBorrowLoansRes } from '@/domain/repository'

export interface GetBorrowLoansDto extends GetBorrowLoansRes {}
export interface GetBorrowLoansParamsDto extends GetBorrowLoansParams {}

/**
 * 取得借款 loan 列表
 * @param params - 傳入參數，包含 symbol、幣種與歷史筆數
 */
export async function getBorrowLoansUsecase(
  params?: GetBorrowLoansParamsDto,
): Promise<GetBorrowLoansDto> {
  return getBorrowLoans(params as GetBorrowLoansParams)
}
