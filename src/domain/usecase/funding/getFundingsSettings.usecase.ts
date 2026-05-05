import { getFundingsSettings } from '@/domain/repository'
import type { GetFundingsSettingsRes } from '@/domain/repository'

export interface GetFundingsSettingsDto extends GetFundingsSettingsRes {}

/**
 * 取得放貸 bot 設定
 */
export async function getFundingsSettingsUsecase(): Promise<GetFundingsSettingsDto> {
  return getFundingsSettings()
}
