import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface CloseBorrowLoanReq {
  // 要提前還款的 loan ID。
  id: string
  // 提前還款類型。
  type?: string
}

export interface CloseBorrowLoanRes {
  // 提前還款請求內容。
  payload: Record<string, unknown>
  // Bitfinex 提前還款 API 回傳結果。
  result: unknown
}

export const closeBorrowLoanRepo = async (
  req: CloseBorrowLoanReq,
): Promise<CloseBorrowLoanRes> => {
  const res = await axiosBase.post<PpsApiReturn<CloseBorrowLoanRes>>('/borrower-b/loans/close', req)
  return res.data.data
}
