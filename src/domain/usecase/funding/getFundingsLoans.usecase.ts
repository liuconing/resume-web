import { getFundingsLoansRepo } from '@/domain/repository'

export async function getFundingsLoansUsecase() {
  return getFundingsLoansRepo()
}
