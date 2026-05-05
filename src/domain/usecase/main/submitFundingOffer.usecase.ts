import { submitFundingOffer } from '@/domain/repository'
import type { SubmitFundingOfferParams, SubmitFundingOfferRes } from '@/domain/repository'

export interface SubmitFundingOfferDto extends SubmitFundingOfferRes {}
export interface SubmitFundingOfferParamsDto extends SubmitFundingOfferParams {}

/**
 * 送出放貸掛單
 * @param params - 傳入參數，包含幣種、金額、利率與天期
 */
export async function submitFundingOfferUsecase(
  params: SubmitFundingOfferParamsDto,
): Promise<SubmitFundingOfferDto> {
  return submitFundingOffer(params)
}
