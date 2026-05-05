import { submitNonMarketableBorrowDemand } from '@/domain/repository'
import type {
  SubmitNonMarketableBorrowDemandParams,
  SubmitNonMarketableBorrowDemandRes,
} from '@/domain/repository'

export interface SubmitNonMarketableBorrowDemandDto extends SubmitNonMarketableBorrowDemandRes {}
export interface SubmitNonMarketableBorrowDemandParamsDto extends SubmitNonMarketableBorrowDemandParams {}

/**
 * 送出非市價借款需求（測試用）
 * @param params - 傳入參數，包含幣種、金額、利率與天期
 */
export async function submitNonMarketableBorrowDemandUsecase(
  params?: SubmitNonMarketableBorrowDemandParamsDto,
): Promise<SubmitNonMarketableBorrowDemandDto> {
  return submitNonMarketableBorrowDemand(params as SubmitNonMarketableBorrowDemandParams)
}
