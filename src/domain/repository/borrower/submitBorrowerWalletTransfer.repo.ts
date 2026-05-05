import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { GetBorrowerWalletBalancesRes } from './getBorrowerWalletBalances.repo'

export interface SubmitBorrowerWalletTransferReq {
  // 轉帳幣種。
  currency: string
  // 轉帳數量。
  amount: number
  // 來源錢包。
  fromWallet: string
  // 目標錢包。
  toWallet: string
}

export interface SubmitBorrowerWalletTransferRes {
  // 錢包轉帳請求內容。
  payload: Record<string, unknown>
  // Bitfinex 轉帳 API 回傳結果。
  result: unknown
  // 轉帳後指定幣種的錢包餘額摘要。
  balances: GetBorrowerWalletBalancesRes
}

export const submitBorrowerWalletTransferRepo = async (
  req: SubmitBorrowerWalletTransferReq,
): Promise<SubmitBorrowerWalletTransferRes> => {
  const res = await axiosBase.post<PpsApiReturn<SubmitBorrowerWalletTransferRes>>('/borrower-b/wallet-transfer', req)
  return res.data.data
}
