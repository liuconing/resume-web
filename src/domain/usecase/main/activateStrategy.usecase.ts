import { activateStrategy } from '@/domain/repository'
import type { ActivateStrategyParams, ActivateStrategyRes } from '@/domain/repository'

export interface ActivateStrategyDto extends ActivateStrategyRes {}
export interface ActivateStrategyParamsDto extends ActivateStrategyParams {}

/**
 * 啟用指定策略
 * @param params - 傳入參數，包含策略 ID
 */
export async function activateStrategyUsecase(
  params: ActivateStrategyParamsDto,
): Promise<ActivateStrategyDto> {
  return activateStrategy(params)
}
