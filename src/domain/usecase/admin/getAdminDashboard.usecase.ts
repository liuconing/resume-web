import { getAdminDashboard } from '@/domain/repository'
import type { GetAdminDashboardRes } from '@/domain/repository'

export interface GetAdminDashboardDto extends GetAdminDashboardRes {}

/**
 * 取得管理後台儀表板資料
 */
export async function getAdminDashboardUsecase(): Promise<GetAdminDashboardDto> {
  return getAdminDashboard()
}
