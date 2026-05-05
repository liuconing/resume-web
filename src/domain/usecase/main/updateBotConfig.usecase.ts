import { updateBotConfig } from '@/domain/repository'
import type { UpdateBotConfigParams, UpdateBotConfigRes } from '@/domain/repository'

export interface UpdateBotConfigDto extends UpdateBotConfigRes {}
export interface UpdateBotConfigParamsDto extends UpdateBotConfigParams {}

/**
 * 更新 bot 執行設定
 * @param params - 傳入參數，包含要更新的設定欄位
 */
export async function updateBotConfigUsecase(
  params: UpdateBotConfigParamsDto,
): Promise<UpdateBotConfigDto> {
  return updateBotConfig(params)
}
