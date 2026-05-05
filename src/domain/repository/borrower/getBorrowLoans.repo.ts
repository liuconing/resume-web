import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetBorrowLoansReq {
  // 借款 market symbol。
  symbol?: string
  // 借款幣種。
  currency?: string
  // 歷史借款紀錄查詢筆數。
  limit?: number
}

export interface GetBorrowLoansRes {
  // funding market symbol。
  symbol: string
  // 歷史借款紀錄查詢筆數。
  limit: number
  // 目前進行中的 funding loans 原始列表。
  activeLoans: unknown[]
  // 目前進行中的借款 loans。
  activeBorrowLoans: unknown[]
  // 歷史 funding loans 原始列表。
  loansHist: unknown[]
  // 歷史借款 loans。
  borrowLoansHist: unknown[]
}

export const getBorrowLoansRepo = async (
  req: GetBorrowLoansReq = {},
): Promise<GetBorrowLoansRes> => {
  const res = await axiosBase.post<PpsApiReturn<GetBorrowLoansRes>>('/borrower-b/loans/list', req)
  return res.data.data
}
