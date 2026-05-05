import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 更新放貸 bot 啟用狀態所需傳入參數 */
export interface UpdateFundingsBotEnabledParams {
  /** 使用者放貸 bot 是否啟用 */
  enabled: boolean
}

/** 更新放貸 bot 啟用狀態 API 回傳格式 */
export interface UpdateFundingsBotEnabledRes {
  /** 使用者放貸 bot 是否啟用 */
  botEnabled: boolean
  /** 設定更新時間 */
  updatedAt: string
}

/**
 * 更新放貸 bot 啟用狀態
 * @param params - 傳入參數，包含是否啟用
 */
export async function updateFundingsBotEnabled(params: UpdateFundingsBotEnabledParams): Promise<UpdateFundingsBotEnabledRes> {
  const res = await axiosBase.put<PpsApiReturn<UpdateFundingsBotEnabledRes>>('/fundings/settings/bot-enabled', params)
  return res.data.data
}
