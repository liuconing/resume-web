import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface UpdateFundingsBotEnabledReq {
  // 使用者放貸 bot 是否啟用。
  enabled: boolean
}

export interface UpdateFundingsBotEnabledRes {
  // 使用者放貸 bot 是否啟用。
  botEnabled: boolean
  // 設定更新時間。
  updatedAt: string
}

export const updateFundingsBotEnabledRepo = async (
  req: UpdateFundingsBotEnabledReq,
): Promise<UpdateFundingsBotEnabledRes> => {
  const res = await axiosBase.put<PpsApiReturn<UpdateFundingsBotEnabledRes>>('/fundings/settings/bot-enabled', req)
  return res.data.data
}
