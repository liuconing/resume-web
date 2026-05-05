import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface AdminLoginReq {
  // 管理員帳號。
  username: string
  // 管理員密碼。
  password: string
}

export interface AdminUser {
  // 管理員 ID。
  id: string
  // 管理員帳號。
  username: string
  // 管理員角色。
  role: string
  // 帳號是否啟用。
  isActive: boolean
  // 管理員建立時間。
  createdAt: string | null
  // 管理員資料更新時間。
  updatedAt: string | null
}

export interface AdminLoginRes {
  // 後台 API 使用的 JWT。
  token: string
  // 管理員安全資料。
  user: AdminUser
}

export const adminLoginRepo = async (req: AdminLoginReq): Promise<AdminLoginRes> => {
  const res = await axiosBase.post<PpsApiReturn<AdminLoginRes>>('/admin/auth/login', req)
  return res.data.data
}
