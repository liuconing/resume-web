import { getHealth } from '@/domain/repository'
import type { GetHealthRes } from '@/domain/repository'

export interface GetHealthDto extends GetHealthRes {}

/**
 * 取得後端 API 健康狀態
 */
export async function getHealthUsecase(): Promise<GetHealthDto> {
  return getHealth()
}
