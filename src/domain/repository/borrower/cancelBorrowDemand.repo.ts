import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取消借款需求所需傳入參數 */
export interface CancelBorrowDemandParams {
  /** 要取消的借款需求 ID */
  id: string
}

/** 取消借款需求 API 回傳格式 */
export interface CancelBorrowDemandRes {
  /** 取消借款需求的請求內容 */
  payload: Record<string, unknown>
  /** Bitfinex 取消掛單 API 回傳結果 */
  result: unknown
}

/**
 * 取消指定借款需求
 * @param params - 傳入參數，包含要取消的借款需求 ID
 */
export async function cancelBorrowDemand(params: CancelBorrowDemandParams): Promise<CancelBorrowDemandRes> {
  const res = await axiosBase.post<PpsApiReturn<CancelBorrowDemandRes>>('/borrower-b/demands/cancel', params)
  return res.data.data
}
