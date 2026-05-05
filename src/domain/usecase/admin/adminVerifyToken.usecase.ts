import { adminVerifyToken } from '@/domain/repository'
import type { AdminVerifyTokenRes } from '@/domain/repository'

export interface AdminVerifyTokenDto extends AdminVerifyTokenRes {}

/**
 * 驗證管理員 token 是否有效
 */
export async function adminVerifyTokenUsecase(): Promise<AdminVerifyTokenDto> {
  return adminVerifyToken()
}
