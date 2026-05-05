import { getAdminUsers } from '@/domain/repository'
import type { GetAdminUsersRes } from '@/domain/repository'

export interface GetAdminUsersDto extends GetAdminUsersRes {}

/**
 * 取得管理後台所有使用者列表
 */
export async function getAdminUsersUsecase(): Promise<GetAdminUsersDto> {
  return getAdminUsers()
}
