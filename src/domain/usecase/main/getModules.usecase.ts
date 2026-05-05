import { getModules } from '@/domain/repository'
import type { GetModulesRes } from '@/domain/repository'

export interface GetModulesDto extends GetModulesRes {}

/**
 * 取得後端已載入的模組列表
 */
export async function getModulesUsecase(): Promise<GetModulesDto> {
  return getModules()
}
