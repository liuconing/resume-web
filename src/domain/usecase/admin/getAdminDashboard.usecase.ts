import { getAdminDashboardRepo } from '@/domain/repository'

export async function getAdminDashboardUsecase() {
  return getAdminDashboardRepo()
}
