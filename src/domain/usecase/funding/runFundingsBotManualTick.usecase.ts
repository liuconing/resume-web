import { runFundingsBotManualTick } from '@/domain/repository'
import type { RunFundingsBotManualTickRes } from '@/domain/repository'

export interface RunFundingsBotManualTickDto extends RunFundingsBotManualTickRes {}

/**
 * 手動觸發放貸 bot 執行一次 tick
 */
export async function runFundingsBotManualTickUsecase(): Promise<RunFundingsBotManualTickDto> {
  return runFundingsBotManualTick()
}
