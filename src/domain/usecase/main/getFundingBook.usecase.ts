import { getFundingBook } from '@/domain/repository'
import type { GetFundingBookParams, GetFundingBookRes } from '@/domain/repository'

export interface GetFundingBookDto extends GetFundingBookRes {}
export interface GetFundingBookParamsDto extends GetFundingBookParams {}

/**
 * 取得 Bitfinex Funding Book 掛單簿
 * @param params - 傳入參數，包含 symbol、精度與筆數
 */
export async function getFundingBookUsecase(
  params?: GetFundingBookParamsDto,
): Promise<GetFundingBookDto> {
  return getFundingBook(params as GetFundingBookParams)
}
