import { cancelFundingOffer } from '@/domain/repository'
import type { CancelFundingOfferParams, CancelFundingOfferRes } from '@/domain/repository'

export interface CancelFundingOfferDto extends CancelFundingOfferRes {}
export interface CancelFundingOfferParamsDto extends CancelFundingOfferParams {}

/**
 * 取消指定放貸掛單
 * @param params - 傳入參數，包含掛單 ID
 */
export async function cancelFundingOfferUsecase(
  params: CancelFundingOfferParamsDto,
): Promise<CancelFundingOfferDto> {
  return cancelFundingOffer(params)
}
