import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface UpdateFundingsReserveAmountReq {
  // 保留不投入自動放貸的資金金額。
  reserveAmount: number
}

export interface UpdateFundingsReserveAmountRes {
  // 保留不投入自動放貸的資金金額。
  reserveAmount: number
  // 設定更新時間。
  updatedAt: string
}

export const updateFundingsReserveAmountRepo = async (
  req: UpdateFundingsReserveAmountReq,
): Promise<UpdateFundingsReserveAmountRes> => {
  const res = await axiosBase.put<PpsApiReturn<UpdateFundingsReserveAmountRes>>('/fundings/settings/reserve-amount', req)
  return res.data.data
}
