import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { GetStrategiesRes } from './getStrategies.repo'

export interface ActivateStrategyReq {
  // 要啟用的策略 ID。
  strategyId: string
}

export type ActivateStrategyRes = GetStrategiesRes

export const activateStrategyRepo = async (
  req: ActivateStrategyReq,
): Promise<ActivateStrategyRes> => {
  const res = await axiosBase.post<PpsApiReturn<ActivateStrategyRes>>('/strategies/active', req)
  return res.data.data
}
