import { getFundingsOverview } from '@/domain/repository'
import type { GetFundingsOverviewRes } from '@/domain/repository'

export interface GetFundingsOverviewDto extends GetFundingsOverviewRes {}

/**
 * 取得放貸總覽資料
 */
export async function getFundingsOverviewUsecase(): Promise<GetFundingsOverviewDto> {
  return getFundingsOverview()
}
