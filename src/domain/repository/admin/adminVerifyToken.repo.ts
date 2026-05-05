import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { AdminUser } from './adminLogin.repo'

/** 管理員驗證 token API 回傳格式 */
export interface AdminVerifyTokenRes {
  /** 目前 token 對應的管理員安全資料 */
  user: AdminUser
}

/**
 * 驗證管理員 token 是否有效
 */
export async function adminVerifyToken(): Promise<AdminVerifyTokenRes> {
  const res = await axiosBase.get<PpsApiReturn<AdminVerifyTokenRes>>('/admin/auth/verify')
  return res.data.data
}
