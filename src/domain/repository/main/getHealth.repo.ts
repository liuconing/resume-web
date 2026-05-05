import { axiosBase } from '@/lib/axios'

/** 取得 API 健康狀態 API 回傳格式 */
export interface GetHealthRes {
  /** API 執行是否成功 */
  ok: boolean
  /** Bitfinex 平台狀態 */
  platformStatus: unknown
  /** 後端伺服器目前時間 */
  serverTime: string
}

/**
 * 取得後端 API 健康狀態
 */
export async function getHealth(): Promise<GetHealthRes> {
  const res = await axiosBase.get<GetHealthRes>('/health')
  return res.data
}
