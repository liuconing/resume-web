import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { GetFundingsSettingsRes } from './getFundingsSettings.repo'

export interface UpdateFundingsSettingsReq {
  // 要儲存的 Bitfinex API key。
  apiKey: string
  // 要儲存的 Bitfinex API secret。
  apiSecret: string
}

export type UpdateFundingsSettingsRes = GetFundingsSettingsRes

export const updateFundingsSettingsRepo = async (
  req: UpdateFundingsSettingsReq,
): Promise<UpdateFundingsSettingsRes> => {
  const res = await axiosBase.put<PpsApiReturn<UpdateFundingsSettingsRes>>('/fundings/settings', req)
  return res.data.data
}
