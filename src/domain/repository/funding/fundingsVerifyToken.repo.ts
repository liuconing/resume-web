import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface FundingsSafeUser {
  // 使用者 ID。
  id: string
  // 使用者 email。
  email: string
  // 使用者建立時間。
  createdAt: string | null
  // 使用者資料更新時間。
  updatedAt: string | null
}

export interface FundingsVerifyTokenRes {
  // 目前 token 對應的使用者資料。
  user: FundingsSafeUser
  // 目前使用者是否已設定 Bitfinex API key 與 secret。
  hasBitfinexCredentials: boolean
  // 使用者設定最後更新時間。
  settingsUpdatedAt: string | null
}

export const fundingsVerifyTokenRepo = async (): Promise<FundingsVerifyTokenRes> => {
  const res = await axiosBase.get<PpsApiReturn<FundingsVerifyTokenRes>>('/fundings/auth/verify')
  return res.data.data
}
