import { axios } from '@/lib/axios'

const AIR_QUALITY_API_KEY = import.meta.env.VITE_MINISTRY_OF_ENVIRONMENT_API_KEY

export interface AirQualityIndex {
  aqi: string
  co: string
  co_8hr: string
  county: string
  latitude: string
  longitude: string
  no: string
  no2: string
  nox: string
  o3: string
  o3_8hr: string
  'pm2.5': string
  'pm2.5_avg': string
  pm10: string
  pm10_avg: string
  pollutant: string
  publishtime: string
  siteid: string
  sitename: string
  so2: string
  so2_avg: string
  status: string
  wind_direc: string
  wind_speed: string
}

export async function getAirQualityIndex(): Promise<AirQualityIndex[]> {
  const response = await axios.get(
    `https://data.moenv.gov.tw/api/v2/AQX_P_432?api_key=${AIR_QUALITY_API_KEY}&limit=1000&sort=ImportDate%20desc&format=json`,
  )
  return response.data
}
