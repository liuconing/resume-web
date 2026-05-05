import { updateFundingsBotConfig } from '@/domain/repository'
import type { UpdateFundingsBotConfigParams, UpdateFundingsBotConfigRes } from '@/domain/repository'

export interface UpdateFundingsBotConfigDto extends UpdateFundingsBotConfigRes {}
export interface UpdateFundingsBotConfigParamsDto extends UpdateFundingsBotConfigParams {}

/**
 * 更新放貸 bot 執行設定
 * @param params - 傳入參數，包含要更新的 bot 設定欄位
 */
export async function updateFundingsBotConfigUsecase(
  params: UpdateFundingsBotConfigParamsDto,
): Promise<UpdateFundingsBotConfigDto> {
  return updateFundingsBotConfig(params)
}
