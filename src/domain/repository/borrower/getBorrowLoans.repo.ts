import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得借款 loan 列表所需傳入參數 */
export interface GetBorrowLoansParams {
  /** 借款 market symbol */
  symbol?: string
  /** 借款幣種 */
  currency?: string
  /** 歷史借款紀錄查詢筆數 */
  limit?: number
}

/** 取得借款 loan 列表 API 回傳格式 */
export interface GetBorrowLoansRes {
  /** funding market symbol */
  symbol: string
  /** 歷史借款紀錄查詢筆數 */
  limit: number
  /** 目前進行中的 funding loans 原始列表 */
  activeLoans: unknown[]
  /** 目前進行中的借款 loans */
  activeBorrowLoans: unknown[]
  /** 歷史 funding loans 原始列表 */
  loansHist: unknown[]
  /** 歷史借款 loans */
  borrowLoansHist: unknown[]
}

/**
 * 取得借款 loan 列表
 * @param params - 傳入參數，包含 symbol、幣種與歷史筆數
 */
export async function getBorrowLoans(params: GetBorrowLoansParams = {}): Promise<GetBorrowLoansRes> {
  const res = await axiosBase.post<PpsApiReturn<GetBorrowLoansRes>>('/borrower-b/loans/list', params)
  return res.data.data
}
