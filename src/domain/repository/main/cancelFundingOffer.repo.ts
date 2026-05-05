import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取消放貸掛單所需傳入參數 */
export interface CancelFundingOfferParams {
  /** 要取消的放貸掛單 ID */
  id: string
}

/** 取消放貸掛單 API 回傳格式 */
export interface CancelFundingOfferRes {
  /** 本次取消掛單的請求參數 */
  payload: Record<string, unknown>
  /** Bitfinex 取消掛單 API 回傳結果 */
  result: unknown
}

/**
 * 取消指定放貸掛單
 * @param params - 傳入參數，包含掛單 ID
 */
export async function cancelFundingOffer(params: CancelFundingOfferParams): Promise<CancelFundingOfferRes> {
  const res = await axiosBase.post<PpsApiReturn<CancelFundingOfferRes>>('/bitfinex/funding-offers/cancel', params)
  return res.data.data
}
