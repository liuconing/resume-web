import { getMyOffers } from '@/domain/repository'
import type { GetMyOffersParams, GetMyOffersRes } from '@/domain/repository'

export interface GetMyOffersDto extends GetMyOffersRes {}
export interface GetMyOffersParamsDto extends GetMyOffersParams {}

/**
 * 取得目前帳戶的放貸掛單列表
 * @param params - 傳入參數，包含 symbol
 */
export async function getMyOffersUsecase(params?: GetMyOffersParamsDto): Promise<GetMyOffersDto> {
  return getMyOffers(params as GetMyOffersParams)
}
