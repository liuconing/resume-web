import { updateFundingsBotEnabled } from '@/domain/repository'
import type {
  UpdateFundingsBotEnabledParams,
  UpdateFundingsBotEnabledRes,
} from '@/domain/repository'

export interface UpdateFundingsBotEnabledDto extends UpdateFundingsBotEnabledRes {}
export interface UpdateFundingsBotEnabledParamsDto extends UpdateFundingsBotEnabledParams {}

/**
 * 更新放貸 bot 啟用狀態
 * @param params - 傳入參數，包含是否啟用
 */
export async function updateFundingsBotEnabledUsecase(
  params: UpdateFundingsBotEnabledParamsDto,
): Promise<UpdateFundingsBotEnabledDto> {
  return updateFundingsBotEnabled(params)
}
