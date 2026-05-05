import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface StrategyItem {
  // 策略 ID。
  id: string
  // 策略顯示名稱。
  label?: string
  // 策略描述。
  description?: string
  // 是否為目前啟用策略。
  active?: boolean
}

export type GetStrategiesRes = StrategyItem[]

export const getStrategiesRepo = async (): Promise<GetStrategiesRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetStrategiesRes>>('/strategies')
  return res.data.data
}
