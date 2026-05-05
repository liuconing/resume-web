import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 送出非市價借款需求所需傳入參數 */
export interface SubmitNonMarketableBorrowDemandParams {
  /** 借款 market symbol */
  symbol?: string
  /** 借款幣種 */
  currency?: string
  /** 借款數量 */
  amount?: number
  /** 指定每日利率 */
  rate?: number
  /** 借款天期 */
  period?: number
  /** 掛單型別 */
  type?: string
  /** Bitfinex 旗標整數 */
  flags?: number
}

/** 非市價借款需求送單前的市場預覽資料 */
export interface NonMarketableDemandPreview {
  /** 實際使用的 funding market symbol */
  symbol: string
  /** 目前市場最低放貸日利率 */
  bestAskRate: number | null
  /** 目前市場最低放貸利率對應天期 */
  bestAskPeriod: number | null
  /** 本次測試借款需求選用的日利率 */
  chosenRate: number
  /** 預期是否會立即成交 */
  expectedImmediateFill: boolean
}

/** 送出非市價借款需求 API 回傳格式 */
export interface SubmitNonMarketableBorrowDemandRes {
  /** 送出測試借款需求的請求內容 */
  payload: Record<string, unknown>
  /** Bitfinex 送單 API 回傳結果 */
  result: unknown
  /** 送單前依掛單簿推導出的市場與利率預覽 */
  marketPreview: NonMarketableDemandPreview
}

/**
 * 送出非市價借款需求（測試用）
 * @param params - 傳入參數，包含幣種、金額、利率與天期
 */
export async function submitNonMarketableBorrowDemand(
  params: SubmitNonMarketableBorrowDemandParams = {},
): Promise<SubmitNonMarketableBorrowDemandRes> {
  const res = await axiosBase.post<PpsApiReturn<SubmitNonMarketableBorrowDemandRes>>('/borrower-b/demands/submit-non-marketable-test', params)
  return res.data.data
}
