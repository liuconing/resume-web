import { getAirQualityIndex } from '../repository'
import type { AirQualityIndexItem } from '../repository'

export interface AirQualityIndexDto extends AirQualityIndexItem {}

/**
 * 取得全台各測站空氣品質指數資料
 */
export async function getAirQualityIndexUsecase(): Promise<AirQualityIndexDto[]> {
  return getAirQualityIndex()
}
