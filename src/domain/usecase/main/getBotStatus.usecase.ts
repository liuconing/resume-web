import { getBotStatus } from '@/domain/repository'
import type { GetBotStatusRes } from '@/domain/repository'

export interface GetBotStatusDto extends GetBotStatusRes {}

/**
 * 取得 bot 目前執行狀態
 */
export async function getBotStatusUsecase(): Promise<GetBotStatusDto> {
  return getBotStatus()
}
