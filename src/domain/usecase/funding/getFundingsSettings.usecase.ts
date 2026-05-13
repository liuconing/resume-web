import { getFundingsSettings } from '@/domain/repository'
import type { GetFundingsSettingsRes } from '@/domain/repository'
import { decryptCredentialForDisplay } from '@/lib/crypto'

export interface GetFundingsSettingsDto extends GetFundingsSettingsRes {}

/**
 * 取得放貸 bot 設定
 */
export async function getFundingsSettingsUsecase(): Promise<GetFundingsSettingsDto> {
  const res = await getFundingsSettings()
  res.apiKey = decryptCredentialForDisplay({ payload: res.apiKey })
  res.apiSecret = decryptCredentialForDisplay({ payload: res.apiSecret })
  return res
}
