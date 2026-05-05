import { getFundingsLoans } from '@/domain/repository'
import type { GetFundingsLoansRes } from '@/domain/repository'

export interface GetFundingsLoansDto extends GetFundingsLoansRes {}

/**
 * 取得目前放貸 loan 列表與統計
 */
export async function getFundingsLoansUsecase(): Promise<GetFundingsLoansDto> {
  return getFundingsLoans()
}
