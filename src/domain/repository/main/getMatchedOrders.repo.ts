import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetMatchedOrdersReq {
  // 要查詢的 funding market symbol。
  symbol: string
  // 歷史完成訂單回傳筆數。
  limit: number
}

export interface GetMatchedOrdersRes {
  // funding market symbol。
  symbol: string
  // 目前進行中的 funding loans。
  activeLoans: unknown[]
  // 歷史 funding credits 紀錄。
  creditsHist: unknown[]
}

export const getMatchedOrdersRepo = async (
  req: GetMatchedOrdersReq = { symbol: 'fTESTUSD', limit: 50 },
): Promise<GetMatchedOrdersRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetMatchedOrdersRes>>('/bitfinex/matched-orders', { params: req })
  return res.data.data
}
