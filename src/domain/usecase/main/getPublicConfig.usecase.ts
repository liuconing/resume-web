import { getPublicConfig } from '@/domain/repository'
import type { GetPublicConfigRes } from '@/domain/repository'

export interface GetPublicConfigDto extends GetPublicConfigRes {}

/**
 * 取得後端公開設定資料
 */
export async function getPublicConfigUsecase(): Promise<GetPublicConfigDto> {
  return getPublicConfig()
}
