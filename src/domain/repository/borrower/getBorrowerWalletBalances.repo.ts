import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得借款方錢包餘額所需傳入參數 */
export interface GetBorrowerWalletBalancesParams {
  /** 查詢的幣種 */
  currency: string
}

/** 借款方錢包單一類型餘額資料 */
export interface BorrowerWalletBalanceItem {
  /** 錢包總餘額 */
  total: number
  /** 錢包可用餘額 */
  available: number
}

/** 取得借款方錢包餘額 API 回傳格式 */
export interface GetBorrowerWalletBalancesRes {
  /** 查詢的幣種 */
  currency: string
  /** 現貨錢包餘額摘要 */
  exchange: BorrowerWalletBalanceItem
  /** 融資錢包餘額摘要 */
  funding: BorrowerWalletBalanceItem
  /** 保證金錢包餘額摘要 */
  margin: BorrowerWalletBalanceItem
}

/**
 * 取得借款方指定幣種的各錢包餘額
 * @param params - 傳入參數，包含幣種
 */
export async function getBorrowerWalletBalances(
  params: GetBorrowerWalletBalancesParams = { currency: 'TESTUSDT' },
): Promise<GetBorrowerWalletBalancesRes> {
  const res = await axiosBase.get<PpsApiReturn<GetBorrowerWalletBalancesRes>>('/borrower-b/wallet-balances', { params })
  return res.data.data
}
