import { getWallets } from '@/domain/repository'
import type { GetWalletsRes } from '@/domain/repository'

export interface GetWalletsDto extends GetWalletsRes {}

/**
 * 取得所有錢包資料
 */
export async function getWalletsUsecase(): Promise<GetWalletsDto> {
  return getWallets()
}
