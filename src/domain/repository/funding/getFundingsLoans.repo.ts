import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface FundingsLoanItem {
  // loan ID。
  id: string
  // funding market symbol。
  symbol: string
  // 放貸幣種。
  currency: string
  // 放貸金額。
  amount: number
  // 年化利率百分比。
  rateAprPct: number
  // 放貸天期。
  periodDays: number
  // 放貸開始時間。
  lendAt: number | null
  // 放貸到期時間。
  dueAt: number | null
  // 剩餘時間顯示文字。
  remainingText: string
  // loan 狀態。
  status: string
}

export interface FundingsLoanSymbolSummary {
  // funding market symbol。
  symbol: string
  // 目前進行中的放貸筆數。
  activeLoans: number
  // 目前放貸中的總金額。
  totalLoanedAmount: number
  // 依目前 active loans 估算的今日利息。
  todayInterest: number
}

export interface GetFundingsLoansRes {
  // 目前進行中的放貸筆數。
  activeLoans: number
  // 目前放貸中的總金額。
  totalLoanedAmount: number
  // 依目前 active loans 估算的今日利息。
  todayInterest: number
  // 依今日利息估算的 30 天利息。
  monthlyInterest: number
  // 依 funding symbol 彙總的放貸統計。
  bySymbol: FundingsLoanSymbolSummary[]
  // 目前放貸中的逐筆明細。
  loans: FundingsLoanItem[]
}

export const getFundingsLoansRepo = async (): Promise<GetFundingsLoansRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsLoansRes>>('/fundings/loans')
  return res.data.data
}
