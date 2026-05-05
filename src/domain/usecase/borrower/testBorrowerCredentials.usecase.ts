import { testBorrowerCredentialsRepo } from '@/domain/repository'

export async function testBorrowerCredentialsUsecase() {
  return testBorrowerCredentialsRepo()
}
