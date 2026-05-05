import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface SubmitFundingOfferReq {
  // 掛單型別。
  type?: string
  // funding market symbol。
  symbol?: string
  // 放貸數量。
  amount?: string | number
  // 每日利率。
  rate?: string | number
  // 放貸天數。
  period?: number
  // Bitfinex 旗標整數。
  flags?: number
}

export interface SubmitFundingOfferRes {
  // 本次送出的放貸掛單參數。
  payload: Record<string, unknown>
  // Bitfinex 送單 API 回傳結果。
  result: unknown
}

export const submitFundingOfferRepo = async (
  req: SubmitFundingOfferReq,
): Promise<SubmitFundingOfferRes> => {
  const res = await axiosBase.post<PpsApiReturn<SubmitFundingOfferRes>>('/bitfinex/funding-offers', req)
  return res.data.data
}
