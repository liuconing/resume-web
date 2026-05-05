import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetWalletBalancesReq {
  // 查詢的幣種。
  currency: string
}

export interface WalletBalanceItem {
  // 錢包總餘額。
  total: number
  // 錢包可用餘額。
  available: number
}

export interface GetWalletBalancesRes {
  // 查詢的幣種。
  currency: string
  // 現貨錢包餘額摘要。
  exchange: WalletBalanceItem
  // 融資錢包餘額摘要。
  funding: WalletBalanceItem
  // 保證金錢包餘額摘要。
  margin: WalletBalanceItem
}

export const getWalletBalancesRepo = async (
  req: GetWalletBalancesReq = { currency: 'TESTUSDT' },
): Promise<GetWalletBalancesRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetWalletBalancesRes>>('/bitfinex/wallet-balances', { params: req })
  return res.data.data
}
