import { getMatchedOrders } from '@/domain/repository'
import type { GetMatchedOrdersParams, GetMatchedOrdersRes } from '@/domain/repository'

export interface GetMatchedOrdersDto extends GetMatchedOrdersRes {}
export interface GetMatchedOrdersParamsDto extends GetMatchedOrdersParams {}

/**
 * 取得歷史成交的 funding 訂單
 * @param params - 傳入參數，包含 symbol 與筆數
 */
export async function getMatchedOrdersUsecase(
  params?: GetMatchedOrdersParamsDto,
): Promise<GetMatchedOrdersDto> {
  return getMatchedOrders(params as GetMatchedOrdersParams)
}
