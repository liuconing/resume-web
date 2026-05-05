import { axiosBase, type PpsApiReturn } from '@/lib/axios'
import type { GetFundingsSettingsRes } from './getFundingsSettings.repo'

/** 更新放貸設定所需傳入參數 */
export interface UpdateFundingsSettingsParams {
  /** 要儲存的 Bitfinex API key */
  apiKey: string
  /** 要儲存的 Bitfinex API secret */
  apiSecret: string
}

/** 更新放貸設定 API 回傳格式 */
export type UpdateFundingsSettingsRes = GetFundingsSettingsRes

/**
 * 更新放貸 API 金鑰設定
 * @param params - 傳入參數，包含 API key 與 API secret
 */
export async function updateFundingsSettings(params: UpdateFundingsSettingsParams): Promise<UpdateFundingsSettingsRes> {
  const res = await axiosBase.put<PpsApiReturn<UpdateFundingsSettingsRes>>('/fundings/settings', params)
  return res.data.data
}
