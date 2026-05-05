import { getWalletBalances } from '@/domain/repository'
import type { GetWalletBalancesParams, GetWalletBalancesRes } from '@/domain/repository'

export interface GetWalletBalancesDto extends GetWalletBalancesRes {}
export interface GetWalletBalancesParamsDto extends GetWalletBalancesParams {}

/**
 * 取得指定幣種的各錢包餘額
 * @param params - 傳入參數，包含幣種
 */
export async function getWalletBalancesUsecase(
  params?: GetWalletBalancesParamsDto,
): Promise<GetWalletBalancesDto> {
  return getWalletBalances(params)
}
