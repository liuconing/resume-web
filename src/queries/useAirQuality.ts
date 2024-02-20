import { useQuery } from '@tanstack/vue-query'
import { callAQI, callAaiURL } from '../api/airQualityIndicators'

export const useAirQuality = () => {
  return useQuery({
    queryKey: [callAaiURL],
    queryFn: async () => {
      const res = await callAQI()
      return res.data.records
    }
  })
}
