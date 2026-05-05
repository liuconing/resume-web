import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得借款需求列表所需傳入參數 */
export interface GetBorrowDemandsParams {
  /** 借款 market symbol */
  symbol?: string
  /** 借款幣種 */
  currency?: string
}

/** 取得借款需求列表 API 回傳格式 */
export interface GetBorrowDemandsRes {
  /** funding market symbol */
  symbol: string
  /** B 帳號目前 funding offers 原始列表 */
  offers: unknown[]
  /** 借款需求列表 */
  demands: unknown[]
}

/**
 * 取得借款需求列表
 * @param params - 傳入參數，包含 symbol 或幣種
 */
export async function getBorrowDemands(params: GetBorrowDemandsParams = {}): Promise<GetBorrowDemandsRes> {
  const res = await axiosBase.post<PpsApiReturn<GetBorrowDemandsRes>>('/borrower-b/demands/list', params)
  return res.data.data
}
