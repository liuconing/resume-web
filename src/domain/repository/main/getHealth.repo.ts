import { axiosBase } from '@/lib/axios'

export interface GetHealthRes {
  // API 執行是否成功。
  ok: boolean
  // Bitfinex 平台狀態。
  platformStatus: unknown
  // 後端伺服器目前時間。
  serverTime: string
}

export const getHealthRepo = async (): Promise<GetHealthRes> => {
  const res = await axiosBase.get<GetHealthRes>('/health')
  return res.data
}
