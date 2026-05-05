import { fundingsVerifyTokenRepo } from '@/domain/repository'

export async function fundingsVerifyTokenUsecase() {
  return fundingsVerifyTokenRepo()
}
