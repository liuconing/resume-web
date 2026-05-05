import { adminVerifyTokenRepo } from '@/domain/repository'

export async function adminVerifyTokenUsecase() {
  return adminVerifyTokenRepo()
}
