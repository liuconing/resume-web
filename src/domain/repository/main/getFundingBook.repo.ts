import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得 Funding Book 所需傳入參數 */
export interface GetFundingBookParams {
  /** 資金市場 symbol */
  symbol: string
  /** 掛單簿精度 */
  precision: string
  /** 掛單簿回傳筆數 */
  len: number
}

/** 整理後的 Funding Book 掛單項目 */
export interface NormalizedFundingBookRow {
  /** 掛單日利率 */
  rate: number
  /** 掛單天期 */
  period: number
  /** 同價位掛單數量 */
  count: number
  /** 原始掛單金額 */
  amount: number
  /** 掛單方向 */
  side: string
  /** 掛單金額絕對值 */
  amountAbs: number
}

/** 取得 Funding Book API 回傳格式 */
export interface GetFundingBookRes {
  /** 資金市場 symbol */
  symbol: string
  /** 掛單簿精度 */
  precision: string
  /** 掛單簿回傳筆數 */
  len: number
  /** Bitfinex 掛單簿原始資料 */
  raw: unknown[][]
  /** 整理後的掛單簿資料 */
  normalized: NormalizedFundingBookRow[]
  /** 借款需求列表 */
  borrowDemand: NormalizedFundingBookRow[]
}

/**
 * 取得 Bitfinex Funding Book 掛單簿
 * @param params - 傳入參數，包含 symbol、精度與筆數
 */
export async function getFundingBook(
  params: GetFundingBookParams = { symbol: 'fTESTUSD', precision: 'P0', len: 25 },
): Promise<GetFundingBookRes> {
  const res = await axiosBase.get<PpsApiReturn<GetFundingBookRes>>('/bitfinex/funding-book', { params })
  return res.data.data
}
