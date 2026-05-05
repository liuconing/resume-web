import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 送出放貸掛單所需傳入參數 */
export interface SubmitFundingOfferParams {
  /** 掛單型別 */
  type?: string
  /** funding market symbol */
  symbol?: string
  /** 放貸數量 */
  amount?: string | number
  /** 每日利率 */
  rate?: string | number
  /** 放貸天數 */
  period?: number
  /** Bitfinex 旗標整數 */
  flags?: number
}

/** 送出放貸掛單 API 回傳格式 */
export interface SubmitFundingOfferRes {
  /** 本次送出的放貸掛單參數 */
  payload: Record<string, unknown>
  /** Bitfinex 送單 API 回傳結果 */
  result: unknown
}

/**
 * 送出放貸掛單
 * @param params - 傳入參數，包含幣種、金額、利率與天期
 */
export async function submitFundingOffer(params: SubmitFundingOfferParams): Promise<SubmitFundingOfferRes> {
  const res = await axiosBase.post<PpsApiReturn<SubmitFundingOfferRes>>('/bitfinex/funding-offers', params)
  return res.data.data
}
