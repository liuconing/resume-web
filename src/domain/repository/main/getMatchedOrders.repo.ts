import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得歷史成交訂單所需傳入參數 */
export interface GetMatchedOrdersParams {
  /** 要查詢的 funding market symbol */
  symbol: string
  /** 歷史完成訂單回傳筆數 */
  limit: number
}

/** 取得歷史成交訂單 API 回傳格式 */
export interface GetMatchedOrdersRes {
  /** funding market symbol */
  symbol: string
  /** 目前進行中的 funding loans */
  activeLoans: unknown[]
  /** 歷史 funding credits 紀錄 */
  creditsHist: unknown[]
}

/**
 * 取得歷史成交的 funding 訂單
 * @param params - 傳入參數，包含 symbol 與筆數
 */
export async function getMatchedOrders(
  params: GetMatchedOrdersParams = { symbol: 'fTESTUSD', limit: 50 },
): Promise<GetMatchedOrdersRes> {
  const res = await axiosBase.get<PpsApiReturn<GetMatchedOrdersRes>>('/bitfinex/matched-orders', { params })
  return res.data.data
}
