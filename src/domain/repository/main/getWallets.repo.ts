import { axiosBase, type PpsApiReturn } from '@/lib/axios'

export type GetWalletsRes = unknown[]

export const getWalletsRepo = async (): Promise<GetWalletsRes> => {
  const res = await axiosBase.get<PpsApiReturn<GetWalletsRes>>('/bitfinex/wallets')
  return res.data.data
}
