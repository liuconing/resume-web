import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 依幣種彙總的平台使用者資產 */
export interface AdminFunds {
  /** TESTUSDT 總資金 */
  TESTUSDT: number
  /** TESTUSD 總資金 */
  TESTUSD: number
  /** USDT 總資金 */
  USDT: number
  /** USD 總資金 */
  USD: number
}

/** 取得管理後台儀表板 API 回傳格式 */
export interface GetAdminDashboardRes {
  /** 目前平台啟用使用者總數 */
  userCount: number
  /** 依幣種彙總的平台使用者資產金額 */
  funds: AdminFunds
  /** 目前正在放貸的使用者數 */
  activeLendingUsers: number
  /** 後台儀表板資料更新時間 */
  updatedAt: string
}

/**
 * 取得管理後台儀表板資料
 */
export async function getAdminDashboard(): Promise<GetAdminDashboardRes> {
  const res = await axiosBase.get<PpsApiReturn<GetAdminDashboardRes>>('/admin/dashboard')
  return res.data.data
}
