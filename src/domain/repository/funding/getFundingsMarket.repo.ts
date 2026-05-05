import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得放貸市場資料所需傳入參數 */
export interface GetFundingsMarketParams {
  /** 查詢的幣種 */
  currency: string
  /** 掛單簿查詢筆數 */
  len: number
}

/** 借款需求掛單項目 */
export interface BorrowDemandItem {
  /** 借款需求日利率 */
  rateDaily: number
  /** 借款需求年化百分比 */
  rateAprPct: number
  /** 借款需求天期 */
  period: number
  /** 同條件需求筆數 */
  count: number
  /** 借款需求金額 */
  amount: number
}

/** 取得放貸市場資料 API 回傳格式 */
export interface GetFundingsMarketRes {
  /** 查詢的幣種 */
  currency: string
  /** 實際使用的 Bitfinex funding market symbol */
  symbol: string
  /** 掛單簿查詢筆數 */
  len: number
  /** 是否由測試市場 fallback 到正式市場 */
  usedFallback: boolean
  /** 目前借款需求中的最佳日利率 */
  bestRateDaily: number
  /** 最佳日利率換算成年化百分比 */
  annualizedPct: number
  /** 目前借款需求總金額 */
  demandAmount: number
  /** 借款需求列表，依日利率由高到低排序 */
  borrowDemands: BorrowDemandItem[]
}

/**
 * 取得放貸市場掛單簿與借款需求資料
 * @param params - 傳入參數，包含幣種與掛單簿筆數
 */
export async function getFundingsMarket(
  params: GetFundingsMarketParams = { currency: 'TESTUSDT', len: 25 },
): Promise<GetFundingsMarketRes> {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsMarketRes>>('/fundings/market', { params })
  return res.data.data
}
