import { getStrategiesRepo } from '@/domain/repository'

export async function getStrategiesUsecase() {
  return getStrategiesRepo()
}
