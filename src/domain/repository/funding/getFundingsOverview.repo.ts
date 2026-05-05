import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 放貸資產項目 */
export interface FundingsOverviewAsset {
  /** 幣種 */
  currency: string
  /** 金額 */
  amount: number
}

/** 取得放貸總覽 API 回傳格式 */
export interface GetFundingsOverviewRes {
  /** 各追蹤幣種的資產列表與金額 */
  assets: FundingsOverviewAsset[]
  /** 總資產金額，彙總追蹤幣種的 funding 錢包餘額 */
  totalAssets: number
  /** 目前 funding 錢包可用且尚未放貸的閒置資金 */
  idleFunds: number
  /** 累計利息收入 */
  interestIncome: number
  /** 更新時間 */
  updatedAt: string
}

/**
 * 取得放貸總覽資料
 */
export async function getFundingsOverview(): Promise<GetFundingsOverviewRes> {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsOverviewRes>>('/fundings/overview')
  return res.data.data
}
