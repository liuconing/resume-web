import { stopBot } from '@/domain/repository'
import type { StopBotRes } from '@/domain/repository'

export interface StopBotDto extends StopBotRes {}

/**
 * 停止 bot
 */
export async function stopBotUsecase(): Promise<StopBotDto> {
  return stopBot()
}
