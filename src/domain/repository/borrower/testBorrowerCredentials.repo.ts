import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 測試借款方 Bitfinex API 憑證 API 回傳格式 */
export interface TestBorrowerCredentialsRes {
  /** B 帳號測試是否使用 API 憑證 */
  usedAuth: boolean
  /** Bitfinex 平台狀態 */
  platformStatus: unknown
  /** B 帳號 wallet 資料預覽 */
  walletPreview: unknown[]
}

/**
 * 測試借款方 Bitfinex API 憑證是否有效
 */
export async function testBorrowerCredentials(): Promise<TestBorrowerCredentialsRes> {
  const res = await axiosBase.post<PpsApiReturn<TestBorrowerCredentialsRes>>('/borrower-b/auth/test', null)
  return res.data.data
}
