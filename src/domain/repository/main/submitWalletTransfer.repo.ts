import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { GetWalletBalancesRes } from './getWalletBalances.repo'

/** 送出錢包轉帳所需傳入參數 */
export interface SubmitWalletTransferParams {
  /** 轉帳幣種 */
  currency: string
  /** 轉帳數量 */
  amount: number
  /** 來源錢包 */
  fromWallet: string
  /** 目標錢包 */
  toWallet: string
}

/** 送出錢包轉帳 API 回傳格式 */
export interface SubmitWalletTransferRes {
  /** 本次送往交易所的轉帳參數 */
  payload: Record<string, unknown>
  /** Bitfinex 轉帳 API 回傳結果 */
  result: unknown
  /** 轉帳後指定幣種的錢包餘額摘要 */
  balances: GetWalletBalancesRes
}

/**
 * 送出錢包轉帳
 * @param params - 傳入參數，包含幣種、金額與來源/目標錢包
 */
export async function submitWalletTransfer(params: SubmitWalletTransferParams): Promise<SubmitWalletTransferRes> {
  const res = await axiosBase.post<PpsApiReturn<SubmitWalletTransferRes>>('/bitfinex/wallet-transfer', params)
  return res.data.data
}
