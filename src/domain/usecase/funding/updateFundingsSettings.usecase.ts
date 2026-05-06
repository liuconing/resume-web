import { updateFundingsSettings } from '@/domain/repository'
import type { UpdateFundingsSettingsParams } from '@/domain/repository'

export interface UpdateFundingsSettingsParamsDto extends UpdateFundingsSettingsParams {}

/**
 * 更新放貸 API 金鑰設定
 * @param params - 傳入參數，包含 API key 與 API secret
 */
export async function updateFundingsSettingsUsecase(
  params: UpdateFundingsSettingsParamsDto,
): Promise<boolean> {
  const res = await updateFundingsSettings(params)
  if (res.ok) {
    return true
  }
  return false
}
