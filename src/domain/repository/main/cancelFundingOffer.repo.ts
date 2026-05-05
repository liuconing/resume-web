import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface CancelFundingOfferReq {
  // 要取消的放貸掛單 ID。
  id: string
}

export interface CancelFundingOfferRes {
  // 本次取消掛單的請求參數。
  payload: Record<string, unknown>
  // Bitfinex 取消掛單 API 回傳結果。
  result: unknown
}

export const cancelFundingOfferRepo = async (
  req: CancelFundingOfferReq,
): Promise<CancelFundingOfferRes> => {
  const res = await axiosBase.post<PpsApiReturn<CancelFundingOfferRes>>('/bitfinex/funding-offers/cancel', req)
  return res.data.data
}
