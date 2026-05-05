import { getFundingsBotStatus } from '@/domain/repository'
import type { GetFundingsBotStatusRes } from '@/domain/repository'

export interface GetFundingsBotStatusDto extends GetFundingsBotStatusRes {}

/**
 * 取得放貸 bot 目前執行狀態
 */
export async function getFundingsBotStatusUsecase(): Promise<GetFundingsBotStatusDto> {
  return getFundingsBotStatus()
}
