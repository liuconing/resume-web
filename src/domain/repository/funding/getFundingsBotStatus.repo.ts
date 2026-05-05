import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export interface GetFundingsBotStatusRes {
  // 使用者 bot runtime 狀態資料。
  [key: string]: unknown
}

export const getFundingsBotStatusRepo = async (): Promise<GetFundingsBotStatusRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetFundingsBotStatusRes>>('/fundings/bot/status')
  return res.data.data
}
