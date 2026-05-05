import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 策略項目 */
export interface StrategyItem {
  /** 策略 ID */
  id: string
  /** 策略顯示名稱 */
  label?: string
  /** 策略描述 */
  description?: string
  /** 是否為目前啟用策略 */
  active?: boolean
}

/** 取得策略列表 API 回傳格式 */
export type GetStrategiesRes = StrategyItem[]

/**
 * 取得所有可用策略列表
 */
export async function getStrategies(): Promise<GetStrategiesRes> {
  const res = await axiosBase.get<PpsApiReturn<GetStrategiesRes>>('/strategies')
  return res.data.data
}
