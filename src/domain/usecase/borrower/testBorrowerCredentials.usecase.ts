import { testBorrowerCredentials } from '@/domain/repository'
import type { TestBorrowerCredentialsRes } from '@/domain/repository'

export interface TestBorrowerCredentialsDto extends TestBorrowerCredentialsRes {}

/**
 * 測試借款方 Bitfinex API 憑證是否有效
 */
export async function testBorrowerCredentialsUsecase(): Promise<TestBorrowerCredentialsDto> {
  return testBorrowerCredentials()
}
