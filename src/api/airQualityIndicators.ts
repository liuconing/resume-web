import apiHandler from './api'
const apiKey = '948d73f7-2b07-4687-a00f-36c43185a671'
type callAQIType = {
  language: string
  offset: string
  limit: string
  api_key: string
}
export const callAaiURL = 'https://data.moenv.gov.tw/api/v2/aqx_p_432'
export const callAQI = (params?: callAQIType) =>
  apiHandler({
    url: callAaiURL,
    method: 'GET',
    params: { ...{ language: 'zh', api_key: apiKey }, ...params }
  })
