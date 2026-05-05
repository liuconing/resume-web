import { getStrategies } from '@/domain/repository'
import type { GetStrategiesRes } from '@/domain/repository'

export interface GetStrategiesDto extends GetStrategiesRes {}

/**
 * 取得所有可用策略列表
 */
export async function getStrategiesUsecase(): Promise<GetStrategiesDto> {
  return getStrategies()
}
