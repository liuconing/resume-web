import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 提前還款借款 loan 所需傳入參數 */
export interface CloseBorrowLoanParams {
  /** 要提前還款的 loan ID */
  id: string
  /** 提前還款類型 */
  type?: string
}

/** 提前還款借款 loan API 回傳格式 */
export interface CloseBorrowLoanRes {
  /** 提前還款請求內容 */
  payload: Record<string, unknown>
  /** Bitfinex 提前還款 API 回傳結果 */
  result: unknown
}

/**
 * 提前還款指定借款 loan
 * @param params - 傳入參數，包含 loan ID 與還款類型
 */
export async function closeBorrowLoan(params: CloseBorrowLoanParams): Promise<CloseBorrowLoanRes> {
  const res = await axiosBase.post<PpsApiReturn<CloseBorrowLoanRes>>('/borrower-b/loans/close', params)
  return res.data.data
}
