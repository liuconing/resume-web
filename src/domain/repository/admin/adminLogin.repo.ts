import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 管理員登入所需傳入參數 */
export interface AdminLoginParams {
  /** 管理員帳號 */
  username: string
  /** 管理員密碼 */
  password: string
}

/** 管理員使用者資料 */
export interface AdminUser {
  /** 管理員 ID */
  id: string
  /** 管理員帳號 */
  username: string
  /** 管理員角色 */
  role: string
  /** 帳號是否啟用 */
  isActive: boolean
  /** 管理員建立時間 */
  createdAt: string | null
  /** 管理員資料更新時間 */
  updatedAt: string | null
}

/** 管理員登入 API 回傳格式 */
export interface AdminLoginRes {
  /** 後台 API 使用的 JWT */
  token: string
  /** 管理員安全資料 */
  user: AdminUser
}

/**
 * 管理員登入
 * @param params - 傳入參數，包含帳號與密碼
 */
export async function adminLogin(params: AdminLoginParams): Promise<AdminLoginRes> {
  const res = await axiosBase.post<PpsApiReturn<AdminLoginRes>>('/admin/auth/login', params)
  return res.data.data
}
