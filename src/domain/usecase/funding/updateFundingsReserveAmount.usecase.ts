import { updateFundingsReserveAmount } from '@/domain/repository'
import type {
  UpdateFundingsReserveAmountParams,
  UpdateFundingsReserveAmountRes,
} from '@/domain/repository'

export interface UpdateFundingsReserveAmountDto extends UpdateFundingsReserveAmountRes {}
export interface UpdateFundingsReserveAmountParamsDto extends UpdateFundingsReserveAmountParams {}

/**
 * 更新放貸保留金額
 * @param params - 傳入參數，包含保留金額
 */
export async function updateFundingsReserveAmountUsecase(
  params: UpdateFundingsReserveAmountParamsDto,
): Promise<UpdateFundingsReserveAmountDto> {
  return updateFundingsReserveAmount(params)
}
