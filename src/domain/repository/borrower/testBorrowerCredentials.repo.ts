import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface TestBorrowerCredentialsRes {
  // B 帳號測試是否使用 API 憑證。
  usedAuth: boolean
  // Bitfinex 平台狀態。
  platformStatus: unknown
  // B 帳號 wallet 資料預覽。
  walletPreview: unknown[]
}

export const testBorrowerCredentialsRepo = async (): Promise<TestBorrowerCredentialsRes> => {
  const res = await axiosBase.post<PpsApiReturn<TestBorrowerCredentialsRes>>('/borrower-b/auth/test', null)
  return res.data.data
}
