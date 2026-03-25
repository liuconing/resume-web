import { getAirQualityIndex, type AirQualityIndex } from '../repository'

export async function getAirQualityIndexUsecase(): Promise<AirQualityIndex[]> {
  const data = await getAirQualityIndex()
  return data
}
