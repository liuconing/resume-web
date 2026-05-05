import { activateStrategyRepo, type ActivateStrategyReq } from '@/domain/repository'

export async function activateStrategyUsecase(req: ActivateStrategyReq) {
  return activateStrategyRepo(req)
}
