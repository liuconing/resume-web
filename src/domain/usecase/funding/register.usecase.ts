import { register as registerRepo } from '@/domain/repository'
import type { RegisterParams } from '@/domain/repository'

export interface RegisterParamsDto extends RegisterParams {}

/**
 * 使用者註冊
 * @param params - 傳入參數，包含 email、密碼與確認密碼
 */
export async function registerUsecase(params: RegisterParamsDto): Promise<void> {
  await registerRepo(params)
}
