import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetBorrowerWalletBalancesReq {
  // 查詢的幣種。
  currency: string
}

export interface BorrowerWalletBalanceItem {
  // 錢包總餘額。
  total: number
  // 錢包可用餘額。
  available: number
}

export interface GetBorrowerWalletBalancesRes {
  // 查詢的幣種。
  currency: string
  // 現貨錢包餘額摘要。
  exchange: BorrowerWalletBalanceItem
  // 融資錢包餘額摘要。
  funding: BorrowerWalletBalanceItem
  // 保證金錢包餘額摘要。
  margin: BorrowerWalletBalanceItem
}

export const getBorrowerWalletBalancesRepo = async (
  req: GetBorrowerWalletBalancesReq = { currency: 'TESTUSDT' },
): Promise<GetBorrowerWalletBalancesRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetBorrowerWalletBalancesRes>>('/borrower-b/wallet-balances', { params: req })
  return res.data.data
}
