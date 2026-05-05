import { fundingsVerifyToken } from '@/domain/repository'
import type { FundingsVerifyTokenRes } from '@/domain/repository'

export interface FundingsVerifyTokenDto extends FundingsVerifyTokenRes {}

/**
 * 驗證使用者 token 是否有效
 */
export async function fundingsVerifyTokenUsecase(): Promise<FundingsVerifyTokenDto> {
  return fundingsVerifyToken()
}
