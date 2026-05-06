import { getFundingsBotLogs } from '@/domain/repository'
import type { GetFundingsBotLogsParams, GetFundingsBotLogsRes } from '@/domain/repository'

export interface GetFundingsBotLogsDto extends GetFundingsBotLogsRes {}
export interface GetFundingsBotLogsParamsDto extends GetFundingsBotLogsParams {}

/**
 * 取得放貸 bot 執行紀錄（分頁）
 * @param params - 傳入參數，包含頁碼與每頁筆數
 */
export async function getFundingsBotLogsUsecase(
  params?: GetFundingsBotLogsParamsDto,
): Promise<GetFundingsBotLogsDto> {
  const data = await getFundingsBotLogs(params)
  return data
}
