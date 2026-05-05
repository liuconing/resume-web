import { testBitfinexConnection } from '@/domain/repository'
import type { TestBitfinexConnectionRes } from '@/domain/repository'

export interface TestBitfinexConnectionDto extends TestBitfinexConnectionRes {}

/**
 * 測試與 Bitfinex API 的連線狀態
 */
export async function testBitfinexConnectionUsecase(): Promise<TestBitfinexConnectionDto> {
  return testBitfinexConnection()
}
