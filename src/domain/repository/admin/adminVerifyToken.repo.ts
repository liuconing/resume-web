import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { AdminUser } from './adminLogin.repo'

export interface AdminVerifyTokenRes {
  // 目前 token 對應的管理員安全資料。
  user: AdminUser
}

export const adminVerifyTokenRepo = async (): Promise<AdminVerifyTokenRes> => {
  const res = await axiosBase.get<PpsApiReturn<AdminVerifyTokenRes>>('/admin/auth/verify')
  return res.data.data
}
