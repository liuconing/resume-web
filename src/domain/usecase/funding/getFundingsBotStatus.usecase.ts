import { getFundingsBotStatusRepo } from '@/domain/repository'

/**
 * 取得放貸 bot 狀態。
 * @returns 放貸 bot 狀態。
 */
export async function getFundingsBotStatusUsecase() {
  const data = await getFundingsBotStatusRepo()
  return data
}
