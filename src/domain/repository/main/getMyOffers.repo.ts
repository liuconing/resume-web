import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得我的放貸掛單所需傳入參數 */
export interface GetMyOffersParams {
  /** 要查詢的 funding market symbol */
  symbol: string
}

/** 取得我的放貸掛單 API 回傳格式 */
export interface GetMyOffersRes {
  /** funding market symbol */
  symbol: string
  /** 目前帳戶放貸掛單列表 */
  offers: unknown[]
}

/**
 * 取得目前帳戶的放貸掛單列表
 * @param params - 傳入參數，包含 symbol
 */
export async function getMyOffers(
  params: GetMyOffersParams = { symbol: 'fTESTUSD' },
): Promise<GetMyOffersRes> {
  const res = await axiosBase.get<PpsApiReturn<GetMyOffersRes>>('/bitfinex/my-offers', { params })
  return res.data.data
}
