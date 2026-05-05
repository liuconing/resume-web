import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetFundingsOverviewRes {
  /** 各追蹤幣種的資產列表與金額
   *  @property {string} currency 幣種
   *  @property {number} amount 金額
   */
  assets: {
    currency: string
    amount: number
  }[]

  /** 總資產金額，彙總追蹤幣種的 funding 錢包餘額 */
  totalAssets: number

  /** 目前 funding 錢包可用且尚未放貸的閒置資金 */
  idleFunds: number

  /** 累計利息收入 */
  interestIncome: number

  /** 更新時間 */
  updatedAt: string
}
export const getFundingsOverviewRepo = async (): Promise<GetFundingsOverviewRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsOverviewRes>>('/fundings/overview')
  return res.data.data
}
