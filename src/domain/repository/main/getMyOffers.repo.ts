import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetMyOffersReq {
  // 要查詢的 funding market symbol。
  symbol: string
}

export interface GetMyOffersRes {
  // funding market symbol。
  symbol: string
  // 目前帳戶放貸掛單列表。
  offers: unknown[]
}

export const getMyOffersRepo = async (
  req: GetMyOffersReq = { symbol: 'fTESTUSD' },
): Promise<GetMyOffersRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetMyOffersRes>>('/bitfinex/my-offers', { params: req })
  return res.data.data
}
