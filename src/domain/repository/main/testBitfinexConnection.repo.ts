import { axiosBase } from '@/lib/axios'

/** 測試 Bitfinex 連線 API 回傳格式 */
export interface TestBitfinexConnectionRes {
  /** API 執行是否成功 */
  ok: boolean
  /** Bitfinex 平台狀態 */
  platformStatus: unknown
  /** 錢包資料預覽 */
  walletPreview: unknown[]
  /** 本次測試是否使用 API 憑證 */
  usedAuth: boolean
}

/**
 * 測試與 Bitfinex API 的連線狀態
 */
export async function testBitfinexConnection(): Promise<TestBitfinexConnectionRes> {
  const res = await axiosBase.post<TestBitfinexConnectionRes>('/bitfinex/test-connection', null)
  return res.data
}
