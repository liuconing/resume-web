import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetFundingsOverviewRes {
  assets: {
    currency: string
    amount: number
  }[]
  totalAssets: number
  idleFunds: number
  interestIncome: number
  updatedAt: string
}
export const getFundingsOverviewRepo = async (): Promise<PpsApiReturn<GetFundingsOverviewRes>> => {
  const res = await axiosBase.get('/fundings/overview')
  return res.data.data
}
