import { tickBot } from '@/domain/repository'
import type { TickBotRes } from '@/domain/repository'

export interface TickBotDto extends TickBotRes {}

/**
 * 執行單次 bot tick
 */
export async function tickBotUsecase(): Promise<TickBotDto> {
  return tickBot()
}
