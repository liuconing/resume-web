import { login as loginRepo, setLocalStorage } from '@/domain/repository'
import type { LoginParams } from '@/domain/repository'

export interface LoginParamsDto extends LoginParams {}

/**
 * 使用者登入，成功後儲存 token 至 localStorage
 * @param params - 傳入參數，包含 email 與密碼
 */
export async function loginUsecase(params: LoginParamsDto): Promise<boolean> {
  try {
    const data = await loginRepo(params)
    setLocalStorage(data.token)
    return true
  } catch {
    return false
  }
}
