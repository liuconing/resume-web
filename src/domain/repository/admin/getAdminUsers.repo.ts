import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 管理後台使用者資料 */
export interface AdminPortalUser {
  /** 平台使用者 ID */
  id: string
  /** 平台使用者 email */
  email: string
  /** 使用者角色 */
  role: string
  /** 帳號是否啟用 */
  isActive: boolean
  /** 是否已設定 Bitfinex API 憑證 */
  hasApiCredentials: boolean
  /** 使用者 bot 是否設定啟用 */
  botEnabled: boolean
  /** 使用者 bot runtime 狀態 */
  botStatus: string
  /** 上次 bot tick 時間 */
  lastTickAt: string | null
  /** 下次預計 bot tick 時間 */
  nextTickAt: string | null
  /** 使用者目前總資產金額 */
  totalAssets: number
  /** 使用者建立時間 */
  createdAt: string | null
  /** 使用者資料更新時間 */
  updatedAt: string | null
}

/** 取得管理後台使用者列表 API 回傳格式 */
export type GetAdminUsersRes = AdminPortalUser[]

/**
 * 取得管理後台所有使用者列表
 */
export async function getAdminUsers(): Promise<GetAdminUsersRes> {
  const res = await axiosBase.get<PpsApiReturn<GetAdminUsersRes>>('/admin/users')
  return res.data.data
}
