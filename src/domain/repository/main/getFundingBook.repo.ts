import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetFundingBookReq {
  // 資金市場 symbol。
  symbol: string
  // 掛單簿精度。
  precision: string
  // 掛單簿回傳筆數。
  len: number
}

export interface NormalizedFundingBookRow {
  // 掛單日利率。
  rate: number
  // 掛單天期。
  period: number
  // 同價位掛單數量。
  count: number
  // 原始掛單金額。
  amount: number
  // 掛單方向。
  side: string
  // 掛單金額絕對值。
  amountAbs: number
}

export interface GetFundingBookRes {
  // 資金市場 symbol。
  symbol: string
  // 掛單簿精度。
  precision: string
  // 掛單簿回傳筆數。
  len: number
  // Bitfinex 掛單簿原始資料。
  raw: unknown[][]
  // 整理後的掛單簿資料。
  normalized: NormalizedFundingBookRow[]
  // 借款需求列表。
  borrowDemand: NormalizedFundingBookRow[]
}

export const getFundingBookRepo = async (
  req: GetFundingBookReq = { symbol: 'fTESTUSD', precision: 'P0', len: 25 },
): Promise<GetFundingBookRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetFundingBookRes>>('/bitfinex/funding-book', { params: req })
  return res.data.data
}
