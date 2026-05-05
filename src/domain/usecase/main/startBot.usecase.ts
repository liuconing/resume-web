import { startBot } from '@/domain/repository'
import type { StartBotRes } from '@/domain/repository'

export interface StartBotDto extends StartBotRes {}

/**
 * 啟動 bot
 */
export async function startBotUsecase(): Promise<StartBotDto> {
  return startBot()
}
