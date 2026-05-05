import { axiosBase, type PpsApiReturn } from '@/lib/axios'

/** 取得錢包列表 API 回傳格式 */
export type GetWalletsRes = unknown[]

/**
 * 取得所有錢包資料
 */
export async function getWallets(): Promise<GetWalletsRes> {
  const res = await axiosBase.get<PpsApiReturn<GetWalletsRes>>('/bitfinex/wallets')
  return res.data.data
}
