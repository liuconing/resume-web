import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 使用者登入所需傳入參數 */
export interface LoginParams {
  /** 使用者 email */
  email: string
  /** 使用者密碼 */
  password: string
}

/** 使用者登入 API 回傳格式 */
export interface LoginRes {
  /** JWT token */
  token: string
  /** 登入使用者資料 */
  user: {
    /** 使用者 ID */
    id: string
    /** 使用者 email */
    email: string
    /** 帳號建立時間 */
    createdAt: string
    /** 帳號更新時間 */
    updatedAt: string
  }
}

/**
 * 使用者登入
 * @param params - 傳入參數，包含 email 與密碼
 */
export async function login(params: LoginParams): Promise<LoginRes> {
  const res = await axiosBase.post<PpsApiReturn<LoginRes>>('/fundings/auth/login', params)
  return res.data.data
}
