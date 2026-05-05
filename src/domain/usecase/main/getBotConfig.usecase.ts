import { getBotConfig } from '@/domain/repository'
import type { GetBotConfigRes } from '@/domain/repository'

export interface GetBotConfigDto extends GetBotConfigRes {}

/**
 * 取得 bot 執行設定
 */
export async function getBotConfigUsecase(): Promise<GetBotConfigDto> {
  return getBotConfig()
}
