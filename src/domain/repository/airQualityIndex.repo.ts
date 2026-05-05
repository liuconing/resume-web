import { axios } from '@/lib/axios'

const AIR_QUALITY_API_KEY = import.meta.env.VITE_MINISTRY_OF_ENVIRONMENT_API_KEY

/** 空氣品質指數單一測站資料 */
export interface AirQualityIndexItem {
  /** 空氣品質指數 */
  aqi: string
  /** 一氧化碳濃度 */
  co: string
  /** 一氧化碳 8 小時平均濃度 */
  co_8hr: string
  /** 所在縣市 */
  county: string
  /** 測站緯度 */
  latitude: string
  /** 測站經度 */
  longitude: string
  /** 一氧化氮濃度 */
  no: string
  /** 二氧化氮濃度 */
  no2: string
  /** 氮氧化物濃度 */
  nox: string
  /** 臭氧濃度 */
  o3: string
  /** 臭氧 8 小時平均濃度 */
  o3_8hr: string
  /** PM2.5 濃度 */
  'pm2.5': string
  /** PM2.5 移動平均濃度 */
  'pm2.5_avg': string
  /** PM10 濃度 */
  pm10: string
  /** PM10 移動平均濃度 */
  pm10_avg: string
  /** 主要污染物 */
  pollutant: string
  /** 資料發布時間 */
  publishtime: string
  /** 測站 ID */
  siteid: string
  /** 測站名稱 */
  sitename: string
  /** 二氧化硫濃度 */
  so2: string
  /** 二氧化硫移動平均濃度 */
  so2_avg: string
  /** 空氣品質狀態描述 */
  status: string
  /** 風向 */
  wind_direc: string
  /** 風速 */
  wind_speed: string
}

/**
 * 取得全台各測站空氣品質指數資料
 */
export async function getAirQualityIndex(): Promise<AirQualityIndexItem[]> {
  const response = await axios.get(
    `https://data.moenv.gov.tw/api/v2/AQX_P_432?api_key=${AIR_QUALITY_API_KEY}&limit=1000&sort=ImportDate%20desc&format=json`,
  )
  return response.data
}
