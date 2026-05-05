import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 送出借款需求所需傳入參數 */
export interface SubmitBorrowDemandParams {
  /** 借款 market symbol */
  symbol?: string
  /** 借款幣種 */
  currency?: string
  /** 借款數量 */
  amount: number
  /** 每日利率 */
  rate: number
  /** 借款天期 */
  period: number
  /** 掛單型別 */
  type?: string
  /** Bitfinex 旗標整數 */
  flags?: number
}

/** 送出借款需求 API 回傳格式 */
export interface SubmitBorrowDemandRes {
  /** 送出借款需求的請求內容 */
  payload: Record<string, unknown>
  /** Bitfinex 送單 API 回傳結果 */
  result: unknown
}

/**
 * 送出借款需求掛單
 * @param params - 傳入參數，包含幣種、金額、利率與天期
 */
export async function submitBorrowDemand(params: SubmitBorrowDemandParams): Promise<SubmitBorrowDemandRes> {
  const res = await axiosBase.post<PpsApiReturn<SubmitBorrowDemandRes>>('/borrower-b/demands/submit', params)
  return res.data.data
}
