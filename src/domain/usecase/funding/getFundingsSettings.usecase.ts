import { getFundingsSettingsRepo } from '@/domain/repository'

/**
 * 取得放貸 bot 設定。
 * @returns 放貸 bot 設定。
 */
export async function getFundingsSettingsUsecase() {
  const data = await getFundingsSettingsRepo()
  return data
}
