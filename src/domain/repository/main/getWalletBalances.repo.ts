import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得錢包餘額所需傳入參數 */
export interface GetWalletBalancesParams {
  /** 查詢的幣種 */
  currency: string
}

/** 錢包單一類型餘額資料 */
export interface WalletBalanceItem {
  /** 錢包總餘額 */
  total: number
  /** 錢包可用餘額 */
  available: number
}

/** 取得錢包餘額 API 回傳格式 */
export interface GetWalletBalancesRes {
  /** 查詢的幣種 */
  currency: string
  /** 現貨錢包餘額摘要 */
  exchange: WalletBalanceItem
  /** 融資錢包餘額摘要 */
  funding: WalletBalanceItem
  /** 保證金錢包餘額摘要 */
  margin: WalletBalanceItem
}

/**
 * 取得指定幣種的各錢包餘額
 * @param params - 傳入參數，包含幣種
 */
export async function getWalletBalances(
  params: GetWalletBalancesParams = { currency: 'TESTUSDT' },
): Promise<GetWalletBalancesRes> {
  const res = await axiosBase.get<PpsApiReturn<GetWalletBalancesRes>>('/bitfinex/wallet-balances', { params })
  return res.data.data
}
