import { getModulesRepo } from '@/domain/repository'

export async function getModulesUsecase() {
  return getModulesRepo()
}
