import { getBorrowerWalletBalances } from '@/domain/repository'
import type {
  GetBorrowerWalletBalancesParams,
  GetBorrowerWalletBalancesRes,
} from '@/domain/repository'

export interface GetBorrowerWalletBalancesDto extends GetBorrowerWalletBalancesRes {}
export interface GetBorrowerWalletBalancesParamsDto extends GetBorrowerWalletBalancesParams {}

/**
 * 取得借款方指定幣種的各錢包餘額
 * @param params - 傳入參數，包含幣種
 */
export async function getBorrowerWalletBalancesUsecase(
  params?: GetBorrowerWalletBalancesParamsDto,
): Promise<GetBorrowerWalletBalancesDto> {
  return getBorrowerWalletBalances(params as GetBorrowerWalletBalancesParams)
}
