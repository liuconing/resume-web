import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { GetStrategiesRes } from './getStrategies.repo'

/** 啟用指定策略所需傳入參數 */
export interface ActivateStrategyParams {
  /** 要啟用的策略 ID */
  strategyId: string
}

/** 啟用指定策略 API 回傳格式 */
export type ActivateStrategyRes = GetStrategiesRes

/**
 * 啟用指定策略
 * @param params - 傳入參數，包含策略 ID
 */
export async function activateStrategy(params: ActivateStrategyParams): Promise<ActivateStrategyRes> {
  const res = await axiosBase.post<PpsApiReturn<ActivateStrategyRes>>('/strategies/active', params)
  return res.data.data
}
