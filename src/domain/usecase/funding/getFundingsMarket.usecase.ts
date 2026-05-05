import { getFundingsMarket } from '@/domain/repository'
import type { GetFundingsMarketParams, GetFundingsMarketRes } from '@/domain/repository'

export interface GetFundingsMarketDto extends GetFundingsMarketRes {}
export interface GetFundingsMarketParamsDto extends GetFundingsMarketParams {}

/**
 * 取得放貸市場掛單簿與借款需求資料
 * @param params - 傳入參數，包含幣種與掛單簿筆數
 */
export async function getFundingsMarketUsecase(
  params?: GetFundingsMarketParamsDto,
): Promise<GetFundingsMarketDto> {
  return getFundingsMarket(params as GetFundingsMarketParams)
}
