import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 使用者註冊所需傳入參數 */
export interface RegisterParams {
  /** 使用者 email */
  email: string
  /** 使用者密碼 */
  password: string
  /** 確認密碼 */
  confirmPassword: string
}

/**
 * 使用者註冊
 * @param params - 傳入參數，包含 email、密碼與確認密碼
 */
export async function register(params: RegisterParams): Promise<void> {
  await axiosBase.post<PpsApiReturn<unknown>>('/fundings/auth/register', params)
}
