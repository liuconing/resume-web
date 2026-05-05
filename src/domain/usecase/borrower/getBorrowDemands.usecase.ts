import { getBorrowDemands } from '@/domain/repository'
import type { GetBorrowDemandsParams, GetBorrowDemandsRes } from '@/domain/repository'

export interface GetBorrowDemandsDto extends GetBorrowDemandsRes {}
export interface GetBorrowDemandsParamsDto extends GetBorrowDemandsParams {}

/**
 * 取得借款需求列表
 * @param params - 傳入參數，包含 symbol 或幣種
 */
export async function getBorrowDemandsUsecase(
  params?: GetBorrowDemandsParamsDto,
): Promise<GetBorrowDemandsDto> {
  return getBorrowDemands(params as GetBorrowDemandsParams)
}
