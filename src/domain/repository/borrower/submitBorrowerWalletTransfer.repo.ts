import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { GetBorrowerWalletBalancesRes } from './getBorrowerWalletBalances.repo'

/** 借款方錢包轉帳所需傳入參數 */
export interface SubmitBorrowerWalletTransferParams {
  /** 轉帳幣種 */
  currency: string
  /** 轉帳數量 */
  amount: number
  /** 來源錢包 */
  fromWallet: string
  /** 目標錢包 */
  toWallet: string
}

/** 借款方錢包轉帳 API 回傳格式 */
export interface SubmitBorrowerWalletTransferRes {
  /** 錢包轉帳請求內容 */
  payload: Record<string, unknown>
  /** Bitfinex 轉帳 API 回傳結果 */
  result: unknown
  /** 轉帳後指定幣種的錢包餘額摘要 */
  balances: GetBorrowerWalletBalancesRes
}

/**
 * 送出借款方錢包轉帳
 * @param params - 傳入參數，包含幣種、金額與來源/目標錢包
 */
export async function submitBorrowerWalletTransfer(params: SubmitBorrowerWalletTransferParams): Promise<SubmitBorrowerWalletTransferRes> {
  const res = await axiosBase.post<PpsApiReturn<SubmitBorrowerWalletTransferRes>>('/borrower-b/wallet-transfer', params)
  return res.data.data
}
