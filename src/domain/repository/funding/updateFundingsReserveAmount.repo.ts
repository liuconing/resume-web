import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 更新放貸保留金額所需傳入參數 */
export interface UpdateFundingsReserveAmountParams {
  /** 保留不投入自動放貸的資金金額 */
  reserveAmount: number
}

/** 更新放貸保留金額 API 回傳格式 */
export interface UpdateFundingsReserveAmountRes {
  /** 保留不投入自動放貸的資金金額 */
  reserveAmount: number
  /** 設定更新時間 */
  updatedAt: string
}

/**
 * 更新放貸保留金額
 * @param params - 傳入參數，包含保留金額
 */
export async function updateFundingsReserveAmount(params: UpdateFundingsReserveAmountParams): Promise<UpdateFundingsReserveAmountRes> {
  const res = await axiosBase.put<PpsApiReturn<UpdateFundingsReserveAmountRes>>('/fundings/settings/reserve-amount', params)
  return res.data.data
}
