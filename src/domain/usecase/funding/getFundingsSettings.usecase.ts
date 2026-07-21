import { getFundingsSettings } from '@/domain/repository'
import type { GetFundingsSettingsRes } from '@/domain/repository'
import { decryptCredentialForDisplay } from '@/lib/crypto'

export interface GetFundingsSettingsDto extends GetFundingsSettingsRes {}

/**
 * 取得放貸 bot 設定
 */
export async function getFundingsSettingsUsecase(): Promise<GetFundingsSettingsDto> {
  const res = await getFundingsSettings()
  res.apiKey =
    decryptCredentialForDisplay({ payload: res.apiKey }).slice(0, 3) +
    '***********' +
    decryptCredentialForDisplay({ payload: res.apiKey }).slice(-3)
  res.apiSecret =
    decryptCredentialForDisplay({ payload: res.apiSecret }).slice(0, 3) +
    '***********' +
    decryptCredentialForDisplay({ payload: res.apiSecret }).slice(-3)
  return res
}
