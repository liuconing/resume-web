import axios from 'axios'
import { getLocalStorageUsecase } from '@/domain/usecase'

export interface PpsApiReturn<T = any> {
  ok: boolean
  data: T
}

const axiosBase = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080' + '/api',
})

axiosBase.interceptors.request.use(async (config) => {
  const token = await getLocalStorageUsecase()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export { axios, axiosBase }
