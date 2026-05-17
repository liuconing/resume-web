import axios, { type AxiosResponse } from 'axios'
import { getLocalStorageUsecase } from '@/domain/usecase'

export interface PpsApiReturn<T = any> {
  ok: boolean
  data: T
}

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080' + '/api',
})

/**
 * 判斷 API HTTP status 是否為成功狀態。
 *
 * @param params - HTTP status 判斷參數。
 */
const isApiSuccessStatus = ({ status }: { status: number }): boolean => {
  return status === 200
}

/**
 * 攔截非 200 的 API 回應。
 *
 * @param response - Axios API 回應。
 */
const handleApiResponse = <T>(response: AxiosResponse<T>): AxiosResponse<T> | Promise<never> => {
  if (!isApiSuccessStatus({ status: response.status })) {
    return Promise.reject(new Error(`API response status is ${response.status}`))
  }

  return response
}

/**
 * 維持 Axios 原本錯誤流程。
 *
 * @param error - Axios 錯誤物件。
 */
const handleApiResponseError = (error: unknown): Promise<never> => {
  return Promise.reject(error)
}

axiosBase.interceptors.request.use(async (config) => {
  const token = await getLocalStorageUsecase()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

axiosBase.interceptors.response.use(handleApiResponse, handleApiResponseError)

export { axios, axiosBase }
