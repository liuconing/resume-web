import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetBorrowDemandsReq {
  // 借款 market symbol。
  symbol?: string
  // 借款幣種。
  currency?: string
}

export interface GetBorrowDemandsRes {
  // funding market symbol。
  symbol: string
  // B 帳號目前 funding offers 原始列表。
  offers: unknown[]
  // 借款需求列表。
  demands: unknown[]
}

export const getBorrowDemandsRepo = async (
  req: GetBorrowDemandsReq = {},
): Promise<GetBorrowDemandsRes> => {
  const res = await axiosBase.post<PpsApiReturn<GetBorrowDemandsRes>>('/borrower-b/demands/list', req)
  return res.data.data
}
