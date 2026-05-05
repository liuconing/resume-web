import { cancelBorrowDemand } from '@/domain/repository'
import type { CancelBorrowDemandParams, CancelBorrowDemandRes } from '@/domain/repository'

export interface CancelBorrowDemandDto extends CancelBorrowDemandRes {}
export interface CancelBorrowDemandParamsDto extends CancelBorrowDemandParams {}

/**
 * 取消指定借款需求
 * @param params - 傳入參數，包含要取消的借款需求 ID
 */
export async function cancelBorrowDemandUsecase(
  params: CancelBorrowDemandParamsDto,
): Promise<CancelBorrowDemandDto> {
  return cancelBorrowDemand(params)
}
