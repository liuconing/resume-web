import { getAdminUsersRepo } from '@/domain/repository'

export async function getAdminUsersUsecase() {
  return getAdminUsersRepo()
}
