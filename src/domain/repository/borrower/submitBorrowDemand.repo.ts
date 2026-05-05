import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface SubmitBorrowDemandReq {
  // 借款 market symbol。
  symbol?: string
  // 借款幣種。
  currency?: string
  // 借款數量。
  amount: number
  // 每日利率。
  rate: number
  // 借款天期。
  period: number
  // 掛單型別。
  type?: string
  // Bitfinex 旗標整數。
  flags?: number
}

export interface SubmitBorrowDemandRes {
  // 送出借款需求的請求內容。
  payload: Record<string, unknown>
  // Bitfinex 送單 API 回傳結果。
  result: unknown
}

export const submitBorrowDemandRepo = async (
  req: SubmitBorrowDemandReq,
): Promise<SubmitBorrowDemandRes> => {
  const res = await axiosBase.post<PpsApiReturn<SubmitBorrowDemandRes>>('/borrower-b/demands/submit', req)
  return res.data.data
}
