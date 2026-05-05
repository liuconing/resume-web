import { adminLogin } from '@/domain/repository'
import type { AdminLoginParams, AdminLoginRes } from '@/domain/repository'

export interface AdminLoginDto extends AdminLoginRes {}
export interface AdminLoginParamsDto extends AdminLoginParams {}

/**
 * 管理員登入
 * @param params - 傳入參數，包含帳號與密碼
 */
export async function adminLoginUsecase(params: AdminLoginParamsDto): Promise<AdminLoginDto> {
  return adminLogin(params)
}
