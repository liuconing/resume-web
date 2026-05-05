import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 使用者安全資料（不含敏感欄位） */
export interface FundingsSafeUser {
  /** 使用者 ID */
  id: string
  /** 使用者 email */
  email: string
  /** 使用者建立時間 */
  createdAt: string | null
  /** 使用者資料更新時間 */
  updatedAt: string | null
}

/** 驗證 token API 回傳格式 */
export interface FundingsVerifyTokenRes {
  /** 目前 token 對應的使用者資料 */
  user: FundingsSafeUser
  /** 目前使用者是否已設定 Bitfinex API key 與 secret */
  hasBitfinexCredentials: boolean
  /** 使用者設定最後更新時間 */
  settingsUpdatedAt: string | null
}

/**
 * 驗證使用者 token 是否有效
 */
export async function fundingsVerifyToken(): Promise<FundingsVerifyTokenRes> {
  const res = await axiosBase.get<PpsApiReturn<FundingsVerifyTokenRes>>('/fundings/auth/verify')
  return res.data.data
}
