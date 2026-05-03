import { getFundingsOverviewRepo, type GetFundingsOverviewRes } from '@/domain/repository'

export interface GetFundingsOverviewUsecaseDto extends GetFundingsOverviewRes {}

export async function getFundingsOverviewUsecase(): Promise<GetFundingsOverviewUsecaseDto> {
  const data = await getFundingsOverviewRepo()
  return data
}
