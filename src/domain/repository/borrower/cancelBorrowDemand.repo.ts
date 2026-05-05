import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface CancelBorrowDemandReq {
  // 要取消的借款需求 ID。
  id: string
}

export interface CancelBorrowDemandRes {
  // 取消借款需求的請求內容。
  payload: Record<string, unknown>
  // Bitfinex 取消掛單 API 回傳結果。
  result: unknown
}

export const cancelBorrowDemandRepo = async (
  req: CancelBorrowDemandReq,
): Promise<CancelBorrowDemandRes> => {
  const res = await axiosBase.post<PpsApiReturn<CancelBorrowDemandRes>>('/borrower-b/demands/cancel', req)
  return res.data.data
}
