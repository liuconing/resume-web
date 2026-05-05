import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { GetWalletBalancesRes } from './getWalletBalances.repo'

export interface SubmitWalletTransferReq {
  // 轉帳幣種。
  currency: string
  // 轉帳數量。
  amount: number
  // 來源錢包。
  fromWallet: string
  // 目標錢包。
  toWallet: string
}

export interface SubmitWalletTransferRes {
  // 本次送往交易所的轉帳參數。
  payload: Record<string, unknown>
  // Bitfinex 轉帳 API 回傳結果。
  result: unknown
  // 轉帳後指定幣種的錢包餘額摘要。
  balances: GetWalletBalancesRes
}

export const submitWalletTransferRepo = async (
  req: SubmitWalletTransferReq,
): Promise<SubmitWalletTransferRes> => {
  const res = await axiosBase.post<PpsApiReturn<SubmitWalletTransferRes>>('/bitfinex/wallet-transfer', req)
  return res.data.data
}
