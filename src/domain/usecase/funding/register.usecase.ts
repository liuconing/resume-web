import { registerRepo, type RegisterReq } from '@/domain/repository'

export async function registerUsecase(data: RegisterReq): Promise<void> {
  await registerRepo(data)
}
