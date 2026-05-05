import { testBitfinexConnectionRepo } from '@/domain/repository'

export async function testBitfinexConnectionUsecase() {
  return testBitfinexConnectionRepo()
}
